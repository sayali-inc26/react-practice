import {Link} from "react-router"

export default function UserList() {
    const userData = [
        {
            id: 1,
            name: "Sayali"
        },
        {
            id: 2,
            name: "Jaju"
        },
        {
            id: 3,
            name: "Aarya"
        },
        {
            id: 4,
            name: "Gauri"
        },
        {
            id: 5,
            name: "Anjali"
        },
        {
            id: 6,
            name: "Sanika"
        }


    ];
    return (
        <>
            <h1>User Lsit Page</h1>
            <h1>dfghjk</h1>
            {
                userData.map((item) => (
                    <div>
                        
                        <h4><Link to={"/users/"+item.id}>{item.name}</Link></h4>
                    </div>
                ))
            }
        </>
    )
}