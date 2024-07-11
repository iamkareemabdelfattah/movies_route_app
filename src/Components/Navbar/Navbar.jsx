import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-dark.webp';

export default function Navbar ( { loggedInUser, logOut } ) {

  return <>
  
  <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


          { loggedInUser ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/movies">Movies</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/tvshow">Tv Shows </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/people">People</NavLink>
            </li>   
      </ul> : '' }
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

      <li className="nav-item me-4">
        
          <i className='fa-brands me-3 fa-facebook-f'></i>
          <i className='fa-brands me-3 fa-twitter'></i>
          <i className='fa-brands me-3 fa-youtube'></i>
          <i className='fa-brands me-3 fa-instagram'></i>
            </li>
            { loggedInUser ?
              <>
                          <li className="nav-item me-4">
                  <NavLink className="nav-link text-info shadow ms-4 " aria-current="page" to="/profile">
                    Welcome : { loggedInUser.first_name }
              </NavLink>
            </li>
              <li className="nav-item">
              <NavLink onClick={ logOut } className="nav-link text-danger shadow" aria-current="page" >Logout</NavLink>
              </li>
              </>
              : <>
        
        <li className="nav-item">
                  <NavLink className="nav-link text-info shadow" aria-current="page" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
                  <NavLink className="nav-link text-info shadow ms-4" aria-current="page" to="/register">Register</NavLink>
        </li>

        </>  }

        
     
        
      </ul>
      
    </div>
  </div>
</nav>
  
  </>
}
