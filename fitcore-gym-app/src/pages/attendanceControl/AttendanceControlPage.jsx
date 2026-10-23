
import { useState, useEffect } from "react";

import { getMember } from "../../services/members";

import {
    checkInMember,
    checkOutAttendance,
    getAttendance
} from "../../services/attendance";

import {
    Search,
    Users,
    CalendarDays,
    Dumbbell
} from "lucide-react";

import "./AttendanceControlPage.css";

export default function AttendanceControlPage() {

    const [members, setMembers] = useState([]);
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    const [search, setSearch] = useState("");
    const [workoutType, setWorkoutType] = useState("CARDIO");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [showAll, setShowAll] = useState(false);


    // Fetch members and attendance

    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

            const [memberResponse, attendanceResponse] =
                await Promise.all([
                    getMember(),
                    getAttendance()
                ]);

            const memberData =
                memberResponse.data || memberResponse;

            const attendanceData =
                attendanceResponse.data || attendanceResponse;

            // Support normal and paginated responses

            const memberList = Array.isArray(memberData)
                ? memberData
                : memberData.content || [];

            const attendanceList = Array.isArray(attendanceData)
                ? attendanceData
                : attendanceData.content || [];

            setMembers(memberList);
            setRecords(attendanceList);

        } catch (error) {

            console.error("Attendance Fetch Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to fetch attendance information."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchData();

    }, []);


    // Find active attendance for selected member

    const getActiveAttendance = (member) => {

        return records.find((record) =>

            String(record.memberId) === String(member.id) &&
            record.status?.toUpperCase() === "ACTIVE"

        );

    };


    // Get latest attendance for member

    const getLatestAttendance = (member) => {

        const memberRecords = records.filter((record) =>

            String(record.memberId) === String(member.id)

        );

        return memberRecords.sort((a, b) =>

            new Date(b.checkInTime) - new Date(a.checkInTime)

        )[0];

    };


    // Check In

    const handleCheckIn = async (member) => {

        if (savingId !== null) return;

        if (getActiveAttendance(member)) {
            setMessage("This member is already checked in.");
            return;
        }

        try {

            setSavingId(member.id);
            setMessage("");

            const query =
                member.memberCode || member.fullName;

            await checkInMember(query, workoutType);

            setMessage(
                `${member.fullName} checked in successfully!`
            );

            await fetchRecords();

        } catch (error) {

            console.error("Check-in Error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to check in member."
            );

        } finally {

            setSavingId(null);

        }

    };


    // Check Out

    const handleCheckOut = async (member) => {

        if (savingId !== null) return;

        const activeAttendance = getActiveAttendance(member);

        if (!activeAttendance) {
            setMessage("No active check-in found.");
            return;
        }

        try {

            setSavingId(member.id);
            setMessage("");

            await checkOutAttendance(activeAttendance.id);

            setMessage(
                `${member.fullName} checked out successfully!`
            );

            await fetchRecords();

        } catch (error) {

            console.error("Check-out Error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to check out member."
            );

        } finally {

            setSavingId(null);

        }

    };


    // Refresh attendance records

    const fetchRecords = async () => {

        const response = await getAttendance();

        const data = response.data || response;

        setRecords(
            Array.isArray(data)
                ? data
                : data.content || []
        );

    };


    // Search members

    const filteredMembers = members.filter((member) => {

        const text = search.trim().toLowerCase();

        const name = member.fullName || "";

        const code = String(
            member.memberCode || member.id || ""
        );

        return (
            name.toLowerCase().includes(text) ||
            code.toLowerCase().includes(text)
        );

    });


    // Format time

    const formatTime = (value) => {

        if (!value) return "--";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "--";

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

    };


    // Today's attendance

    const today = new Date().toLocaleDateString("en-CA");

    const todayRecords = records.filter((record) => {

        if (!record.checkInTime) return false;

        const date = new Date(record.checkInTime)
            .toLocaleDateString("en-CA");

        return date === today;

    });


    const activeCount = records.filter(
        (record) => record.status === "ACTIVE"
    ).length;


    return (

        <div className="attendance">

            {/* Header */}

            <div className="header">

                <h2>Attendance Control</h2>

                <p>
                    Manage member check-ins and check-outs.
                </p>

            </div>


            {/* Stats */}

            <div className="attendanceStats">

                <div className="total">

                    <div>

                        <span>TOTAL MEMBERS</span>

                        <h2>{members.length}</h2>

                    </div>

                    <Users size={25} />

                </div>


                <div className="total">

                    <div>

                        <span>TODAY'S CHECK-INS</span>

                        <h2>{todayRecords.length}</h2>

                    </div>

                    <CalendarDays size={25} />

                </div>


                <div className="total">

                    <div>

                        <span>CURRENTLY ACTIVE</span>

                        <h2>{activeCount}</h2>

                    </div>

                    <Dumbbell size={25} />

                </div>

            </div>


            {/* Members Table */}

            <div className="records">

                <div className="recordsHead">

                    <h2>Members Attendance</h2>

                    <div className="tools">

                        <div className="attendanceSearch">

                            <Search size={18} />

                            <input
                                type="text"
                                placeholder="Search Member..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            value={workoutType}
                            onChange={(e) =>
                                setWorkoutType(e.target.value)
                            }
                        >

                            <option value="CARDIO">Cardio</option>
                            <option value="CHEST">Chest</option>
                            <option value="BACK">Back</option>
                            <option value="LEGS">Legs</option>
                            <option value="SHOULDERS">Shoulders</option>
                            <option value="ARMS">Arms</option>
                            <option value="FULL_BODY">Full Body</option>

                        </select>

                    </div>

                </div>


                {message && (
                    <p className="message">{message}</p>
                )}

                {error && (
                    <p className="message">{error}</p>
                )}


                <div className="tableScroll">

                    <table>

                        <thead>

                            <tr>
                                <th>MEMBER</th>
                                <th>MEMBER ID</th>
                                <th>PLAN</th>
                                <th>CHECK-IN</th>
                                <th>CHECK-OUT</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="7">
                                        Loading members...
                                    </td>
                                </tr>

                            ) : filteredMembers.length === 0 ? (

                                <tr>
                                    <td colSpan="7">
                                        No members found.
                                    </td>
                                </tr>

                            ) : (

                                (showAll
                                    ? filteredMembers
                                    : filteredMembers.slice(0, 5)
                                ).map((member) => {

                                    const activeAttendance =
                                        getActiveAttendance(member);

                                    const latestAttendance =
                                        getLatestAttendance(member);

                                    const isActive = !!activeAttendance;

                                    return (

                                        <tr key={member.id}>

                                            {/* Member */}

                                            <td>

                                                <div className="person">

                                                    <div className="smallAvatar">

                                                        {member.fullName
                                                            ?.split(" ")
                                                            .map(word => word[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}

                                                    </div>

                                                    <span>
                                                        {member.fullName}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* Member ID */}

                                            <td>
                                                {member.memberCode || member.id}
                                            </td>


                                            {/* Plan */}

                                            <td>
                                                {member.membershipPlanName || "N/A"}
                                            </td>


                                            {/* Check In Time */}

                                            <td>
                                                {formatTime(
                                                    latestAttendance?.checkInTime
                                                )}
                                            </td>


                                            {/* Check Out Time */}

                                            <td>
                                                {formatTime(
                                                    latestAttendance?.checkOutTime
                                                )}
                                            </td>


                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={
                                                        isActive
                                                            ? "active"
                                                            : "completed"
                                                    }
                                                >

                                                    {isActive
                                                        ? "ACTIVE"
                                                        : latestAttendance
                                                            ? "COMPLETED"
                                                            : "NOT CHECKED IN"}

                                                </span>

                                            </td>


                                            {/* Action */}

                                            <td>

                                                {isActive ? (

                                                    <button
                                                        className="checkoutButton"
                                                        disabled={savingId !== null}
                                                        onClick={() =>
                                                            handleCheckOut(member)
                                                        }
                                                    >

                                                        {savingId === member.id
                                                            ? "Checking Out..."
                                                            : "Check Out"}

                                                    </button>

                                                ) : (

                                                    <button
                                                        className="checkinButton"
                                                        disabled={savingId !== null}
                                                        onClick={() =>
                                                            handleCheckIn(member)
                                                        }
                                                    >

                                                        {savingId === member.id
                                                            ? "Checking In..."
                                                            : "Check In"}

                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </tbody>

                    </table>

                </div>


                <button
                    className="history"
                    onClick={() => setShowAll(!showAll)}
                >

                    {showAll ? "Show Less" : "View All Members"}

                </button>

            </div>

        </div>

    );
}
