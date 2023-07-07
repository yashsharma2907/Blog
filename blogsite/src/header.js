import React, { useEffect,useContext,useState } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "./UserContext";


function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://b-log-yz7o.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://b-log-yz7o.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
      <a href="" className="logo">BlogWebsite</a>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
export default Header;