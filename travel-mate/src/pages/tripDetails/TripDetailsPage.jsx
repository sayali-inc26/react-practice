
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import useTripStore from "../../store/tripStore";

import { CalendarDays, Users, Wallet } from "lucide-react";

import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

import ItionaryTab from "./components/itionaryTab/ItionaryTab";
import ExpensesTab from "./components/expensesTab/ExpensesTab";
import PackingTab from "./components/packingTab/PackingTab";
import NotesTab from "./components/notesTab/NotesTab";
import GalleryTab from "./components/galleryTab/GalleryTab";

import "./TripDetailsPage.css";

export default function TripDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    // const trip = useSelector((state) =>
    //     state.tripDetails.plans.find(
    //         (item) => item.id === Number(id)
    //     )
    // );

    const trip = useTripStore((state) =>
        state.plans.find(
            (item) => item.id === Number(id)
        )
    );

    const [activeTab, setActiveTab] = useState("Itinerary");

    const tabs = [
        "Itinerary",
        "Expenses",
        "Packing",
        "Notes",
        "Gallery"
    ];

    if (!trip) {
        return (
            <>
                <Header />

                <main className="tripDetailsMain">
                    <h2>Trip not found</h2>

                    <button onClick={() => navigate("/myTrips")}>
                        Back to My Trips
                    </button>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="tripDetailsMain">

                <div className="detailsBanner">

                    <img src={trip.image} alt={trip.name} />

                    <div className="bannerText">

                        <h1>{trip.title}</h1>

                        <div className="bannerInfo">

                            <span>
                                <CalendarDays size={18} />
                                {trip.tripDate} ({trip.days} Days)
                            </span>

                            <span>
                                <Users size={18} />
                                {trip.travelers} Travelers
                            </span>

                            <span>
                                <Wallet size={18} />
                                {trip.currency}
                                {trip.budget.toLocaleString()} Budget
                            </span>

                        </div>

                    </div>

                </div>


                <div className="detailsTabs">

                    {tabs.map((tab) => (

                        <button
                            key={tab}
                            className={
                                activeTab === tab ? "detailsActive" : ""
                            }
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>

                    ))}

                </div>

                {activeTab === "Itinerary" && (
                    <ItionaryTab trip={trip} />
                )}

                {activeTab === "Expenses" && (
                    <ExpensesTab trip={trip} />
                )}

                {activeTab === "Packing" && (
                    <PackingTab trip={trip} />
                )}

                {activeTab === "Notes" && (
                    <NotesTab trip={trip} />
                )}

                {activeTab === "Gallery" && (
                    <GalleryTab trip={trip} />
                )}

            </main>

            <Footer />
        </>
    );
}
