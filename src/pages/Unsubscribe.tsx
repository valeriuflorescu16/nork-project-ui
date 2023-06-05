import React, { useEffect } from "react";
import classes from "./Unsubscribe.module.css";
import { useParams } from "react-router-dom";

const url = process.env.REACT_APP_URL;

const Unsubscribe = () => {
  const { email } = useParams();

  useEffect(() => {
    fetch(`${url}/emails/unsubscribe`, {
      method: "DELETE",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  });

  return (
    <div className={classes.unsubscribeContainer}>
      <h1 className={classes.unsubscribeHeader}>Sorry to see you go...</h1>
      <p className={classes.unsubscribeText}>
        Please check your emails for confirmation that you have been
        unsubscribed from our mailing list.
      </p>
      <hr className={classes.divider} />
      <p className={classes.unsubscribeVerify}>
        If you have not received an email confirming that you are now
        unsubscribed, make sure to check your spam. If you cannot find it,
        please contact us.
      </p>
    </div>
  );
};

export default Unsubscribe;
