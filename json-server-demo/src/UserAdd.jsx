import {useState} from 'react';

export default function UserAdd(){

    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [email,setEmail] =useState('');

    const createUser =async()=>{
        console.log(name,age,email);
        const url ="http://localhost:3000/users";

        let response = await fetch(url,{
            method:"Post",
            body:JSON.stringify({name,email,age})
        });
        response = await response.json();
        if(response){
            alert("new user added");
        }
    }

    return(
        <div style={{textAlign:"center"}}>
            <h2>Add New User</h2>
            <label htmlFor="">Enter Name: </label>
            <input type="text" placeholder="enter name" onChange={(event)=>(setName(event.target.value))} style={{marginBottom:"15px"}} />
            <br />

            <label htmlFor="">Enter Age: </label>
            <input type="text" placeholder="enter age" onChange={(event)=>(setAge(event.target.value))} style={{marginBottom:"15px"}}/>
            <br />


            <label htmlFor="">Enter Email: </label>
            <input type="text" placeholder="enter email" onChange={(event)=>(setEmail(event.target.value))} style={{marginBottom:"15px"}}/>
            <br />

            <button onClick={createUser}>Add User</button>

        </div>
    )
}