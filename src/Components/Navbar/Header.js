import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar className="max-w-7xl mx-auto  mb-10" fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Task-Manager
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {/* <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link> */}
          <Link to="/addtask">Add Task</Link>
          <Link to="/mytask">My Task</Link>
          <Link to="/completedtask">Completed Task</Link>
          <Link to="/completedtask">Media</Link>

          
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
