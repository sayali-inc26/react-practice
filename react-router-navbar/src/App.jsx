import NavBar from "./NavBar"
import {Route,Routes,Link} from "react-router"
import Home from "./Home"
import About from "./About"
import Login from "./Login"

export default function App(){
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
    </>
  )
}