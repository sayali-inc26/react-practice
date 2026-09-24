import NavBar from "./NavBar"
import { Route, Routes } from "react-router"
import Home from "./Home"
import About from "./About"
import Login from "./Login"
import PageNotFoundPage from "./PageNotFoundPage"
import CollagePage from "./CollagePage"
import Student from "./Student"
import Department from "./Department"
import Details from "./Details"

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route>
          <Route element={<NavBar/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/collage" element={<CollagePage />}>
          <Route index element={<Student />} />
          <Route path="department" element={<Department />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="*" element={<PageNotFoundPage />} />
        {/* <Route path="/*" element={<Navigate to="/" />}/> */}

      </Routes>
    </>
  )
}