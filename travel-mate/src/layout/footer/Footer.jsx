import { Link } from "react-router-dom"

import "./Footer.css"

export default function Footer(){
    return(
        <>

            <footer className="homeFooter">

                <Link to="/home" className="footerBrand">
                    TravelMate
                </Link>

                <div className="footerLinks">
                    <Link to="/about">About</Link>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/support">Support</Link>
                </div>

                <p>
                    © 2024 TravelMate Premium. All rights reserved.
                </p>

            </footer>
        </>
    )
}