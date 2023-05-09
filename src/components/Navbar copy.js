import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  ul: {
    listStyleType: null,
    margin: 0,
    padding: 0,
  },
  li: {
    color: "blue",
    fontSize: "23px",
    display: "inline",
    paddingLeft: "16px",
  },
});

const Navbar = () => {
  const classes = styles();
  return (
    <div>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link to="/">home</Link>
        </li>
        <li className={classes.li}>
          <Link to="/kyc">kyc</Link>
        </li>
        <li className={classes.li}>
          <Link to="/defense">defense</Link>
        </li>
        <li className={classes.li}>
          <Link to="/university">university</Link>
        </li>
        <li className={classes.li}>
          <Link to="/booking">booking</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
