import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./VerifyCard.style";
import { LinearProgress, CardHeader, TextField } from "@material-ui/core";
import { AppDispatch, useTypedSelector } from "../../store";
import { useDispatch } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { startVerify, verifyWithCode } from "../../store/verify";

const VerifyCard: React.FC = () => {
  const classes = useStyles();
  const { profile } = useTypedSelector((state) => state.auth);
  const { error, loading } = useTypedSelector((state) => state.verify);
  const dispatch: AppDispatch = useDispatch();

  const [code, setCode] = useState("");

  const sendCode = () => dispatch(startVerify());
  const checkCode = () => dispatch(verifyWithCode(code));

  const handleKeyUp = (e: React.KeyboardEvent) =>
    e.key === "Enter" && checkCode();

  return (
    <Card className={classes.root} variant="outlined">
      {loading && <LinearProgress />}
      <CardHeader title="Phone Verification" />
      {error && <CardContent className={classes.error}>{error}</CardContent>}
      <CardContent>
        {profile && !profile.verified && (
          <>
            <Typography>
              In order to gain access to the HackNotts Discord we require to
              first verify your phone number. Please click the button below or
              enter the code you received to continue.
            </Typography>
            <Typography>
              If you are not receiving a code or are having trouble sending your
              code, it is likely that your phone number is not in a valid format
              and you will need to update your phone number on your ticket.
            </Typography>
            <Typography>
              For UK phone numbers you can either enter your phone number with a
              "0" at the start or with "44". For all other regions please
              precede your phone number with your country code.
            </Typography>
          </>
        )}
        {profile && profile.verified && (
          <Typography>Thank you for verifying your phone number.</Typography>
        )}
      </CardContent>
      {profile && !profile.verified && !profile.verificationStarted && (
        <CardContent className={classes.form}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SendIcon />}
            onClick={sendCode}
          >
            Send Code
          </Button>
        </CardContent>
      )}
      {profile && !profile.verified && profile.verificationStarted && (
        <CardContent className={classes.form}>
          <TextField
            label="Verification Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={checkCode}
            aria-label="Submit"
          >
            <SendIcon />
          </Button>
        </CardContent>
      )}
      {profile && profile.verified && (
        <CardContent>
          <svg
            className={classes.checkMark}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={classes.checkMark__circle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={classes.checkMark__check}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </CardContent>
      )}
    </Card>
  );
};

export default VerifyCard;
