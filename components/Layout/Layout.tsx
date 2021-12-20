import { NextComponentType } from "next";
import React from "react";
import Nav from "../Nav/Nav";
import { AppProps } from "next/app";
import VerticalNav from "./VerticalNav";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <VerticalNav />
      <div className="flex flex-col items-center pb-10">
        <Nav />
        {children}
      </div>
    </>
  );
};

export default Layout;
