import React, { FC } from "react";

import classes from "./Header.module.css";
import HeaderLinks from "./HeaderLinks";

const Header: FC<{
  title: string;
}> = (props) => {
  return (
    <div className={classes.header}>
      <img src="/logo.png" alt="Logo" className={classes.logo} />
      <h1 className={classes.headerTitle}>{props.title}</h1>
      <div className={classes.showHeaderLinks}>
        <HeaderLinks />
      </div>
    </div>
  );
};

export default Header;
