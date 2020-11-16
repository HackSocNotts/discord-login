import React from "react";
import Container from "@material-ui/core/Container";
import Heading from "../components/Heading";
import useStyles from "./App.styles";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderBar />
      <Heading />
      <div className={classes.container}>
        <Container maxWidth="md" className={classes.innerContainer}>
          Hello World
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
