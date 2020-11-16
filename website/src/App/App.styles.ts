import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 5),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    "& .MuiCard-root": {
      margin: theme.spacing(0, 0, 5),
    },
  },
}));

export default useStyles;
