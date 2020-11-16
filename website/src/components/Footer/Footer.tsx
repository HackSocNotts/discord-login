import React from "react";
import useStyles from "./Footer.styles";
import Copyright from "../Copyright";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  );
};

export default Footer;
