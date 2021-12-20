import { NextComponentType } from "next";
import React from "react";
import Nav from "../Nav/Nav";
import { AppProps } from "next/app";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col items-center pb-10">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
