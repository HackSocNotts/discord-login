import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Copyright: React.FC = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link
      color="inherit"
      href="https://hacksocnotts.co.uk"
      rel="noreferrer noopener"
    >
      HackSoc Nottingham
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;
