import React, { FC } from "react";

import classes from "./Home.module.css";

const Home: FC<{
  setEmail: (email: string) => void;
}> = (props) => {
  return (
    <div>
      <input
        type="email"
        maxLength={100}
        onChange={(e) => props.setEmail(e.target.value)}
        className={classes.input}
      />
    </div>
  );
};

export default Home;
