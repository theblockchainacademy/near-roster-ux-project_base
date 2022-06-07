// contract/assembly/__tests__/index.spec.ts

import { create, getById, get, update, del } from "../index";
import { Roster, rosterlist } from "../model";

describe("contract methods", () => {
  it("creates a learner", () => {
    // call the create method
    const rostlist = create("Jimmy Sullivan");

    // lookup in the PersistentUnorderedMap for our todo
    // expect the persisted todo to equal the todo returned
    // by the create method above.
    expect(rosterlist.getSome(rostlist.id)).toStrictEqual(rostlist);
  });

  it("gets a todo by id", () => {
    // create three todos
    const a = Roster.insert("Jimmy Sullivan");
    const b = Roster.insert("Pete Hegseth");
    const c = Roster.insert("Mike Conner");

    // get each todo by its it
    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  });

  it('gets a list of todos', () => {
    const rosterlist = new Array<number>(100)
      .fill(0)
      .map<Roster>((_, i) => Roster.insert('rostlisting' + i.toString()))

    expect(get(20)).toStrictEqual(rosterlist.slice(20, 30));
    expect(get(0, 10)).toStrictEqual(rosterlist.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(rosterlist.slice(10, 20));
    expect(get(50, 50)).toStrictEqual(rosterlist.slice(50, 100));
  });

  it('updates a todo', () => {
    const rostlist = Roster.insert('Mickey Sullivan');

    update(rostlist.id, { learner: 'Jimmy Sullivan', present: true });

    const rosterUpdate = Roster.findById(rostlist.id);

    expect(rosterUpdate.id).toStrictEqual(rostlist.id);
    expect(rosterUpdate.learner).toStrictEqual('Jimmy Sullivan');
    expect(rosterUpdate.present).toStrictEqual(true);
  });

  itThrows('deletes a learner', () => {
    const rostlist = Roster.insert('Jimmy Sullivan');

    del(rostlist.id);

    Roster.findById(rostlist.id);
  });

});
