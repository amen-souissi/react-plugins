import React from "react";
import ReactPluginsProvider from "@decathlon/react-plugins-core";

import "./App.css";
import Root from "./src/app";

function App() {
  return (
    <ReactPluginsProvider>
      <div className="App">
        <div className="App-container">
          <Root />
        </div>
      </div>
    </ReactPluginsProvider>
  );
}

export default App;
