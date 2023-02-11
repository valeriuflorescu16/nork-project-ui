import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Information from "./pages/Information";
import Header from "./UI/Header";

function App() {
  const [email, setEmail] = useState("");

  const getEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <div className="App">
      <Header title="Nork Project" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setEmail={getEmail} />} />
          <Route path="/info" element={<Information />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
