
import { useState } from "react";
import {
    Plus,
    Users,
    UserCheck,
    Star,
    TrendingUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./TrainerPage.css";

const trainers = [
    {
        id: 1,
        name: "Vikram Singh",
        spec: "Strength",
        role: "Coach",
        exp: 8,
        members: 42,
        rating: 4.9,
        status: "Available",
        image: ""
    },
    {
        id: 2,
        name: "Neha Patil",
        spec: "Yoga",
        role: "Instructor",
        exp: 5,
        members: 68,
        rating: 5.0,
        status: "In Session",
        image: ""
    },
    {
        id: 3,
        name: "Marcus Wright",
        spec: "CrossFit",
        role: "Coach",
        exp: 12,
        members: 35,
        rating: 4.7,
        status: "Available",
        image: ""
    }
];

export default function TrainerPage() {

    const navigate = useNavigate();

    const [spec, setSpec] = useState("All Specs");
    const [status, setStatus] = useState("All");
    // const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("Strength");
    const [message, setMessage] = useState("");




    const [trainerList, setTrainerList] = useState(trainers);

    const filtered = trainerList.filter((trainer) => {
        const matchSpec =
            spec === "All Specs" || trainer.spec === spec;

        const matchStatus =
            status === "All" || trainer.status === status;

        return matchSpec && matchStatus;
    });

    function addTrainer(e) {
        e.preventDefault();

        if (!name.trim()) return;

        const newTrainer = {
            id: Date.now(),
            name: name.trim(),
            spec: specialization,
            role: specialization === "Yoga" ? "Instructor" : "Coach",
            exp: 0,
            members: 0,
            rating: 0,
            status: "Available",
            image: ""
        };

        setTrainerList((prev) => [...prev, newTrainer]);
        setName("");
        // setShowForm(false);
        setSpec("All Specs");
        setStatus("All");
    }

    function assignTrainer(trainer) {
        if (trainer.status === "In Session") {
            setMessage(`${trainer.name} is already in a session.`);
            return;
        }

        setMessage(`${trainer.name} selected for assignment.`);
    }

    return (
        <div className="trainers">

            {/* Header */}
            <div className="header">
                <div>
                    <h1>Trainers Directory</h1>
                    <p>Manage your coaching staff and their schedules.</p>
                </div>

                <button className="add" onClick={() => {navigate("/home/addtrainer"); }}>
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

                    <h2>{trainerList.length + 21}</h2>

                    <p className="green">
                        <TrendingUp size={15} />
                        +2 this month
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
                        {trainerList.filter((t) => t.status === "Available").length + 6}
                    </h2>

                    <p>Next shift change in 2h</p>
                </div>

                <div className="stat">
                    <div className="statTop">
                        <span>AVG. RATING</span>
                        <div className="icon">
                            <Star size={22} />
                        </div>
                    </div>

                    <h2>4.8</h2>
                    <p>Based on 1.2k member reviews</p>
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
            <div className="cards" onClick={()=>{navigate("/home/trainerdetails")}}>
                {filtered.map((trainer) => (
                    <div className="card" key={trainer.id}>

                        <div className="cardTop">
                            <div className="photo">
                                {trainer.image ? (
                                    <img src={trainer.image} alt={trainer.name} />
                                ) : (
                                    <span>
                                        {trainer.name.split(" ").map((part) => part[0]).join("")}
                                    </span>
                                )}
                            </div>

                            <div className="details">
                                <h2>{trainer.name}</h2>
                                <p className="green">{trainer.spec}</p>
                                <p>{trainer.role}</p>
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
                                <strong>{trainer.exp}</strong>
                            </div>

                            <div>
                                <span>MEMBERS</span>
                                <strong>{trainer.members}</strong>
                            </div>

                            <div>
                                <span>RATING</span>
                                <strong>
                                    {trainer.rating.toFixed(1)}
                                    <Star size={12} className="star" />
                                </strong>
                            </div>
                        </div>

                        <div className="actions">
                            <button onClick={() => setMessage(`${trainer.name} profile selected.`)}>
                                Profile
                            </button>

                            <button
                                disabled={trainer.status === "In Session"}
                                onClick={() => assignTrainer(trainer)}
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
