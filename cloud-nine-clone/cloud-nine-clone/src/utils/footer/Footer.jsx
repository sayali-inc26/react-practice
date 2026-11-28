import "./Footer.css";

import { Mail, Phone, MapPin } from "lucide-react";
import logo2 from "../../assets/homePage/logo2.svg"

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube
} from "react-icons/fa";

export default function Footer() {

    return (

        <footer className="footer">

            <div className="footerContainer">

    
                <div className="footerColumn footerCompany">

                    <img src={logo2} alt="" />

                    <p className="footerTagline">
                        Your health, our priority.
                    </p>

                    <h3>Contact Us</h3>

                    <p>
                        <Mail size={17} />
                        info@cloudninecare.com
                    </p>

                    <p>
                        <Phone size={17} />
                        +91 99728 99728
                    </p>

                    <p>
                        <MapPin size={17} />
                        Pune, India
                    </p>

                </div>


                <div className="footerColumn">

                    <h3>Quick Links</h3>

                    <a href="/">Home</a>
                    <a href="/doctors">Our Doctors</a>
                    <a href="/hospitals">Hospitals</a>
                    <a href="/specialities">Specialities</a>
                    <a href="/appointments">Appointments</a>

                </div>


                <div className="footerColumn">

                    <h3>Our Services</h3>

                    <a href="/pregnancy-care">Pregnancy Care</a>
                    <a href="/maternity">Maternity Services</a>
                    <a href="/child-care">Child Care</a>
                    <a href="/fertility">Fertility Care</a>
                    <a href="/health-checkup">Health Checkup</a>

                </div>


                <div className="footerColumn">

                    <h3>Connect With Us</h3>

                    <a href="https://www.facebook.com/">
                        <FaFacebookF size={19} /> Facebook
                    </a>

                    <a href="https://www.instagram.com/">
                        <FaInstagram size={19} /> Instagram
                    </a>

                    <a href="https://www.linkedin.com/">
                        <FaLinkedinIn size={19} /> LinkedIn
                    </a>

                    <a href="https://www.youtube.com/">
                        <FaYoutube size={19} /> YouTube
                    </a>

                </div>

            </div>



            <div className="footerBottom">

                <p>
                    © 2026 Cloudnine Healthcare. All Rights Reserved.
                </p>

                <div>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms & Conditions</a>
                </div>

            </div>

        </footer>

    );

}