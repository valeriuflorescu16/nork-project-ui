import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Information from "./pages/Information";
import Header from "./UI/Header";

const getPageTitle = (page: string) => {
  if (page === "/") return "Home";
  if (page === "/info") return "About RADAR";
  else return "Home";
};

function App() {
  const currPage = useLocation().pathname;

  return (
    <div className="App">
      <Header title={getPageTitle(currPage)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Information />} />
      </Routes>
    </div>
  );
}

export default App;
