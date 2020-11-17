import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./DiscordCard.styles";
import { LinearProgress, CardHeader } from "@material-ui/core";
import { AppDispatch, useTypedSelector } from "../../store";
import { useDispatch } from "react-redux";
import { joinDiscord } from "../../store/discord";

const DiscordCard: React.FC = () => {
  const classes = useStyles();
  const { loading, error } = useTypedSelector((state) => state.discord);
  const dispatch: AppDispatch = useDispatch();

  const join = () => dispatch(joinDiscord());

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title="Discord" />
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      <CardContent>
        <Typography>
          Thank you for verifying. You can now join the server by clicking the
          button below.
        </Typography>
      </CardContent>
      <CardContent className={classes.form}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={join}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiscordCard;
