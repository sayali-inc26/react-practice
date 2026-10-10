import { useState } from "react";
import {Pencil, RefreshCw, Plus, CalendarDays, Ruler, Weight, Gauge, Dumbbell, BadgeCheck, UserRound } from "lucide-react";

import "./MemberDetailsPage.css";

export default function MemberDetailsPage() {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = [ "Overview", "Workout", "Attendance", "Progress", "Payments" ];

    const member = {
        name: "C2w",
        id: "#FC1001",
        plan: "Premium",
        status: "Active Member",
        age: 24,
        height: 175,
        weight: 72,
        bmi: 23.5,
        goal: "Muscle Gain",
        planStart: "Aug 2026",
        planEnd: "Jan 2027",
        daysRemaining: 183
    };

    return (
        <div className="memberDetails">

            {/* Profile Header */}
            <div className="detailsHeader">

                <div className="detailsProfile">
                    <div className="detailsAvatar">
                        <UserRound size={38} />
                    </div>

                    <div className="detailsInfo">
                        <div className="detailsName">
                            <h1>{member.name}</h1>

                            <span className="detailsPlan">
                                <span>☆</span> {member.plan}
                            </span>
                        </div>

                        <div className="detailsMeta">
                            <span>ID {member.id}</span>
                            <span className="detailsDot">•</span>
                            <span className="detailsStatus">
                                {member.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="detailsActions">
                    <button
                        className="editButton"
                        onClick={() => console.log("Edit member")}
                    >
                        <Pencil size={14} />
                        Edit Profile
                    </button>

                    <button
                        className="renewButton"
                        onClick={() => console.log("Renew membership")}
                    >
                        <RefreshCw size={14} />
                        Renew
                    </button>

                    <button
                        className="progressButton"
                        onClick={() => console.log("Add progress")}
                    >
                        <Plus size={15} />
                        Add Progress
                    </button>
                </div>

            </div>

            {/* Navigation Tabs */}
            <div className="detailsTabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`detailsTab ${activeTab === tab ? "activeTab" : ""
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Content */}
            {activeTab === "Overview" ? (
                <div className="detailsContent">

                    <div className="detailsMain">

                        {/* Fitness Stats */}
                        <div className="detailsStats">

                            <div className="detailsStatCard">
                                <span className="statLabel">AGE</span>
                                <h2>{member.age}</h2>
                                <span className="statUnit">Years</span>
                                <CalendarDays className="statIcon" size={42} />
                            </div>

                            <div className="detailsStatCard">
                                <span className="statLabel">HEIGHT</span>
                                <h2>{member.height}</h2>
                                <span className="statUnit">cm</span>
                                <Ruler className="statIcon" size={42} />
                            </div>

                            <div className="detailsStatCard">
                                <span className="statLabel">WEIGHT</span>
                                <h2>{member.weight}</h2>
                                <span className="statUnit">kg</span>
                                <Weight className="statIcon" size={42} />
                            </div>

                            <div className="detailsStatCard">
                                <span className="statLabel">BMI</span>
                                <h2>{member.bmi}</h2>
                                <span className="bmiStatus">Normal</span>
                                <Gauge className="statIcon" size={42} />
                            </div>

                        </div>

                        {/* Primary Goal */}
                        <div className="detailsGoal">
                            <div>
                                <span className="statLabel">PRIMARY GOAL</span>
                                <h2>{member.goal}</h2>
                            </div>

                            <div className="goalIcon">
                                <Dumbbell size={23} />
                            </div>
                        </div>

                    </div>

                    {/* Membership Card */}
                    <div className="detailsMembership">

                        <div className="membershipTop">
                            <span className="membershipBadge">
                                PREMIUM PLAN
                            </span>

                            <BadgeCheck size={25} />
                        </div>

                        <div className="membershipDates">
                            <span>Valid Dates</span>
                            <p>
                                {member.planStart} - {member.planEnd}
                            </p>
                        </div>

                        <div className="membershipRemaining">
                            <h2>{member.daysRemaining}</h2>
                            <span>Days Remaining</span>

                            <div className="membershipProgress">
                                <div className="membershipProgressFill"></div>
                            </div>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="detailsTabContent">
                    <h2>{activeTab}</h2>
                    <p>
                        {activeTab} information for {member.name} will appear here.
                    </p>
                </div>
            )}

        </div>
    );


}
