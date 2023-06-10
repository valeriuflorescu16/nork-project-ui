import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Information from "./pages/Information";
import Header from "./UI/Header";
import Unsubscribe from "./pages/Unsubscribe";

const getPageTitle = (page: string) => {
  if (page === "/") return "Home";
  if (page === "/info") return "About RADAR";
  if (page.includes("unsubscribe")) return "Unsubscribe";
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
        <Route path="/unsubscribe/:email" element={<Unsubscribe />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
