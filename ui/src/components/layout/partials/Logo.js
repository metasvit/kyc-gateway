import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../../elements/Image";

import logo from "./../../../assets/images/logo.svg";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <h1 className="m-0" style={{ display: "flex" }}>
        <Link to="/">
          <Image src={logo} alt="Izyum protocol" width={64} height={64} />
        </Link>
        <span style={{ paddingLeft: 20, fontSize: 42 }}>Izyum protocol</span>
      </h1>
    </div>
  );
};

export default Logo;
