import { useEffect, useState } from "react";

import './App.css'
export default function App() {

  const [userData,setUserData]=useState([]) 
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    getUserData();
  },[])

  const getUserData = async()=>{
    const url="https://jsonplaceholder.typicode.com/users";
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    setUserData(response)
    setLoading(false)
    
  }
  return (
    <div>
      <h1>Integrate JSON Server API and Loader</h1>
      <ul className="user-list user-list-head">
          <li>Name</li>
          <li>UserName</li>
          <li>Email</li>

         </ul>
      {
        !loading?
        userData.map((user)=>(
         <ul key={user.name} className="user-list">
          <li>{user.name}</li>
          <li>{user.username}</li>
          <li>{user.email}</li>

         </ul>
        ))
        :<h1>Data Loading...</h1>
      }
   
    </div>
  )
}