import React, { Component } from "react";
import { ToastProvider } from "react-toast-notifications";
import Header from "./Components/Header";
import Main from "./Components/Main";

class App extends Component {
  render() {
    return (
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-right"
      >
        <div>
          <Header />
          <Main />
        </div>
      </ToastProvider>
    );
  }
}

export default App;
