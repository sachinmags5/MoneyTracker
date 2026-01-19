import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const User = () => {
    const Users = useSelector((state) => state.users.users);
    console.log(Users.length)
    console.log("Users")
    // const users = [
    //     {
    //         "id":1,
    //         "name":"Sachin",
    //         "email":"sachin@gmail.com",
    //         "address":"c1-sarova,samata nagar"
    //     },
    //     {
    //         "id":2,
    //         "name":"Appu",
    //         "email":"appu@gmail.com",
    //         "address":"c1-sarova,samata nagar"
    //     }
    // ]
  return (
    <>
    <div>User List</div>
    {Users?.map(user => <li key={user.id}>{user.name}</li>)}
    </>
    
  )
}

export default User