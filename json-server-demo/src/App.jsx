import EditPage from "./EditPage";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import {Routes,Route,NavLink} from "react-router"
export default function App() {

 

  return (
    <div>
      <ul style={{listStyle:"none", display:"flex", gap:"30px"}}>
        <li><NavLink to="/" style={{textDecoration:"none"}}>List</NavLink></li>
        <li><NavLink to="/add" style={{textDecoration:"none"}}>Add User</NavLink></li>
      </ul>
      <h1>Integrate JSON API and Loader</h1>
      {/* <UserList/> */}
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="/add" element={<UserAdd/>}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
      </Routes>
      </div>

  )
}