import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& dt": {
      fontWeight: "bold",
    },
  },
  title: {
    fontSize: 14,
  },
  error: {
    borderColor: theme.palette.error.main,
    borderRadius: theme.shape.borderRadius,
    borderStyle: "solid",
    borderWidth: "1px",
    margin: theme.shape.borderRadius,
  },
  info: {
    borderColor: theme.palette.info.main,
    borderRadius: theme.shape.borderRadius,
    borderStyle: "solid",
    borderWidth: "1px",
    margin: theme.shape.borderRadius,
  },
  form: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
