
import {
    Plus,
    Users,
    UserCheck,
    Star,
    TrendingUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTrainer } from "../../services/trainers";
import { setTrainers } from "../../redux/slices/trainerSlice";


import "./TrainerPage.css";


// const trainers = [
//     {
//         id: 1,
//         name: "Vikram Singh",
//         spec: "Strength",
//         role: "Coach",
//         exp: 8,
//         members: 42,
//         rating: 4.9,
//         status: "Available",
//         image: ""
//     },
//     {
//         id: 2,
//         name: "Neha Patil",
//         spec: "Yoga",
//         role: "Instructor",
//         exp: 5,
//         members: 68,
//         rating: 5.0,
//         status: "In Session",
//         image: ""
//     },
//     {
//         id: 3,
//         name: "Marcus Wright",
//         spec: "CrossFit",
//         role: "Coach",
//         exp: 12,
//         members: 35,
//         rating: 4.7,
//         status: "Available",
//         image: ""
//     }
// ];


export default function TrainerPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const trainers = useSelector(
        (state) => state.trainer.trainers
    );

    const [spec, setSpec] = useState("All Specs");
    const [status, setStatus] = useState("All");
    const [message, setMessage] = useState("");

    const filtered = trainers.filter((trainer) => {
        const matchSpec =
            spec === "All Specs" || trainer.specialization === spec;

        const matchStatus =
            status === "All" || trainer.status === status;

        return matchSpec && matchStatus;
    });



    function assignTrainer(trainer) {
        if (trainer.status === "In Session") {
            setMessage(`${trainer.fullName} is already in a session.`);
            return;
        }

        setMessage(`${trainer.fullName} selected for assignment.`);
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchTrainers = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await getTrainer();

                console.log("Fetched Trainers:", response);

                // Store trainers in Redux
                dispatch(setTrainers(
                    Array.isArray(response)
                        ? response
                        : response.data || []
                ));

            } catch (error) {

                console.error("Failed to fetch trainers:", error);
                setError("Unable to load trainers.");

            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();

    }, [dispatch]);
    return (
        <div className="trainers">

            {/* Header */}
            <div className="header">
                <div>
                    <h1>Trainers Directory</h1>
                    <p>Manage your coaching staff and their schedules.</p>
                </div>

                <button className="add" onClick={() => { navigate("/home/addtrainer"); }}>
                    <Plus size={18} />
                    Add Trainer
                </button>
            </div>


            <div className="stats">

                <div className="stat">
                    <div className="statTop">
                        <span>TOTAL TRAINERS</span>
                        <div className="icon">
                            <Users size={22} />
                        </div>
                    </div>

                    <h2>{trainers.length}</h2>

                    <p className="green">
                        <TrendingUp size={15} />
                        Total registered trainers
                    </p>
                </div>

                <div className="stat">
                    <div className="statTop">
                        <span>AVAILABLE NOW</span>
                        <div className="icon">
                            <UserCheck size={22} />
                        </div>
                    </div>

                    <h2>
                        {trainers.filter((trainer) => trainer.status === "Available").length}
                    </h2>

                    <p>Currently available trainers</p>
                </div>

                <div className="stat">
                    <div className="statTop">
                        <span>AVG. RATING</span>
                        <div className="icon">
                            <Star size={22} />
                        </div>
                    </div>

                    <h2>
                        {
                            trainers.length > 0
                                ? (
                                    trainers.reduce(
                                        (total, trainer) =>
                                            total + (trainer.rating || 0),
                                        0
                                    ) / trainers.length
                                ).toFixed(1)
                                : "0.0"
                        }
                    </h2>
                    <p>Average trainer rating</p>
                </div>

            </div>

            <div className="filters">
                <div className="specificationTabs">
                    {["All Specs", "Strength", "Cardio", "Yoga", "CrossFit"].map((item) => (
                        <button
                            key={item}
                            className={spec === item ? "selected" : ""}
                            onClick={() => setSpec(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="All">Status: All</option>
                    <option value="Available">Available</option>
                    <option value="In Session">In Session</option>
                </select>
            </div>

            {message && (
                <div className="message">
                    {message}
                    <button onClick={() => setMessage("")}>×</button>
                </div>
            )}

            {/* Trainer cards */}
            <div className="cards" >
                {filtered.map((trainer) => (
                    <div className="card" key={trainer.id}>

                        <div className="cardTop">

                            <div className="photo">

                                {trainer.profilePhotoUrl ? (

                                    <img
                                        src={trainer.profilePhotoUrl}
                                        alt={trainer.fullName}
                                    />

                                ) : (

                                    <span>
                                        {(trainer.fullName || "")
                                            .trim()
                                            .split(/\s+/)
                                            .filter(Boolean)
                                            .map((part) => part[0])
                                            .slice(0, 2)
                                            .join("")
                                            .toUpperCase()}
                                    </span>

                                )}

                            </div>


                            <div className="details">
                                <h2>{trainer.fullName}</h2>
                                <p className="green">{trainer.specialization}</p>
                                <p>{trainer.specialization}</p>
                            </div>

                            <span className={
                                trainer.status === "Available" ? "available" : "session"
                            }>
                                {trainer.status}
                            </span>
                        </div>

                        <div className="numbers">
                            <div>
                                <span>EXP (YRS)</span>
                                <strong>{trainer.experienceYears}</strong>
                            </div>

                            <div>
                                <span>MEMBERS</span>
                                <strong>{trainer.memberCount}</strong>
                            </div>

                            <div>
                                <span>RATING</span>
                                <strong>
                                    {trainer.rating}
                                    <Star size={12} className="star" />
                                </strong>
                            </div>
                        </div>


                        <div className="actions">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    console.log("Profile clicked:", trainer.id);

                                    navigate(`/home/trainerdetails/${trainer.id}`);
                                }}
                            >
                                Profile
                            </button>

                            <button
                                disabled={trainer.status === "IN_SESSION"}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    assignTrainer(trainer);
                                }}
                            >
                                Assign
                            </button>

                        </div>


                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="empty">No trainers found for this filter.</p>
            )}

        </div>
    );
}
