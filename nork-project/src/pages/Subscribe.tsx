import React from "react";
import classes from "./Subscribe.module.css";

const Subscribe = () => {
  return (
    <div className={classes.subscribeContainer}>
      <h1 className={classes.subscribeHeader}>Welcome to RADAR!</h1>
      <p className={classes.subscribeText}>
        Please check your emails for confirmation that you are now subscribed to
        our mailing list.
      </p>
      <hr className={classes.divider} />
      <p className={classes.subscribeVerify}>
        If you have not received an email confirming that you are now
        subscribed, make sure to check your spam. If you cannot find it, please
        contact us.
      </p>
    </div>
  );
};

export default Subscribe;
