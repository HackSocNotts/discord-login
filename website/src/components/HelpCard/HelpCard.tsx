import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useStyles from "./HelpCard.styles";

const HelpCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Something's gone wrong? We get it, we're not perfect." />
      <CardContent>
        <Typography>
          We have three options for getting in touch, if you're having trouble.
        </Typography>
        <Typography>
          <ul>
            <li>
              <strong>Discord:</strong> Join the HackSoc Discord and raise a
              help ticket in the #get-help channel there. We should respond
              pretty quickly. You can join at{" "}
              <Link
                href="https://hacksoc.net/discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                hacksoc.net/discord
              </Link>
            </li>
            <li>
              <strong>Email:</strong> We may be slightly slower to respond, but
              we will be monitoring{" "}
              <Link
                href="mailto:discord@hacnotts.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                discord@hacknotts.com
              </Link>{" "}
              regularly throughout the week leading up to, and during HackNotts.
            </li>
            <li>
              <strong>Phone:</strong> If we're not responding in a timely manner
              on either of the above solutions. You can call a member of the
              team at{" "}
              <Link
                href="tel:+441158244588"
                target="_blank"
                rel="noopener noreferrer"
              >
                +44 115 824 4588
              </Link>
              . Please note, however, you may not get an answer outside of
              business hours during the week leading up to HackNotts. We'll be
              monitoring the phone number for the full duration of the
              hackathon.
            </li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
