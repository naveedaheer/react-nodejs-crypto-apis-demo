import React from "react";
import "./App.css";
import { StyledDividerLine } from "./component/StyledComponents";
import Table from "./component/Table";
import Toolbar from "./component/Toolbar";

function App() {
  return (
    <div>
      <Toolbar />
      <StyledDividerLine />
      <Table />
    </div>
  );
}

export default App;
