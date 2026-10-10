import { useState } from "react";
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
    const [tab, setTab] = useState("Performance");

    const stats = [
        {
            title: "Active Clients",
            value: "42",
            icon: Users
        },
        {
            title: "Average Rating",
            value: "4.9",
            extra: "/5.0",
            icon: Star,
            change: "+0.2"
        },
        {
            title: "Sessions This Week",
            value: "28",
            icon: CalendarDays,
            progress: true
        },
        {
            title: "Experience",
            value: "8",
            extra: "yrs",
            icon: Award
        }
    ];

    const bars = [45, 65, 50, 85, 95, 75, 55];

    return (
        <div className="details">

            {/* Trainer Header */}
            <div className="header">
                <div className="profile">
                    <div className="photo">
                        <img
                            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop"
                            alt="Trainer"
                        />
                        <span className="dot"></span>
                    </div>

                    <div className="info">
                        <h1>Vikram Singh</h1>
                        <h3>Strength &amp; Conditioning Coach</h3>

                        <div className="contact">
                            <span><Mail /> vikram.singh@fitcore.io</span>
                            <span><Phone /> +1 (555) 019-2834</span>
                            <span><MapPin /> Downtown Branch</span>
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
                    <p>42 active clients assigned to Vikram Singh.</p>
                </div>
            )}

            {tab === "Schedule" && (
                <div className="box message">
                    <h3>Schedule</h3>
                    <p>28 sessions scheduled this week.</p>
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
