
import "./HomePageNavbar.css"
import logo from "../../../../assets/homepage/logo.svg";
import { useState } from "react";

export default function HomePageNavbar() {
    const [category, setCategory] = useState("");
    return (

        <>
            <main className="homePageNavbar">

                <img src={logo} alt="" />

                <div className="nabarItems">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">About</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour">Tour</option>
                        <option value="investors">Investors</option>
                    </select>

                    <select name="" id=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Specialities</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour">Tour</option>
                        <option value="investors">Investors</option>
                    </select>
                    <select name="" id=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Locations</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour">Tour</option>
                        <option value="investors">Investors</option>
                    </select>
                    <select name="" id=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Home Care</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour">Tour</option>
                        <option value="investors">Investors</option>
                    </select>
                    <select name="" id=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Resources</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour"> Tour</option>
                        <option value="investors">Investors</option>
                    </select>
                    <select name="" id=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Cources</option>
                        <option value="about">About Us</option>
                        <option value="story">Story</option>
                        <option value="vTour"> Tour</option>
                        <option value="investors">Investors</option>
                    </select>
                   


                </div>
            </main>
        </>
    )
}