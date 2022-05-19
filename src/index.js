import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Profile from "./components/Profile";
import Search from "./components/Search";
import User from "./components/User";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
