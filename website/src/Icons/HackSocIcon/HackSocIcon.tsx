import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const HackSocIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <g>
        <polyline
          points="608.33 157.67 608.33 225.54 716.67 293.42 716.67 225.54 825 293.42 825 677.83 500 482.04 175 677.83 175 293.76 283.33 225.89 283.33 293.76 391.67 225.89 391.67 158.02 391.67 158.72 500 90.85 500 90.5 608.33 158.37"
          fill={props.color}
        />
        <polygon
          points="500 501.62 175 697.4 175 909.5 500 716.84 825 909.5 825 697.4 500 501.62"
          fill={props.color}
        />
      </g>
    </svg>
  </SvgIcon>
);

export default HackSocIcon;
