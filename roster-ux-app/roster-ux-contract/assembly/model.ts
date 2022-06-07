// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";
import { Course } from "./course";
import { storage, context, PersistentVector } from "near-sdk-as";

export const rosterlist = new PersistentUnorderedMap<u32, Roster>("rosterlist");
export const abrosterlist = new PersistentUnorderedMap<u32, Roster>("abrosterlist");

@nearBindgen
export class Partialroster {
  learner: string;
  present: bool;
}

@nearBindgen
export class Roster {
  id: u32;
  learner: string;
  present: bool;

  constructor(learner: string) {
    this.id = math.hash32<string>(learner);
    this.learner = learner;
    this.present = true;
  }

  static insert(learner: string): Roster {
    // create a new Roster
    const rostlist = new Roster(learner);

    // add the todo to the PersistentUnorderedMap
    // where the key is the todo's id and the value
    // is the todo itself. Think of this like an
    // INSERT statement in SQL.
    rosterlist.set(rostlist.id, rostlist);

    return rostlist;
  }

  static insertab(learner: string): Roster {
    // create a new Roster
    const abrostlist = new Roster(learner);

    // add the learner to the PersistentUnorderedMap
    // where the key is the learner's id and the value
    // is the absent learner. Think of this like an
    // INSERT statement in SQL.
    abrosterlist.set(abrostlist.id, abrostlist);

    return abrostlist;
  }

  static findById(id: u32): Roster {
    // Lookup a todo in the PersistentUnorderedMap by its id.
    // This is like a SELECT * FROM todos WHERE id=?
    return rosterlist.getSome(id);
  }

  static find(offset: u32, limit: u32): Roster[] {
    // the PersistentUnorderedMap values method will
    // takes two parameters: start and end. we'll start
    // at the offset (skipping all todos before the offset)
    // and collect all todos until we reach the offset + limit
    // todo. For example, if offset is 10 and limit is 3 then
    // this would return the 10th, 11th, and 12th todo.
    return rosterlist.values(offset, offset + limit);
  }

  static findByIdAndUpdate(id: u32, partial: Partialroster): Roster {
    // find a todo by its id
    const rostlist = this.findById(id);

    // update the todo in-memory
    rostlist.learner = partial.learner;
    rostlist.present = partial.present;

    // persist the updated todo
    rosterlist.set(id, rostlist);

    return rostlist;
  }

  static findByIdAndDelete(id: u32): void {
    rosterlist.delete(id);
  }

}
