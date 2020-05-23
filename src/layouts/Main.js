import React from "react";
import { Header } from "../components/common/Header";

export const MainLayout = ({ children }) => (
  <div id="wrapper">
    <Header />
    {children}
  </div>
);
