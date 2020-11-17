import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./TicketCard.styles";
import { LinearProgress, CardHeader } from "@material-ui/core";
import { AppDispatch, useTypedSelector } from "../../store";
import { clearTicket, refreshTicket } from "../../store/ticket";
import { useDispatch } from "react-redux";

const TicketCard: React.FC = () => {
  const classes = useStyles();
  const { loading, profile, authProfile, error } = useTypedSelector(
    (state) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();

  const clear = () => dispatch(clearTicket());
  const refresh = () => dispatch(refreshTicket());

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title="Ticket Details" />
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      <CardContent>
        {profile && (
          <>
            <Typography>Below is a summary of your ticket</Typography>
            <Typography>
              Please note, that if any of your details are incorrect, you will
              need to update them on your{" "}
              <a
                href={profile.ticketUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                ticket
              </a>{" "}
              before proceeding. Once you've updated your ticket on tito you can
              refresh your ticket with the button below.
            </Typography>
          </>
        )}
      </CardContent>
      {(profile || authProfile) && (
        <CardContent>
          <dl>
            <dt>Name</dt>
            <dd>{authProfile ? authProfile.fullName : "loading..."}</dd>
            <dt>Email Address</dt>
            <dd>{authProfile ? authProfile.email : "loading..."}</dd>
            <dt>Phone Number</dt>
            <dd>{authProfile ? authProfile.phoneNumber : "loading..."}</dd>
            <dt>Ticket Reference</dt>
            <dd>{profile ? profile.ticketReference : "loading..."}</dd>
            <dt>Ticket Type</dt>
            <dd>{profile ? profile.ticketReleaseTitle : "loading..."}</dd>
          </dl>
        </CardContent>
      )}
      <CardActions>
        {profile && (
          <>
            <Button size="small" disabled={loading} onClick={refresh}>
              Refresh
            </Button>
            <Button size="small" disabled={loading} onClick={clear}>
              Clear Ticket
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TicketCard;
