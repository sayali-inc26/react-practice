import {useParams, Link} from 'react-router'

export default function UserDetails() {

    const paramsData = useParams();
    console.log(paramsData.id)
   
    return (
        <>
            <h1>User Details Page</h1>
            <h2>User id is :{paramsData.id}</h2>
            <h3><Link to="/users">Back</Link></h3>
           
            
        </>
    )
}