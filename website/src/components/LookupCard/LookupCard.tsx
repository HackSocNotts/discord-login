import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./LookupCard.styles";
import { LinearProgress, CardHeader, TextField } from "@material-ui/core";
import { AppDispatch, useTypedSelector } from "../../store";
import { clearSearch, confirmTicket, lookupTicket } from "../../store/ticket";
import { useDispatch } from "react-redux";

const LookupCard: React.FC = () => {
  const classes = useStyles();
  const { loading, error, ticket } = useTypedSelector((state) => state.ticket);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");

  const lookup = () => dispatch(lookupTicket({ email, reference }));
  const clear = () => {
    dispatch(clearSearch());
    setEmail("");
    setReference("");
  };
  const confirm = ticket
    ? () => dispatch(confirmTicket(ticket.slug))
    : () => undefined;

  const handleKeyUp = (e: React.KeyboardEvent) => e.key === "Enter" && lookup();

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title="Ticket Details" />
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      <CardContent>
        {!ticket && <Typography>Lookup your Ticket to Continue</Typography>}
        {ticket && (
          <>
            <Typography>
              Please confirm that the following details are correct.
            </Typography>
            <Typography>
              Please note, that if any of your details are incorrect, you will
              need to update them on your{" "}
              <a
                href={ticket.unique_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                ticket
              </a>{" "}
              before proceeding.
            </Typography>
          </>
        )}
      </CardContent>
      {!ticket && (
        <CardContent className={classes.form}>
          <TextField
            label="Email Address"
            required
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <TextField
            label="Ticket Reference"
            placeholder="ABCD-1"
            required
            variant="outlined"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </CardContent>
      )}
      {ticket && (
        <CardContent>
          <dl>
            <dt>Name</dt>
            <dd>{ticket.name}</dd>
            <dt>Email Address</dt>
            <dd>{ticket.email}</dd>
            <dt>Ticket Type</dt>
            <dd>{ticket.release_title}</dd>
          </dl>
        </CardContent>
      )}
      <CardActions>
        {!ticket && (
          <Button size="small" disabled={loading} onClick={lookup}>
            Lookup
          </Button>
        )}
        {ticket && (
          <>
            <Button
              size="small"
              disabled={loading}
              onClick={confirm}
              color="primary"
            >
              Confirm
            </Button>
            <Button size="small" disabled={loading} onClick={clear}>
              Clear Search
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default LookupCard;
