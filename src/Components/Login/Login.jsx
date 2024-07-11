import axios from "axios";
import React from "react";
import { useState } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";


export default function Login ( { getData } )
{

  let [user, setUser] = useState({
    email: "",
    password: ""
  });
  let [validationError, setValidationError] = useState([]);
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function getUserData(e) {
    // let addedUser = { ...user };
    // addedUser[e.target.name] = e.target.value;
    // setUser(addedUser);
    setUser(
      {
        ...user,
        [ e.target.name ]: e.target.value
      }
    )
  }

  async function loginUser ( e )
  {
    
    e.preventDefault();

    if ( validateUser() )
    {
      setIsLoading(true);
      let { data } = await axios.post( "https://movies-api.routemisr.com/signin", user );
      console.log( data );
      
      if ( data.message === "success" )
      {
        localStorage.setItem("token", data.token)
        getData();
        navigate("/");
        setIsLoading(false);
        setApiError(null);
      } else {
        setApiError(data.message);
        setIsLoading(false);
      }
      
    }
  }

  function validateUser() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
      password: Joi.string().pattern( new RegExp(/^[a-z][0-9]{3}$/))
    });

    let res = schema.validate(user, { abortEarly: false });
    console.log(res);
    if (res.error) {
      setValidationError(res.error.details);
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="container py-4">
      <h1 className="mb-4 text-info">Login Form</h1>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      {/* {validationError.map((ele) => (
          <div className="alert alert-danger">{ele.message}</div>
        ))} */}

      <form className="w-75 mx-auto p-3 shadow-lg rounded" onSubmit={(e) => loginUser(e)}>
        <div className="form-group mb-4">
          <label for="email" className="mb-2">
            Email:
          </label>
          <input type="email" onChange={ ( e ) => getUserData( e ) } className="form-control" id="email" name="email" placeholder="
          Enter your email" />
          {validationError.filter((ele) => ele.context.label === "email")[0]?.message}
        </div>
        <div className="form-group mb-4">
          <label for="password" className="mb-2">
            Password:
          </label>
          <input type="password" onChange={ ( e ) => getUserData( e ) } className="form-control" id="password" name="password"
          placeholder="Enter your password" />
          {validationError.filter((ele) => ele.context.label === "password")[0]?.message}
        </div>

        <button className="btn btn-info ms-auto d-flex">{isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}</button>
      </form>
    </div>
  );
}

