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
  button: {
    margin: theme.spacing(1),
  },
  checkMark__circle: {
    strokeDasharray: 166,
    strokeDashoffset: 166,
    strokeWidth: 2,
    strokeMiterlimit: 10,
    stroke: theme.palette.success.main,
    fill: "none",
    animation: `$stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards`,
  },
  checkMark: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "block",
    strokeWidth: 2,
    stroke: theme.palette.success.contrastText,
    strokeMiterlimit: 10,
    margin: "1% auto",
    boxShadow: `inset 0px 0px 0px ${theme.palette.success.main}`,
    animation: `$fill .4s ease-in-out .4s forwards, $scale .3s ease-in-out .9s both`,
  },
  checkMark__check: {
    transformOrigin: "50% 50%",
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: `$stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards`,
  },
  "@keyframes stroke": {
    "100%": {
      strokeDashoffset: 0,
    },
  },
  "@keyframes scale": {
    "0%, 100%": {
      transform: "none",
    },
    "50%": {
      transform: "scale3d(1.1, 1.1, 1)",
    },
  },
  "@keyframes fill": {
    "100%": {
      boxShadow: `inset 0px 0px 0px 30px ${theme.palette.success.main}`,
    },
  },
}));

export default useStyles;
