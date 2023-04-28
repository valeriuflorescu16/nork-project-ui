import React, { FC, useState } from "react";
import classes from "./SubscribeModal.module.css";
import { useRecoilState, useResetRecoilState } from "recoil";
import { emailAtom } from "../recoil/atoms/emailAtom";

const url = process.env.REACT_APP_URL;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SubscribeModal: FC<{
  showModal: boolean;
  onCloseModal: () => void;
}> = ({ showModal, onCloseModal }) => {
  const [email, setEmail] = useRecoilState(emailAtom);
  const resetEmail = useResetRecoilState(emailAtom);
  const [err, setErr] = useState("");

  const handleSubscribe = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!email) {
      setErr("No email address was provided.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErr("Email provided is invalid.");
      return;
    }

    try {
      const response = await fetch(`${url}/emails/subscribe`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setErr("");
      resetEmail();
      onCloseModal();
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.log(error);
        error.message.includes("Bad Request")
          ? setErr("Email is already in our mailing list.")
          : setErr("Something went wrong. Please try again...");
      }
    }
  };

  return (
    <>
      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <div className={classes.header}>
              <h2 className={classes.title}>Sign up for email updates</h2>
              <button
                className={classes.closeModalButton}
                onClick={() => {
                  setErr("");
                  resetEmail();
                  onCloseModal();
                }}
              >
                &times;
              </button>
            </div>
            <form className={classes.form}>
              <label htmlFor="email" className={classes.label}>
                Email address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${classes.input} ${err ? classes.errorBorder : ""}`}
              />
              <button
                type="submit"
                className={classes.submitButton}
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
              {err && <p className={classes.error}>{err}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeModal;
