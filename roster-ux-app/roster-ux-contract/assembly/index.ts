// contract/assembly/index.ts
import { Roster, Partialroster } from "./model";
import { Course } from "./course";
import { storage, context, PersistentVector } from "near-sdk-as";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(learner: string): Roster {
  // use the Roster class to persist the roster data
  return Roster.insert(learner);
}

export function getById(id: u32): Roster {
  return Roster.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Roster[] {
  return Roster.find(offset, limit);
}

export function update(id: u32, updates: Partialroster): Roster {
  return Roster.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
  Roster.findByIdAndDelete(id);
}
