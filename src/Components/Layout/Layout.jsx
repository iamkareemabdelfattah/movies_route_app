import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ( { loggedInUser, logOut } ) =>
{
  // console.log(
  //   'Layout.js: loggedInUser: ', loggedInUser,
  //   'Layout.js: logOut: ', logOut
  //   );
  return (
    <>
      <Navbar loggedInUser={ loggedInUser } logOut={ logOut } />
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout;
