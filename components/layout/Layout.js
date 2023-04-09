import React from "react";
import Nav from "/components/Nav.js";
import RegisterForm from "../RegisterForm";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
