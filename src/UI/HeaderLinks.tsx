import React from "react";

import classes from "./HeaderLinks.module.css";
import { Link, useLocation } from "react-router-dom";

const HeaderLinks = () => {
  const currentPage = useLocation().pathname;

  return (
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
  );
};

export default HeaderLinks;
