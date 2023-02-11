import React, { FC } from "react";

import classes from "./Header.module.css";

const Header: FC<{
  title: string;
}> = (props) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.headerTitle}>{props.title}</h1>
    </header>
  );
};

export default Header;
