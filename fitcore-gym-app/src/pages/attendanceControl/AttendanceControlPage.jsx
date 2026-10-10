import { useState } from "react";
import {
    QrCode,
    Search,
    Users,
    CalendarDays,
    ListFilter,
    CheckCircle,
    Dumbbell
} from "lucide-react";

import "./AttendanceControlPage.css";

const records = [
    {
        name: "Priya Sharma",
        id: "#FC1042",
        checkin: "07:15 AM",
        checkout: "--",
        duration: "01h 45m",
        status: "Active",
        initials: "PS"
    },
    {
        name: "Amit Kumar",
        id: "#FC0988",
        checkin: "06:00 AM",
        checkout: "07:30 AM",
        duration: "01h 30m",
        status: "Completed",
        initials: "AK"
    },
    {
        name: "Rahul Patil",
        id: "#FC1001",
        checkin: "08:32 AM",
        checkout: "--",
        duration: "00h 28m",
        status: "Active",
        initials: "RP"
    }
];

export default function AttendanceControlPage() {
    const [search, setSearch] = useState("");
    const [member, setMember] = useState(null);
    const [checkedIn, setCheckedIn] = useState(false);
    const [filter, setFilter] = useState("All");
    const [showAll, setShowAll] = useState(false);

    const filteredRecords = records.filter((record) => {
        const matchesSearch =
            record.name.toLowerCase().includes(search.toLowerCase()) ||
            record.id.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || record.status === filter;

        return matchesSearch && matchesFilter;
    });

    function handleSearch() {
        const found = records.find((record) =>
            record.name.toLowerCase().includes(search.trim().toLowerCase()) ||
            record.id.toLowerCase() === search.trim().toLowerCase()
        );

        setMember(found || null);
        setCheckedIn(false);
    }

    function handleCheckIn() {
        if (member) {
            setCheckedIn(true);
        }
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
                                placeholder="Enter Member ID or Name (e.g. Rahul Patil)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                            />

                            <button onClick={handleSearch}>
                                Search
                            </button>
                        </div>

                        {member ? (
                            <div className="member">
                                <div className="avatar">
                                    {member.initials}
                                    <span></span>
                                </div>

                                <div className="info">
                                    <h3>{member.name}</h3>
                                    <p>
                                        {member.id}
                                        <span>•</span>
                                        <b>Premium</b>
                                    </p>
                                </div>

                                <div className="result">
                                    <button
                                        className="success"
                                        onClick={handleCheckIn}
                                    >
                                        <CheckCircle size={16} />
                                        {checkedIn
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
                                {search
                                    ? "No member found. Try another name or ID."
                                    : "Search for a member to check in."}
                            </div>
                        )}

                    </div>

                    {/* Attendance records */}
                    <div className="records">

                        <div className="recordsHead">
                            <h2>Attendance Records</h2>

                            <div className="tools">
                                <span className="date">
                                    <CalendarDays size={16} />
                                    Oct 10, 2026
                                </span>

                                <label className="filter">
                                    <ListFilter size={16} />
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        <option value="Active">Active</option>
                                        <option value="Completed">Completed</option>
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
                                    {(showAll ? filteredRecords : filteredRecords.slice(0, 3))
                                        .map((record) => (
                                            <tr key={record.id}>
                                                <td>
                                                    <div className="person">
                                                        <div className="smallAvatar">
                                                            {record.initials}
                                                        </div>
                                                        <div>
                                                            <span>{record.name}</span>
                                                            <small>{record.id}</small>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>{record.checkin}</td>
                                                <td>{record.checkout}</td>
                                                <td>{record.duration}</td>

                                                <td>
                                                    <span
                                                        className={
                                                            record.status === "Active"
                                                                ? "active"
                                                                : "completed"
                                                        }
                                                    >
                                                        {record.status === "Active" && "• "}
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            {filteredRecords.length === 0 && (
                                <p className="noRecords">
                                    No attendance records found.
                                </p>
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

                {/* Right summary cards */}
                <div className="right">

                    <div className="total">
                        <div>
                            <span>TOTAL CHECK-INS</span>
                            <div className="number">
                                <h2>142</h2>
                                <small>↑12% vs yday</small>
                            </div>
                        </div>

                        <div className="roundIcon">
                            <Users size={23} />
                        </div>
                    </div>

                    <div className="current">
                        <span>CURRENTLY ACTIVE</span>
                        <h2>48</h2>
                        <span className="floor">Members on floor</span>
                        <Dumbbell className="dumbbell" size={70} />
                    </div>

                </div>

            </div>
        </div>
    );


}
