import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Profile from "./components/Profile";
import Search from "./components/Search";
import User from "./components/User";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSuccessful from "./components/LoginSuccessful";
import Following from "./components/Following";
import Followers from "./components/Followers";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import AboutUs from "./components/AboutUs";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/success" element={<LoginSuccessful />}></Route>
        <Route path="/following" element={<Following />}></Route>
        <Route path="/followers" element={<Followers />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
