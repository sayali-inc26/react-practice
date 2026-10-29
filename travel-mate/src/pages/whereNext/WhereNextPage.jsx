
import { useNavigate } from "react-router-dom";

import {
    Plus,
    Users,
    Plane,
    ArrowRight
} from "lucide-react";

import "./WhereNextPage.css";

export default function WhereNextPage() {

    const navigate = useNavigate();

    const stats = [
        { title: "Upcoming Trips", value: "3" },
        { title: "Countries Visited", value: "6" },
        { title: "Total Trips", value: "12" },
        { title: "Travel Days", value: "48" }
    ];

    const trips = [
        {
            id: 1,
            name: "Goa",
            date: "Dec 20-24",
            days: 5,
            travelers: 4,
            spent: 18500,
            budget: 30000,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900"
        },
        {
            id: 3,
            name: "Manali",
            date: "Jan 10-15",
            days: 6,
            travelers: 3,
            spent: 22000,
            budget: 40000,
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900"
        }
    ];

    return (
        <div className="whereNext">

            {/* Heading */}

            <div className="whereHead">

                <div>
                    <h1>
                        Where are you going next? <Plane size={48} />
                    </h1>

                    <p>Plan every moment of your next adventure.</p>
                </div>

                <button
                    className="planBtn"
                    onClick={() => navigate(`/home/whereNext/tripConfiguration/${trips.id}`)}
                >
                    <Plus size={20} />
                    Plan New Trip
                </button>

            </div>

            <div className="whereStats">

                {stats.map((stat) => (

                    <div className="whereStat" key={stat.title}>

                        <h4>{stat.title}</h4>

                        <h2>{stat.value}</h2>

                    </div>

                ))}

            </div>

            {/* Upcoming Trips */}

            <div className="whereTrips">

                <h2>Upcoming Trips</h2>

                <div className="whereTripGrid">

                    {trips.map((trip) => (

                        <div className="whereTripCard" key={trip.id}>

                            {/* Image */}

                            <div className="whereTripImage">

                                <img src={trip.image} alt={trip.name} />

                                <span className="whereDate">
                                    {trip.date}
                                </span>

                            </div>

                            {/* Trip Information */}

                            <div className="whereTripInfo">

                                <div className="whereTripTitle">

                                    <h3>{trip.name}</h3>

                                    <span className="whereTravelers">
                                        <Users size={14} />
                                        {trip.travelers} Travelers
                                    </span>

                                </div>

                                <p>{trip.days} days</p>

                                {/* Budget */}

                                <div className="whereBudget">

                                    <div className="whereBudgetText">
                                        <span>Budget Progress</span>

                                        <span>
                                            ₹{trip.spent.toLocaleString()} /
                                            ₹{trip.budget.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="whereProgress">

                                        <div
                                            style={{
                                                width: `${trip.spent / trip.budget * 100}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                                {/* View Trip */}

                                <button
                                    className="viewTripBtn"
                                    onClick={() =>
                                        navigate(`/myTrips/tripDetails/${trip.id}`)
                                    }
                                >
                                    View Trip
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}
