import { NextComponentType } from "next";
import React from "react";
import Nav from "../Nav/Nav";
import { AppProps } from "next/app";

const Layout = ({ children }: { children: AppProps }) => {
  return (
    <div className="flex flex-col items-center ">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
