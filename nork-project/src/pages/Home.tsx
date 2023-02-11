import React, { FC } from "react";

import classes from "./Home.module.css";

const Home: FC<{
  setEmail: (email: string) => void;
}> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <p className={classes.cardText}>
          Subscribe to our email service to receive information about what is
          going on in your neighbourhood. This will keep you in the loop with
          everything that is happening in your area.
        </p>
        <div className={classes.form}>
        <label className={classes.label} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          maxLength={100}
          onChange={(e) => props.setEmail(e.target.value)}
          className={classes.input}
        />
        </div>
      </div>
    </div>
  );
};

export default Home;
