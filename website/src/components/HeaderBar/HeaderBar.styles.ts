import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  headerLink: {
    textDecoration: "none",
    flex: 1,
  },
}));

export default useStyles;
