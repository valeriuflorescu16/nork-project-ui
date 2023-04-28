import React, { FC } from "react";

import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header: FC<{
  title: string;
}> = (props) => {
  const currentPage = useLocation().pathname;

  return (
    <div className={classes.header}>
      <img src="./logo.png" alt="Logo" className={classes.logo} />
      <h1 className={classes.headerTitle}>{props.title}</h1>
      <div className={classes.headerLinks}>
        <Link to="/" className={currentPage === "/" ? classes.active : ""}>
          Home
        </Link>
        <Link
          to="/info"
          className={currentPage === "/info" ? classes.active : ""}
        >
          Information
        </Link>
      </div>
    </div>
  );
};

export default Header;
