import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    CalendarDays,
    Wallet,
    Luggage,
    ArrowRight,
    Star,
    
} from "lucide-react";

import beach from "../../assets/homePage/background.avif";
import amalfi from "../../assets/homePage/amalifa_coast_image.jpg";
import kyoto from "../../assets/homePage/kyoto_image.jpg";
import swiss from "../../assets/homePage/swis_alps_image.jpeg";
import marrakesh from "../../assets/homePage/marrakesh_image.webp";

import "./HomePage.css";
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

export default function HomePage() {

    const navigate = useNavigate();

    const features = [
        {
            id: 1,
            title: "Smart Itineraries",
            text: "Manage every hour of your adventure. Sync flights, hotels, and activities seamlessly.",
            icon: CalendarDays
        },
        {
            id: 2,
            title: "Expense Tracking",
            text: "Stay on budget with real-time tracking, automatic currency conversion, and visual summaries.",
            icon: Wallet
        },
        {
            id: 3,
            title: "Effortless Packing",
            text: "Never forget an essential again. Generate smart packing lists based on destination weather.",
            icon: Luggage
        }
    ];

    const places = [
        {
            id: 1,
            name: "Amalfi Coast",
            country: "Italy",
            type: "Coastal escape",
            rating: "4.9",
            image: amalfi,
            tag: "TravelMate"
        },
        {
            id: 2,
            name: "Kyoto",
            country: "Japan",
            type: "Cultural immersion",
            rating: "4.8",
            image: kyoto,
            tag: "TRENDING"
        },
        {
            id: 3,
            name: "Swiss Alps",
            country: "Switzerland",
            type: "Mountain adventure",
            rating: "4.9",
            image: swiss
        },
        {
            id: 4,
            name: "Marrakesh",
            country: "Morocco",
            type: "Vibrant history",
            rating: "4.7",
            image: marrakesh
        }
    ];

    return (
        <div className={"homePage"}>

            <Header/>

            <section
                className="hero"
                style={{ backgroundImage: `url(${beach})` }}
            >

                <div className="heroContent">

                    <h1>
                        TravelMate: Plan Your Perfect
                        <br />
                        Journey
                    </h1>

                    <p>
                        From local weekend getaways to global adventures,
                        organize every detail of your trip in one beautiful place.
                    </p>

                    <div className="heroButtons">

                        <button
                            className="startBtn"
                            onClick={() => navigate("/planner")}
                        >
                            Start Planning Now
                        </button>

                        <button
                            className="exploreBtn"
                            onClick={() => navigate("/trips")}
                        >
                            Explore My Trips
                        </button>

                    </div>

                </div>

            </section>

            <section className="features">

                <h2>Seamless Trip Management</h2>

                <p className="sectionText">
                    Everything you need for a stress-free journey.
                </p>

                <div className="featureList">

                    {features.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div className="featureCard" key={item.id}>

                                <div className="featureIcon">
                                    <Icon size={25} strokeWidth={1.7} />
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.text}</p>

                            </div>
                        );
                    })}

                </div>

            </section>

            {/* DESTINATIONS */}

            <section className="destinations">

                <div className="sectionHead">

                    <div>
                        <h2>Where to next?</h2>

                        <p>
                            Recommended destinations tailored to your travel style.
                        </p>
                    </div>

                    <Link to="/destinations" className="viewAll">
                        View All Destinations
                        <ArrowRight size={16} />
                    </Link>

                </div>

                <div className="placeList">

                    {places.map((place) => (

                        <div className="placeCard" key={place.id}>

                            <img src={place.image} alt={place.name} />

                            {place.tag && (
                                <span className="placeTag">
                                    {place.tag}
                                </span>
                            )}

                            <div className="placeInfo">

                                <div className="placeTitle">

                                    <h3>{place.name}</h3>

                                    <span className="rating">
                                        <Star size={12} fill="currentColor" />
                                        {place.rating}
                                    </span>

                                </div>

                                <p>
                                    {place.country} • {place.type}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            <Footer/>

        </div>
    );
}
