import {NavLink,Outlet} from "react-router"

export default function CollagePage(){
  return (
    <>
        <h1>Collage Page</h1>

        <NavLink to="student">Students</NavLink>
        <NavLink to="department">Department</NavLink>
        <NavLink to="details">College Details</NavLink>
        <Outlet/>

    </>
  )
}