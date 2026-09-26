import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function UserList() {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const url = "http://localhost:3000/users";
  useEffect(() => {
    setLoading(true);
    getUserData()
  }, [])

  const getUserData = async () => {
    
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    setUserData(response);
    setLoading(false);
  }

  const deleteUser =async(id)=>{
    console.log(id);
    let response = await fetch(url+"/"+id,{
      method:"delete",

    });
    response = await response.json();
    console.log(response);
    if(response){
      alert("response deleted");
      getUserData()

    }
    
  }

  const editUser =(id)=>{

    console.log("userid is :"+id)
    
    navigate("/edit/"+id);
   
    
  }
  return (
    <div>
      
      <ul style={{ display: "flex", justifyContent: "space-around", width: "500px", listStyle: "none", border: "0.5px solid black", margin: "0", padding: "10px",fontWeight:"bold" }}>
        <li>Name</li>
        <li>Age</li>
        <li>Email</li>
        <li>Action</li>
      </ul>
      {

        !loading ?

          userData.map((user) => (

            <ul style={{ display: "flex", justifyContent: "space-around", width: "500px", listStyle: "none", border: "0.5px solid black", margin: "0", padding: "10px" }}>
              <li>{user.name}</li>
              <li>{user.age}</li>
              <li>{user.email}</li>
              <li><div style={{display:"flex", gap:"10px"}}>
                <button onClick={()=>deleteUser(user.id)}>Delete</button>
                <button onClick={()=>editUser(user.id)}>Edit</button>
                </div></li>
            </ul>
          ))
          : <h1>Loading Data...</h1>
      }
    </div>
  )
}