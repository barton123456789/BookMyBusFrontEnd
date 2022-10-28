import React, { useState } from 'react'



const ListUser = () => {
    const[users,setUsers]=useState([])
  return (
    <div className="container">
        
        <h2 className="text-center">Registered Users</h2>
        <table className=" table table-bordered table-striped">
            <thead>
                <th>User Id</th>
                <th>Full Nmae</th>
                <th>Email </th>
                <th>Password</th>
                <th>Age</th>
                <th>Gender</th>
            </thead>
            {/* <tbody>
                {
                    users.map(
                        user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                        </tr>
                    )
                }
            </tbody> */}
        </table>
    </div>
  )
}

export default ListUser