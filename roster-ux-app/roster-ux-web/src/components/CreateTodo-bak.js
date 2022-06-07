// src/components/CreateTodo.js
import { useState } from "react";

const CreateTodo = ({ contract }) => {
  const [learner, setLearner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    const todo = await contract.create({ learner });
    setLearner("");
    setLoading(false);

    // print the todo to the console
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter learner name"
        value={learner}
        onChange={({ target }) => setLearner(target.value)}
      />
      <button disabled={loading}>Add Learner</button>
    </form>
  );
};

export default CreateTodo;
