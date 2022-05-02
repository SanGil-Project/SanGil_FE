import React from "react";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const Mobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  return <>{Mobile && children}</>;
};

const Desktop = ({ children }) => {
  const Desktop = useMediaQuery({
    query: "(min-width:769px)",
  });
  return <>{Desktop && children}</>;
};

export { Mobile, Desktop };
