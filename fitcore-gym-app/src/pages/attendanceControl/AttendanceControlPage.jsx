
import { useState, useEffect } from "react";

import { getMember } from "../../services/members";

import {
    QrCode,
    Search,
    Users,
    CalendarDays,
    ListFilter,
    CheckCircle,
    Dumbbell
} from "lucide-react";

import { checkInMember, getAttendance} from "../../services/attendance";

import "./AttendanceControlPage.css";

export default function AttendanceControlPage() {

    const [members, setMembers] = useState([]);
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [member, setMember] = useState(null);

    const [workoutType, setWorkoutType] = useState("CARDIO");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);

    const [filter, setFilter] = useState("All");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {

        const fetchMembers = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await getMember();

                const data = response.data || response;

                setMembers(Array.isArray(data) ? data : []);

            } catch (error) {

                console.error(error);
                setError("Unable to fetch members.");

            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
                
    }, []);

    const fetchRecords = async () => {

        try {
            const response = await getAttendance();

            const data = response.data || response;

            setRecords(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Attendance error:", error);
        }
    };


    useEffect(() => {
        fetchRecords();
    }, []);

    const filteredMembers = members.filter((item) => {

        const name = item.fullName || "";
        const code = String(item.memberCode || item.id || "");

        const text = search.trim().toLowerCase();

        return (
            name.toLowerCase().includes(text) ||
            code.toLowerCase().includes(text)
        );
    });


    function handleSearch() {

        if (!search.trim()) return;

        if (filteredMembers.length === 1) {

            setMember(filteredMembers[0]);
            setCheckedIn(false);
            setMessage("");
            setSearch("");

        }
    }


    async function handleCheckIn() {

        if (!member || saving || checkedIn) return;

        try {
            setSaving(true);
            setMessage("");

            const query = member.memberCode || member.fullName;

            const response = await checkInMember(
                query,
                workoutType
            );

            console.log("Check-in successful:", response);

            setCheckedIn(true);
            setMessage("Member checked in successfully!");

            await fetchRecords();

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to check in member."
            );

        } finally {
            setSaving(false);
        }
    }

    const filteredRecords = records.filter((record) => {

        if (filter === "All") return true;
        return (
            record.status?.toUpperCase() === filter.toUpperCase()
        );
    });

    function formatTime(value) {

        if (!value) return "--";
        return new Date(value).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }


    return (

        <div className="attendance">

            <div className="header">
                <h2>Attendance Control</h2>
                <p>Manage member check-ins and attendance records.</p>
            </div>

            <div className="content">

                <div className="left">

                    {/* Check-in section */}

                    <div className="checkin">

                        <h2>
                            <QrCode size={22} />
                            CHECK-IN MEMBER
                        </h2>

                        <div className="search">

                            <Search size={21} />

                            <input
                                type="text"
                                placeholder="Enter Member ID or Name"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setMember(null);
                                    setCheckedIn(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />

                            <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                                <option value="CARDIO">Cardio</option>
                                <option value="CHEST">Chest</option>
                                <option value="BACK">Back</option>
                                <option value="LEGS">Legs</option>
                                <option value="SHOULDERS">Shoulders</option>
                                <option value="ARMS">Arms</option>
                                <option value="FULL_BODY">Full Body</option>
                            </select>

                            <button onClick={handleSearch}>
                                Search
                            </button>

                        </div>

                        {search.trim() && !member && (

                            <div className="membersList">

                                {loading ? (

                                    <p>Loading members...</p>

                                ) : error ? (

                                    <p>{error}</p>

                                ) : filteredMembers.length === 0 ? (

                                    <p>No members found.</p>

                                ) : (

                                    filteredMembers.map((item) => (

                                        <div className="memberItem" key={item.id}>

                                            <div>
                                                <h4>{item.fullName}</h4>

                                                <small>{item.memberCode || item.id}</small>
                                            </div>

                                            <button
                                                onClick={() => {

                                                    setMember(item);
                                                    setCheckedIn(false);
                                                    setMessage("");
                                                    setSearch("");

                                                }}
                                            >Select</button>

                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                        {member ? (

                            <div className="member">

                                <div className="avatar">

                                    {member.fullName
                                        ?.split(" ")
                                        .map((word) => word[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase()}

                                    <span></span>

                                </div>

                                <div className="info">

                                    <h3>{member.fullName}</h3>

                                    <p>
                                        {member.memberCode || member.id}

                                        <span> • </span>

                                        <b>{member.membershipPlanName || "No Plan"}</b>
                                    </p>
                                </div>

                                <div className="result">

                                    <button className="success" onClick={handleCheckIn} disabled={saving || checkedIn}>

                                        <CheckCircle size={16} />

                                        {saving
                                            ? "Checking In..."
                                            : checkedIn
                                                ? "Check-In Successful"
                                                : "Check In Member"}

                                    </button>

                                    <span>
                                        {checkedIn
                                            ? "Checked in just now"
                                            : "Ready to check in"}
                                    </span>

                                </div>

                            </div>

                        ) : (

                            <div className="empty">
                                {search.trim()
                                    ? "Select a member from search results."
                                    : "Search for a member to check in."}
                            </div>

                        )}

                        {message && (
                            <p className="message">{message}</p>
                        )}

                    </div>

                    <div className="records">

                        <div className="recordsHead">

                            <h2>Attendance Records</h2>

                            <div className="tools">

                                <span className="date">
                                    <CalendarDays size={16} />

                                    {new Date().toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>

                                <label className="filter">

                                    <ListFilter size={16} />

                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>

                                </label>

                            </div>

                        </div>


                        <div className="tableScroll">

                            <table>

                                <thead>
                                    <tr>
                                        <th>MEMBER</th>
                                        <th>CHECK-IN</th>
                                        <th>CHECK-OUT</th>
                                        <th>DURATION</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {(showAll
                                        ? filteredRecords
                                        : filteredRecords.slice(0, 3)
                                    ).map((record) => (

                                        <tr key={record.id}>

                                            <td>
                                                <div className="person">

                                                    <div className="smallAvatar">

                                                        {record.memberName
                                                            ?.split(" ")
                                                            .map((word) => word[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}

                                                    </div>

                                                    <div>
                                                        <span>{record.memberName}</span>
                                                        <small>{record.memberCode}</small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>{formatTime(record.checkInTime)}</td>
                                            <td>{formatTime(record.checkOutTime)}</td>
                                            <td>{record.duration || "--"}</td>
                                            <td>
                                                <span
                                                    className={
                                                        record.status === "ACTIVE"
                                                            ? "active"
                                                            : "completed"
                                                    }
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                            {filteredRecords.length === 0 && (
                                <p className="noRecords">No attendance records found.</p>
                            )}

                        </div>

                        <button
                            className="history"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Show Less" : "View Full History"}
                        </button>

                    </div>

                </div>

                <div className="right">

                    <div className="total">

                        <div>
                            <span>TOTAL CHECK-INS</span>

                            <div className="number">
                                <h2>{records.length}</h2>
                                <small>Today's records</small>
                            </div>
                        </div>

                        <div className="roundIcon">
                            <Users size={23} />
                        </div>

                    </div>

                    <div className="current">

                        <span>CURRENTLY ACTIVE</span>

                        <h2>
                            {records.filter(
                                (item) => item.status === "ACTIVE"
                            ).length}
                        </h2>

                        <span className="floor">
                            Members on floor
                        </span>

                        <Dumbbell
                            className="dumbbell"
                            size={70}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}
