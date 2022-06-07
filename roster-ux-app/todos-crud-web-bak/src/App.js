import "regenerator-runtime/runtime";
import React from "react";
import PropTypes from "prop-types";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import styles from "./App.css";
const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Guest Book");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <h1>NEAR CRUD Yapılacaklar Listesi</h1>
      {currentUser ? (
        <div>
          <h2>
            Hesap ID: {currentUser.accountId}{" "}
            <button onClick={signOut}>Oturumu Kapat</button>
          </h2>

          <CreateTodo contract={contract} />
          <TodoList contract={contract} />
        </div>
      ) : (
        <div id="div-a">
          Uygulamayı Kullanmak İçin Oturum Açın <br />
          <button onClick={signIn}>Oturum Aç</button>
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
