
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getTrainerById } from "../../services/trainers";

import {
    Mail,
    Phone,
    MapPin,
    Pencil,
    Users,
    Star,
    CalendarDays,
    Award,
    MoreHorizontal
} from "lucide-react";

import "./TrainerDetailsPage.css";

export default function TrainerDetailsPage() {
    const { id } = useParams();

    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tab, setTab] = useState("Performance");



    const stats = [
        {
            title: "Active Clients",
            value: trainer?.memberCount ?? 0,
            icon: Users
        },
        {
            title: "Average Rating",
            value: trainer?.rating ?? 0,
            extra: "/5.0",
            icon: Star
        },
        {
            title: "Sessions This Week",
            value: trainer?.sessionsThisWeek ?? 0,
            icon: CalendarDays,
            progress: true
        },
        {
            title: "Experience",
            value: trainer?.experienceYears ?? 0,
            extra: "yrs",
            icon: Award
        }
    ];


    const bars = [45, 65, 50, 85, 95, 75, 55];

    useEffect(() => {

        const fetchTrainer = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await getTrainerById(id);

                console.log("Selected Trainer:", response);

                setTrainer(response.data || response);

            } catch (error) {

                console.error(error);
                setError("Unable to fetch trainer details.");

            } finally {
                setLoading(false);
            }
        };

        fetchTrainer();

    }, [id]);

    if (loading) {
        return <p>Loading trainer details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!trainer) {
        return <p>Trainer not found.</p>;
    }

    return (
        <div className="details">


            {/* Trainer Header */}

            <div className="header">

                <div className="profile">

                    <div className="photo">

                        {trainer.profilePhotoUrl ? (
                            <img
                                src={trainer.profilePhotoUrl}
                                alt={trainer.fullName}
                            />
                        ) : (
                            <span>
                                {trainer.fullName
                                    ?.split(" ")
                                    .map((word) => word[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                            </span>
                        )}

                        <span className="dot"></span>

                    </div>

                    <div className="info">

                        <h1>{trainer.fullName}</h1>

                        <h3>{trainer.specialization}</h3>

                        <div className="contact">

                            <span>
                                <Mail size={15} />
                                {trainer.email || "N/A"}
                            </span>

                            <span>
                                <Phone size={15} />
                                {trainer.phoneNumber || "N/A"}
                            </span>

                            <span>
                                <MapPin size={15} />
                                {trainer.branch || "N/A"}
                            </span>

                        </div>

                    </div>

                </div>

                <button className="edit">
                    <Pencil size={13} />
                    Edit Profile
                </button>

            </div>


            {/* Statistics */}
            <div className="stats">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div className="card" key={item.title}>
                            <div className="icon">
                                <Icon size={17} />
                            </div>

                            {item.change && (
                                <span className="change">{item.change}</span>
                            )}

                            <p>{item.title}</p>

                            <h2>
                                {item.value}
                                {item.extra && (
                                    <small>{item.extra}</small>
                                )}
                            </h2>

                            {item.progress && (
                                <div className="track">
                                    <div className="fill"></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className="tabs">
                {["Performance", "Clients", "Schedule", "Bio & Certs"].map(
                    (item) => (
                        <button
                            key={item}
                            className={tab === item ? "active" : ""}
                            onClick={() => setTab(item)}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            {/* Tab Content */}
            {tab === "Performance" && (
                <div className="bottom">

                    <div className="box">
                        <div className="boxhead">
                            <h3>Session Volume (30 Days)</h3>
                            <MoreHorizontal size={18} />
                        </div>

                        <div className="chart">
                            {bars.map((height, index) => (
                                <div
                                    className="bar"
                                    key={index}
                                    style={{ height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="box goal">
                        <h3>Goal Achievement</h3>

                        <div className="circle">
                            <div>
                                <h2>78%</h2>
                                <p>On Track</p>
                            </div>
                        </div>

                        <div className="legend">
                            <span><i></i> On Track (32)</span>
                            <span><i></i> Needs Focus (10)</span>
                        </div>
                    </div>

                </div>
            )}


            {tab === "Clients" && (
                <div className="box message">
                    <h3>Clients</h3>

                    <p>
                        {trainer.memberCount ?? 0} active clients
                        assigned to {trainer.fullName}.
                    </p>
                </div>
            )}


            {tab === "Schedule" && (
                <div className="box message">
                    <h3>Schedule</h3>

                    <p>
                        {trainer.sessionsThisWeek ?? 0} sessions
                        scheduled this week.
                    </p>
                </div>
            )}


            {tab === "Bio & Certs" && (
                <div className="box message">
                    <h3>Bio &amp; Certifications</h3>
                    <p>Strength training, conditioning, and personalized fitness coaching.</p>
                    <p>Certifications: ACE, NASM</p>
                </div>
            )}

        </div>
    );


}
