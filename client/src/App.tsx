import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import OrderBook from "./components/OrderBook";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderBook />} />
        <Route path="/:pair" element={<OrderBook />} />
        <Route path="*" element={<OrderBook />} />
      </Routes>
      </BrowserRouter>
      <Outlet />
    </>
  );
}

export default App;
