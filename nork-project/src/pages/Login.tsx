import React, { useEffect, useState } from "react";

import classes from "./Login.module.css";
import { useRecoilState } from "recoil";
import { loginAtom } from "../recoil/atoms/loginAtom";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_URL;

const Login = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [token, setToken] = useRecoilState(loginAtom);

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErr("Please enter your email address and/or password");
      return;
    }

    const errorMessage =
      "Authentication failed. Make sure the email and password that you have provided are correct and try again.";

    try {
      const response = await fetch(`${url}/admin/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!data.token) {
        setErr(errorMessage);
        return;
      }

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        setErr("");
        setEmail("");
        setPassword("");

        if (!data.token) {
          setErr(errorMessage);
          return;
        }
      } else if (!response.ok) {
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErr(errorMessage);
    }
  };

  return (
    <div className={classes.card}>
      <h1>Admin Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={classes.formGroup}>
          <label htmlFor="email" className={classes.loginLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className={classes.loginInput}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password" className={classes.loginLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={classes.loginInput}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className={classes.loginButton}>
          Log in
        </button>
      </form>
      {err && <div className={classes.error}>{err}</div>}
    </div>
  );
};

export default Login;
