import React from "react";
import Container from "@material-ui/core/Container";
import Heading from "../components/Heading";
import useStyles from "./App.styles";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { useTypedSelector } from "../store";
import LoginCard from "../components/LoginCard";
import LookupCard from "../components/LookupCard";
import TicketCard from "../components/TicketCard";
import VerifyCard from "../components/VerifyCard";
import DiscordCard from "../components/DiscordCard";
import Help from "../components/Help";

const App: React.FC = () => {
  const classes = useStyles();
  const { profile } = useTypedSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderBar />
      <Heading />
      <div className={classes.container}>
        <Container maxWidth="md" className={classes.innerContainer}>
          {!profile && <LoginCard />}
          {profile && !profile.ticketReference && <LookupCard />}
          {profile && profile.ticketReference && <TicketCard />}
          {profile && profile.ticketReference && <VerifyCard />}
          {profile && profile.ticketReference && profile.verified && (
            <DiscordCard />
          )}
          {profile && <Help />}
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
