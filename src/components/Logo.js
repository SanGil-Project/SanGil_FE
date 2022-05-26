import React from "react";

const Logo = () => {
  return (
      <img
        alt="로고"
        style={{ position: "fixed", left: "20%", top: "25%" }}
        src={require("../assets/images/193Logo.png")}
      />
  );
};

export default Logo;
