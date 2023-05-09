import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bolder",
};

const Navbar = () => {
  const classes = styles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon style={{ marginRight: "4em" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/university" style={linkStyle}>
              University
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/defense" style={linkStyle}>
              Defense
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/booking" style={linkStyle}>
              Booking
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
