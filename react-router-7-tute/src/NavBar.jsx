import { Link } from "react-router";

export default function NavBar() {
    return (
        <>
            <Link to="/">Home</Link>
            <br />
            <Link to="/about">About</Link>
            <br />
            <Link to="/login">Login</Link>
        </>
    )
}