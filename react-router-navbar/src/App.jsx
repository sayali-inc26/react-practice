import NavBar from "./NavBar"
import {Navigate, Route,Routes,Link} from "react-router"
import Home from "./Home"
import About from "./About"
import Login from "./Login"
import PageNotFoundPage from "./PageNotFoundPage"

export default function App(){
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<PageNotFoundPage/>}/>
        {/* <Route path="/*" element={<Navigate to="/" />}/> */}
        
      </Routes>
    </>
  )
}