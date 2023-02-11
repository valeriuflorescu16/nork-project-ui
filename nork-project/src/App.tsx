import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./UI/Header";

function App() {
  const [email, setEmail] = useState("");

  const getEmail = (value: string) => {
    setEmail(value);
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <div className="App">
      <Header title="Nork Project" />
      <br />
      <Home setEmail={getEmail} />
    </div>
  );
}

export default App;
