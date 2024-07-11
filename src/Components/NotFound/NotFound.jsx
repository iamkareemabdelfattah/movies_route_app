import React from 'react'
import Notfound from '../../images/page-not-found.jpg';

const NotFound = () => {
  return (
    <div>
      <div className='d-flex justify-content-center p-5 m-5 align-content-center'>
        <img src={ Notfound } alt="page-not-found" />
      </div>
    </div>
  )
}

export default NotFound
