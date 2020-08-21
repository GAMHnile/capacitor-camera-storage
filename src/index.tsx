import React from "react";
import ReactDOM from "react-dom";
import MemoriesContextProvider from "./data/MemoriesContextProvider";

import App from "./App";


ReactDOM.render(
  <MemoriesContextProvider>
    <App />
  </MemoriesContextProvider>,
  document.getElementById("root")
);
