import React from "react";
import useStyles from "./SuccessTick.styles";

const SuccessTick = () => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};

export default SuccessTick;
