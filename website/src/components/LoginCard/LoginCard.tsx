import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useStyles from "./LoginCard.styles";
import { LinearProgress, CardHeader } from "@material-ui/core";
import { useTypedSelector } from "../../store";

const LoginCard: React.FC = () => {
  const classes = useStyles();
  const { loggingIn, error } = useTypedSelector((state) => state.auth);

  return (
    <Card className={classes.root} variant="outlined">
      {loggingIn && <LinearProgress />}
      <CardHeader title="Authentication Required" />
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      <CardContent>
        <Typography>Login with Discord below to get started.</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href="/api/discord/login"
          disabled={loggingIn}
        >
          Login with Discord
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginCard;
