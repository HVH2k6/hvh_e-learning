
import DarkMode from "components/darkmode/DarkMode";
import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      <div>
      {children}
      <DarkMode></DarkMode>
      </div>

    </Fragment>
  );
};

export default Layout;
