import React from "react";
import ReactDOM from "react-dom";
import MemoriesContextProvider from "./data/MemoriesContextProvider";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import * as serviceWorker from './serviceWorker';

import App from "./App";


ReactDOM.render(
  <MemoriesContextProvider>
    <App />
  </MemoriesContextProvider>,
  document.getElementById("root")
);

defineCustomElements(window);

serviceWorker.register();