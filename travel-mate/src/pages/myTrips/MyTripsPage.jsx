
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useTripStore from "../../store/tripStore";
// import { useSelector, useDispatch } from "react-redux";
// import { selectTrip } from "../../redux/slices/tripDetails";

import {
    Search,
    ChevronDown,
    ListFilter,
    Wallet,
    Ticket,
    Luggage,
    Compass,
    CalendarDays,
    CheckCheck
} from "lucide-react";

import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";

import "./MyTripsPage.css";

export default function MyTripsPage() {

    const navigate = useNavigate();
    const trips = useTripStore((state) => state.plans);

    const selectTrip = useTripStore((state) => state.selectTrip);

    function openTrip(id) {
        selectTrip(id);
        navigate(`/myTrips/tripDetails/${id}`);
    }

    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [tripType, setTripType] = useState("");
    const [year, setYear] = useState("");
    const [duration, setDuration] = useState("");
    const [budget, setBudget] = useState("");
    const [sort, setSort] = useState(false);

    const tabs = ["All", "Upcoming", "Completed", "Favorites"];

    // const trips = [
    //     {
    //         id: 1,
    //         name: "Goa, India",
    //         date: "Dec 12 - Dec 18, 2023",
    //         year: "2023",
    //         status: "Completed",
    //         type: "Beach",
    //         days: 7,
    //         budget: 27450,
    //         currency: "₹",
    //         activities: 16,
    //         packing: 100,
    //         favorite: true,
    //         image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900"
    //     },
    //     {
    //         id: 2,
    //         name: "Paris, France",
    //         date: "May 10 - May 24, 2024",
    //         year: "2024",
    //         status: "Upcoming",
    //         type: "City",
    //         days: 15,
    //         budget: 2500,
    //         currency: "€",
    //         activities: 5,
    //         packing: 40,
    //         favorite: false,
    //         image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900"
    //     }
    // ];

    const filteredTrips = trips.filter((trip) => {

        const matchTab =
            activeTab === "All" ||
            (activeTab === "Favorites"
                ? trip.favorite
                : trip.status === activeTab);

        const matchSearch = trip.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchType = !tripType || trip.type === tripType;

        const matchYear = !year || trip.year === year;

        const matchDuration =
            !duration ||
            (duration === "Short" && trip.days <= 7) ||
            (duration === "Long" && trip.days > 7);

        const matchBudget =
            !budget ||
            (budget === "Low" && trip.budget < 10000) ||
            (budget === "Medium" && trip.budget >= 10000 && trip.budget <= 30000) ||
            (budget === "High" && trip.budget > 30000);

        return matchTab && matchSearch && matchType &&
            matchYear && matchDuration && matchBudget;
    });

    if (sort) {
        filteredTrips.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
        <div className="myTripMainArea">

            <Header />

            <main className="tripContainer">

                <h1>My Trips</h1>

                <div className="tripTabs">

                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "activeTab" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}

                </div>

                <div className="tripFilters">

                    <div className="tripSearch">
                        <Search size={20} />

                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="tripSelect">

                        <select
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}
                        >
                            <option value="">Trip Type</option>
                            <option value="Beach">Beach</option>
                            <option value="City">City</option>
                        </select>

                        <ChevronDown size={15} />

                    </div>

                    <div className="tripSelect">

                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">Year</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>

                        <ChevronDown size={15} />

                    </div>

                    <div className="tripSelect">

                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <option value="">Duration</option>
                            <option value="Short">1 - 7 Days</option>
                            <option value="Long">8+ Days</option>
                        </select>

                        <ChevronDown size={15} />

                    </div>

                    <div className="tripSelect">

                        <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        >
                            <option value="">Budget</option>
                            <option value="Low">Below 10,000</option>
                            <option value="Medium">10,000 - 30,000</option>
                            <option value="High">Above 30,000</option>
                        </select>

                        <ChevronDown size={15} />

                    </div>

                    <button
                        className="tripSort"
                        onClick={() => setSort(!sort)}
                    >
                        <ListFilter size={18} />
                        Sort {sort ? "A-Z" : ""}
                    </button>

                </div>

                {/* Trip Cards */}

                <div className="tripGrid">

                    {filteredTrips.map((trip) => (

                        <div className="tripCard" key={trip.id}>

                            <div className="tripImage">

                                <img src={trip.image} alt={trip.name} />

                                <span className="tripStatus">
                                    {trip.status === "Completed"
                                        ? <CheckCheck size={14} />
                                        : <CalendarDays size={14} />
                                    }
                                    {trip.status}
                                </span>

                                <div className="tripImageText">
                                    <h2>{trip.name}</h2>
                                    <p>{trip.date}</p>
                                </div>

                            </div>

                            <div className="tripBody">

                                {trip.status === "Completed" && (
                                    <div className="tripSuccess">
                                        Another Adventure Completed! 🎉
                                    </div>
                                )}

                                <div className="tripStats">

                                    <div className="tripStat">
                                        <Wallet size={20} />

                                        <span>
                                            {trip.status === "Completed"
                                                ? "Total Spent:"
                                                : "Budget:"}
                                            <strong>
                                                {trip.currency}{trip.budget.toLocaleString()}
                                            </strong>
                                        </span>
                                    </div>

                                    <div className="tripStat">
                                        <Ticket size={20} />

                                        <span>
                                            {trip.activities}
                                            {trip.status === "Completed"
                                                ? " Activities"
                                                : " Planned"}
                                        </span>
                                    </div>

                                </div>

                                <div className="tripPacking">
                                    <Luggage size={20} />
                                    {trip.packing}% Packing Completed
                                </div>

                                {trip.status === "Upcoming" && (
                                    <div className="tripProgress">
                                        <div
                                            style={{ width: `${trip.packing}%` }}
                                        ></div>
                                    </div>
                                )}

                                <div className="tripBottom">

                                    {trip.status === "Completed" ? (
                                        // <button
                                        //     className="detailsBtn"
                                        //     onClick={() => navigate(`/myTrips/tripDetails/${trip.id}`)}
                                        // >
                                        //     View Details
                                        // </button>

                                        <button
                                            className="detailsBtn"
                                            onClick={() => openTrip(trip.id)}
                                        >
                                            View Details
                                        </button>
                                    ) : (
                                        <>
                                            <span>Upcoming Trip</span>

                                            {/* <button
                                                className="manageBtn"
                                                onClick={() => navigate(`/myTrips/tripDetails/${trip.id}`)}
                                            >
                                                Manage Trip
                                            </button> */}

                                            <button
                                                className="manageBtn"
                                                onClick={() => openTrip(trip.id)}
                                            >
                                                Manage Trip
                                            </button>
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                    {/* Add New Trip Card - All Tab */}

                    {activeTab === "All" && !search && !tripType &&
                        !year && !duration && !budget && (

                            <div className="newTripCard">

                                <div className="compassIcon">
                                    <Compass size={28} />
                                </div>

                                <h2>
                                    Your next<br />
                                    adventure starts<br />
                                    here.
                                </h2>

                                <p>
                                    Discover new destinations,<br />
                                    plan itineraries, and keep<br />
                                    track of all your travel expenses<br />
                                    all in one place.
                                </p>

                                <button
                                    onClick={() => navigate("/planners")}
                                >
                                    Plan Your Next Trip
                                </button>

                            </div>

                        )}

                </div>

                {filteredTrips.length === 0 && activeTab !== "All" && (
                    <p className="noTrips">No trips found.</p>
                )}

            </main>

            <Footer />

        </div>
    );
}
