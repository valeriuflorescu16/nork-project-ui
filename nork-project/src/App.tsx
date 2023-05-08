import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Information from "./pages/Information";
import Header from "./UI/Header";
import Unsubscribe from "./pages/Unsubscribe";
import Login from "./pages/Login";
import { useRecoilValue } from "recoil";
import { loginAtom } from "./recoil/atoms/loginAtom";
import Dashboard from "./pages/Dashboard";

const getPageTitle = (page: string) => {
  if (page === "/") return "Home";
  if (page === "/info") return "About RADAR";
  if (page.includes("unsubscribe")) return "Unsubscribe";
  if (page.includes("dashboard")) return "Dashboard";
  else return "Home";
};

function App() {
  const currPage = useLocation().pathname;
  const isLoggedIn = useRecoilValue(loginAtom);

  return (
    <div className="App">
      {!currPage.includes("login") && <Header title={getPageTitle(currPage)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Information />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/unsubscribe/:email" element={<Unsubscribe />} />
        <Route
          path="/admin/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
