import React from 'react'

const Profile = ( { loggedInUser } ) =>
{
  console.log( loggedInUser );
  return (
    <div className="profile">

      <div className="container py-5 text-center">
        <table className="table">
          <thead>
            <tr>
              <th className="text-info">Username</th>
              <th className="text-info">Email</th>
              <th className="text-info">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-danger">
                { loggedInUser.first_name } { loggedInUser.last_name }
              </td>
              <td className="text-danger">{ loggedInUser.email }</td>
              <td className="text-danger">{ loggedInUser.age }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile
