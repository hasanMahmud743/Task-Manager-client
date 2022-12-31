import { Button, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/favicon.ico";
import { authContext } from "../../Context/Contexts";

const Header = () => {
  const { user, logOut } = useContext(authContext);

  const handleLogOut = () =>{
    logOut()
    .then(res => {
      console.log(res)
    })
  }

  return (
    <div>
      <Navbar className="max-w-7xl mx-auto  mb-10" fluid={true} rounded={true}>
       <Link to='/'> <Navbar.Brand href="#">
          <img src={icon} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Task-Manager
          </span>
        </Navbar.Brand></Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {user?.email ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/addtask">Add Task</Link>
              <Link to="/mytask">My Task</Link>
              <Link to="/completedtask">Completed Task</Link>
              <Link to="/media">Media</Link>
              <Link onClick={handleLogOut} >Log Out</Link>

              
            </>
          ) : (
            <Link to="/login"> <Button color="success">Login</Button></Link>
           
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
