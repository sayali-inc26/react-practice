import { NavLink, Outlet, Link } from "react-router"

export default function CollagePage() {
    return (
        <>
            <h1>Collage Page</h1>
            <h3><Link to="/">Go to home page</Link></h3>
            <NavLink to="">Students</NavLink>
            <NavLink to="department">Department</NavLink>
            <NavLink to="details">College Details</NavLink>
            <Outlet />

        </>
    )
}