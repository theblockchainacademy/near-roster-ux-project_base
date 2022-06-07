import "regenerator-runtime/runtime";
import React from "react";
import PropTypes from "prop-types";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import styles from "./App.css";
const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    //wallet.requestSignIn(nearConfig.contractName, "NEAR Guest Book");
    wallet.requestSignIn(nearConfig.contractName, "NEAR Course Roster Book");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <h1>NEAR Course Roster</h1>
      {currentUser ? (
        <div>
          <h2>
            Account ID: {currentUser.accountId}{" "}
            <button onClick={signOut}>Wallet</button>
          </h2>

          <CreateTodo contract={contract} />
          <TodoList contract={contract} />
        </div>
      ) : (
        <div id="div-a">
          Sign In To Use the Roster App <br />
          <button onClick={signIn}>Connect</button>
        </div>
      )}
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    create: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
