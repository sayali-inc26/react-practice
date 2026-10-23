
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Users } from "lucide-react";

import { getMember } from "../../services/members";

import {
    getTrainerById,
    assignMemberToTrainer
} from "../../services/trainers";

import "./AssignTrainerPage.css";

export default function AssignTrainerPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [trainer, setTrainer] = useState(null);
    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const getData = (response) => {
        return response.data || response;
    };

    const fetchData = async () => {

        try {
            setLoading(true);
            setError("");

            const [trainerResponse, memberResponse] =
                await Promise.all([
                    getTrainerById(id),
                    getMember()
                ]);

            const trainerData = getData(trainerResponse);
            const memberData = getData(memberResponse);

            setTrainer(trainerData);

            setMembers(
                Array.isArray(memberData)
                    ? memberData
                    : memberData.content || []
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to fetch trainer or members."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    // Filter members

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


    // Assign selected member

    const handleAssign = async (member) => {

        if (saving) return;

        try {

            setSaving(true);
            setSelectedId(member.id);
            setError("");
            setMessage("");

            // Fetch latest count before assigning

            const response = await getTrainerById(id);

            const latestTrainer = getData(response);

            setTrainer(latestTrainer);

            const count = Number(latestTrainer.memberCount);

            if (!Number.isFinite(count)) {
                setError("Trainer member count is unavailable.");
                return;
            }

            if (count >= 3) {

                setError(
                    "This trainer already has 3 members. Assignment limit reached."
                );

                return;
            }

            // Call assignment API

            const result = await assignMemberToTrainer(
                id,
                member.id
            );

            console.log("Assignment Response:", result);

            setMessage(
                `${member.fullName} assigned successfully!`
            );

            // Refresh trainer count from backend

            const updatedResponse = await getTrainerById(id);

            setTrainer(getData(updatedResponse));

        } catch (error) {

            console.error("Assignment Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to assign this member."
            );

        } finally {

            setSaving(false);
            setSelectedId(null);

        }

    };


    if (loading) {
        return <p className="assignLoading">Loading members...</p>;
    }

    if (!trainer) {
        return (
            <p className="assignLoading">
                {error || "Trainer not found."}
            </p>
        );
    }

    const count = Number(trainer.memberCount);
    const countValid = Number.isFinite(count);
    const limitReached = !countValid || count >= 3;

    return (

        <div className="assignPage">

            {/* Header */}

            <div className="assignHeader">

                <div>

                    <button
                        className="backButton"
                        onClick={() => navigate("/home/trainers")}
                    >
                        <ArrowLeft size={17} />
                        Back
                    </button>

                    <h1>Assign Members</h1>

                    <p>
                        Assign registered members to a trainer.
                    </p>

                </div>

            </div>


            {/* Trainer Information */}

            <div className="assignTrainer">

                <div className="assignPhoto">

                    {trainer.profilePhotoUrl ? (

                        <img
                            src={trainer.profilePhotoUrl}
                            alt={trainer.fullName}
                        />

                    ) : (

                        <Users size={25} />

                    )}

                </div>

                <div className="assignInfo">

                    <h2>{trainer.fullName}</h2>

                    <p>
                        {trainer.specialization} • {trainer.title}
                    </p>

                </div>

                <div className="assignCount">

                    <span>ASSIGNED MEMBERS</span>

                    <h2>
                        {countValid ? count : "--"} / 3
                    </h2>

                    <p>
                        {limitReached
                            ? "Assignment unavailable"
                            : `${3 - count} slots remaining`}
                    </p>

                </div>

            </div>


            {/* Messages */}

            {error && (
                <p className="assignError">{error}</p>
            )}

            {message && (
                <p className="assignSuccess">{message}</p>
            )}


            {/* Members List */}

            <div className="assignCard">

                <div className="assignTop">

                    <div>
                        <h2>All Members</h2>
                        <p>Select a member to assign.</p>
                    </div>

                    <div className="assignSearch">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>


                <div className="assignScroll">

                    <table className="assignTable">

                        <thead>
                            <tr>
                                <th>MEMBER</th>
                                <th>MEMBER ID</th>
                                <th>MEMBERSHIP PLAN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredMembers.length === 0 ? (

                                <tr>
                                    <td colSpan="4">
                                        No members found.
                                    </td>
                                </tr>

                            ) : (

                                filteredMembers.map((member) => (

                                    <tr key={member.id}>

                                        <td>

                                            <div className="assignMember">

                                                <div className="assignAvatar">

                                                    {(member.fullName || "")
                                                        .trim()
                                                        .split(/\s+/)
                                                        .filter(Boolean)
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

                                        <td>
                                            {member.memberCode || member.id}
                                        </td>

                                        <td>
                                            {member.membershipPlanName || "N/A"}
                                        </td>

                                        <td>

                                            <button
                                                className="assignButton"
                                                disabled={
                                                    limitReached || saving
                                                }
                                                onClick={() =>
                                                    handleAssign(member)
                                                }
                                            >

                                                {saving &&
                                                selectedId === member.id
                                                    ? "Assigning..."
                                                    : limitReached
                                                        ? "Limit Reached"
                                                        : "Assign"}

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}
