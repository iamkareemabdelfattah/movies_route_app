import React, { useEffect, useState } from 'react';
import Layout from './../Layout/Layout';
import Home from './../Home/Home';
import Moviess from './../Movies/Movies';
import MoviesDetails from './../MovieDetails/MoviesDetails';
import TvShow from './../TvShow/TvShow';
import TvShowDetails from './../TvShowDetails/TvShowDetails';
import People from './../People/People';
import PeopleDetails from './../PeopleDetails/PeopleDetails';
import Login from './../Login/Login';
import Register from './../Register/Register';
import NotFound from './../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function App ()
{

  // {}
  const [ loggedInUser, setLoggedInUser ] = useState( null );

  function getData ()
  {
    const token = localStorage.getItem( 'token' );
    if ( token )
    {
      const decodedToken = jwtDecode( token );
      setLoggedInUser( decodedToken );
    } else
    {
      setLoggedInUser( null );
    }
  }

  function logOut ()
  {
    localStorage.removeItem( 'token' );
    setLoggedInUser( null );
    <Navigate to={ '/login' } />;
  }

  useEffect( () => getData(), [] );
  

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={ <Layout loggedInUser={ loggedInUser } logOut={ logOut } /> }>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="movies" element={
            <ProtectedRoute>
              <Moviess />
            </ProtectedRoute>
          } />
          <Route path="movies/details/:id" element={
            <ProtectedRoute>
              <MoviesDetails />
            </ProtectedRoute>
          } />
          <Route path="tvshow" element={
            <ProtectedRoute>
              <TvShow />
            </ProtectedRoute>
          } />
          <Route path="tvshow/details/:id" element={
            <ProtectedRoute>
              <TvShowDetails />
            </ProtectedRoute>
          } />
          <Route path="people" element={
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          } />
          <Route path="people/details/:id" element={
            <ProtectedRoute>
              <PeopleDetails />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile loggedInUser={ loggedInUser } />
            </ProtectedRoute>
          } />
          <Route path="login" element={ <Login getData={ getData } /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="*" element={ <NotFound /> } />
        </Route>
      </>
    )
  );



  return <RouterProvider router={ routes } />;
}
