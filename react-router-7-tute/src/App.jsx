import {Route,Routes,Link} from "react-router"
import Home from "./Home"
import About from "./About"

export default function App(){
 
  return(
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        
      </Routes>
    </>
  )
}