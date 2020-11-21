import { Link } from "@material-ui/core";
import React, { useState } from "react";
import HelpCard from "../HelpCard";

const Help = () => {
  const [showHelp, setShowHelp] = useState(false);
  return !showHelp ? (
    <span>
      Having trouble?{" "}
      <Link
        role="button"
        onClick={() => setShowHelp(!showHelp)}
        style={{ cursor: "pointer" }}
      >
        Click here for help
      </Link>
      .
    </span>
  ) : (
    <HelpCard />
  );
};

export default Help;
