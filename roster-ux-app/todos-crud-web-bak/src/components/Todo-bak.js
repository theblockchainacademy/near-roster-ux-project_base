// src/components/Todo.js
import { useState } from "react";
import styles from "../App.css";

export function Todo({ contract, id, task, done }) {
  const [checked, setChecked] = useState(done);

  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { task, done: target.checked } });
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
        {task}
        <button onClick={del}>Sil</button>
      </div>
    </>
  );
}
