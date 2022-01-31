import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

import Table from "./component/Table";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/:pair" element={<Table />} />
        <Route path="*" element={<Table />} />
      </Routes>
      </BrowserRouter>
      <Outlet />
    </>
  );
}

export default App;
