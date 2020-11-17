import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "./HeaderBar.styles";
import HackSocIcon from "../../Icons/HackSocIcon";
import { Button } from "@material-ui/core";
import { useTypedSelector } from "../../store";
import { auth } from "../../firebase";

const HeaderBar: React.FC = () => {
  const classes = useStyles();
  const { profile } = useTypedSelector((state) => state.auth);

  const signOut = () => auth.signOut();

  return (
    <AppBar position="sticky" variant="outlined">
      <Toolbar>
        <HackSocIcon className={classes.icon} color="inherit" />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.headerLink}
        >
          HackNotts Discord
        </Typography>
        {profile && (
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
