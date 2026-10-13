
import { useState } from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
    Pencil,
    RefreshCw,
    Plus,
    CalendarDays,
    Ruler,
    Weight,
    Gauge,
    Dumbbell,
    BadgeCheck,
    UserRound
} from "lucide-react";

import "./MemberDetailsPage.css";

export default function MemberDetailsPage() {

    const [activeTab, setActiveTab] = useState("Overview");

    const navigate = useNavigate();

    // Get member ID from URL
    const { id } = useParams();

    // Get selected member from Redux
    const member = useSelector((state) =>
        state.member.members.find(
            (item) => item.id === id
        )
    );

    const tabs = [
        "Overview",
        "Workout",
        "Attendance",
        "Progress",
        "Payments"
    ];

    // Calculate age using DOB
    const calculateAge = (dob) => {

        if (!dob) return "--";

        const today = new Date();
        const birthDate = new Date(dob + "T00:00:00");

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    // Calculate remaining membership days
    const calculateDays = (endDate) => {

        if (!endDate) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const end = new Date(endDate + "T00:00:00");

        const difference = end - today;

        return Math.max(
            0,
            Math.ceil(difference / (1000 * 60 * 60 * 24))
        );
    };

    // If member does not exist
    if (!member) {

        return (
            <div className="memberDetails">

                <h2>Member not found</h2>

                <p>Please select a member from the members list.</p>

                <button onClick={() => navigate("/home/members")}>
                    Back to Members
                </button>

            </div>
        );
    }

    const age = calculateAge(member.dob);

    const daysRemaining = calculateDays(member.endDate);

    const formatDate = (date) => {

        if (!date) return "--";

        return new Date(date + "T00:00:00").toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric"
            }
        );

    };

    return (

        <div className="memberDetails">

            {/* PROFILE HEADER */}

            <div className="detailsHeader">

                <div className="detailsProfile">

                    <div className="detailsAvatar">

                        {member.photo ? (

                            <img
                                src={member.photo}
                                alt={member.fullName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "50%"
                                }}
                            />

                        ) : (

                            <UserRound size={38} />

                        )}

                    </div>

                    <div className="detailsInfo">

                        <div className="detailsName">

                            <h1>{member.fullName}</h1>

                            <span className="detailsPlan">
                                ☆ {member.plan}
                            </span>

                        </div>

                        <div className="detailsMeta">

                            <span>
                                ID #FC{member.id.slice(-5)}
                            </span>

                            <span className="detailsDot">•</span>

                            <span className="detailsStatus">
                                {member.status} Member
                            </span>

                        </div>

                    </div>

                </div>

                <div className="detailsActions">

                    <button
                        className="editButton"
                        onClick={() => console.log("Edit:", member)}
                    >
                        <Pencil size={14} />
                        Edit Profile
                    </button>

                    <button
                        className="renewButton"
                        onClick={() => console.log("Renew:", member)}
                    >
                        <RefreshCw size={14} />
                        Renew
                    </button>

                    <button
                        className="progressButton"
                        onClick={() => console.log("Progress:", member)}
                    >
                        <Plus size={15} />
                        Add Progress
                    </button>

                </div>

            </div>

            {/* NAVIGATION TABS */}

            <div className="detailsTabs">

                {tabs.map((tab) => (

                    <button
                        key={tab}
                        className={`detailsTab ${activeTab === tab ? "activeTab" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>

                ))}

            </div>

            {/* OVERVIEW */}

            {activeTab === "Overview" ? (

                <div className="detailsContent">

                    <div className="detailsMain">

                        {/* FITNESS STATS */}

                        <div className="detailsStats">

                            <div className="detailsStatCard">

                                <span className="statLabel">AGE</span>

                                <h2>{age}</h2>

                                <span className="statUnit">Years</span>

                                <CalendarDays
                                    className="statIcon"
                                    size={42}
                                />

                            </div>

                            <div className="detailsStatCard">

                                <span className="statLabel">HEIGHT</span>

                                <h2>{member.height}</h2>

                                <span className="statUnit">cm</span>

                                <Ruler
                                    className="statIcon"
                                    size={42}
                                />

                            </div>

                            <div className="detailsStatCard">

                                <span className="statLabel">WEIGHT</span>

                                <h2>{member.weight}</h2>

                                <span className="statUnit">kg</span>

                                <Weight
                                    className="statIcon"
                                    size={42}
                                />

                            </div>

                            <div className="detailsStatCard">

                                <span className="statLabel">BMI</span>

                                <h2>{member.bmi}</h2>

                                <span className="bmiStatus">

                                    {Number(member.bmi) < 18.5
                                        ? "Underweight"
                                        : Number(member.bmi) < 25
                                            ? "Normal"
                                            : Number(member.bmi) < 30
                                                ? "Overweight"
                                                : "Obese"}

                                </span>

                                <Gauge
                                    className="statIcon"
                                    size={42}
                                />

                            </div>

                        </div>

                        {/* PRIMARY GOAL */}

                        <div className="detailsGoal">

                            <div>

                                <span className="statLabel">
                                    PRIMARY GOAL
                                </span>

                                <h2>{member.goal}</h2>

                            </div>

                            <div className="goalIcon">
                                <Dumbbell size={23} />
                            </div>

                        </div>

                    </div>

                    {/* MEMBERSHIP CARD */}

                    <div className="detailsMembership">

                        <div className="membershipTop">

                            <span className="membershipBadge">
                                {member.plan.toUpperCase()} PLAN
                            </span>

                            <BadgeCheck size={25} />

                        </div>

                        <div className="membershipDates">

                            <span>Valid Dates</span>

                            <p>
                                {formatDate(member.startDate)}
                                {" - "}
                                {formatDate(member.endDate)}
                            </p>

                        </div>

                        <div className="membershipRemaining">

                            <h2>{daysRemaining}</h2>

                            <span>Days Remaining</span>

                            <div className="membershipProgress">

                                <div
                                    className="membershipProgressFill"
                                    style={{
                                        width: daysRemaining > 0 ? "65%" : "0%"
                                    }}
                                ></div>

                            </div>

                        </div>

                    </div>

                </div>

            ) : (

                <div className="detailsTabContent">

                    <h2>{activeTab}</h2>

                    <p>
                        {activeTab} information for {member.fullName}
                        will appear here.
                    </p>

                </div>

            )}

        </div>

    );
}
