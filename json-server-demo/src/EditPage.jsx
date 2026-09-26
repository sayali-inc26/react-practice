import { useEffect, useState } from 'react';
import { useParams } from "react-router";

export default function EditPage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const editUserData = async () => {
        const url = "http://localhost:3000/users/" + id;

        let response = await fetch(url, {
            method: "patch"
        });
        response = await response.json();

        console.log(response);
        setName(response.name)
        setEmail(response.email)
        setAge(response.age)
        if (response) {
            alert("response edited");
        }
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h2>Edit User</h2>
                <label htmlFor="">Enter Name: </label>
                <input type="text" placeholder="enter name" value={name} onChange={(event) => setName(event.target.value)} style={{ marginBottom: "15px" }} />
                <br />

                <label htmlFor="">Enter Age: </label>
                <input type="text" placeholder="enter age" value={age} onChange={(event) => setAge(event.target.value)} style={{ marginBottom: "15px" }} />
                <br />


                <label htmlFor="">Enter Email: </label>
                <input type="text" placeholder="enter email" value={email} onChange={(event) => setEmail(event.target.value)} style={{ marginBottom: "15px" }} />
                <br />

                <button onClick={editUserData}>Edit User</button>

            </div>

        </>
    )
}