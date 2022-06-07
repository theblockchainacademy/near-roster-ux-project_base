// src/components/Todo.js
import { useState } from "react";
import styles from "../App.css";

export function Todo({ contract, id, learner, present }) {
  const [checked, setChecked] = useState(present);

  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { learner, present: target.checked } });
  };

  const del = () => {
    // on clicking the delete button invoke the del method on
    // the smart contract
    contract.del({ id });
  };

  return (
    <>
      <div className="todo">
        <input type="checkbox" checked={checked} onChange={complete} />
        {learner}
        <button onClick={del}>Absent</button>
      </div>
    </>
  );
}
