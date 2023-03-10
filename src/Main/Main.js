import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Navbar/Header";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div className="max-w-6xl m-auto">
        <Outlet></Outlet>
      </div>
      
    </div>
  );
};

export default Main;
