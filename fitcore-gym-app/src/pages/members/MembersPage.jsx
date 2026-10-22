
import "./MembersPage.css";
import { useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMember } from "../../services/members";
import { setMembers } from "../../redux/slices/memberSlice";

// import { useSelector } from "react-redux";

import MemberRow from "./components/MemberRow";

export default function MembersPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const members = useSelector(
        (state) => state.member.members
    );

    useEffect(() => {

        const fetchMembers = async () => {

            try {
                const data = await getMember();

                console.log("Fetched Members:", data);

                dispatch(setMembers(data));

            } catch (error) {

                console.log("Failed to fetch members:", error);

            } finally {
                setLoading(false);
            }
        };

        fetchMembers();

    }, [dispatch]);

    return (
        <>
            <div className="membersContent">

                <div className="membersHeader">
                    <div>
                        <h1>Members</h1>
                        <h5>Manage all gym members.</h5>
                    </div>

                    <button onClick={() => { navigate("/home/addmember"); }}>+ Add Member</button>
                </div>

                <div className="membersFilter">
                    <div className="filterLeft">
                        <select defaultValue="All Plans">
                            <option>All Plans</option>
                            <option>Premium</option>
                            <option>Standard</option>
                            <option>Basic</option>
                        </select>

                        <select defaultValue="Any Status">
                            <option>Any Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Expired</option>
                        </select>

                        <select defaultValue="Any Goal">
                            <option>Any Goal</option>
                            <option>Weight Loss</option>
                            <option>Muscle Gain</option>
                            <option>Fitness</option>
                        </select>
                    </div>
                    <div className="sort">
                        <span>Sort by:</span>
                        <select defaultValue="Newest First">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Name A-Z</option>
                            <option>Name Z-A</option>
                        </select>

                        <span className="sortIcon">☰</span>
                    </div>
                </div>


                {/* Members Table */}

                <div className="membersTableBox">
                    <div className="tableScroll">
                        <table className="membersTable">
                            <thead>
                                <tr>
                                    <th>MEMBER</th>
                                    <th>MEMBER ID</th>
                                    <th>PHONE</th>
                                    <th>PLAN</th>
                                    <th>DATES</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            {/* <tbody>
                                {
                                    members.map((member) => (
                                        <tr key={member.id}
                                            onClick={() => navigate("/home/memberdetails")}
                                            style={{ cursor: "pointer" }}>
                                            <td>
                                                <div className="memberInfo">
                                                    <div className="memberAvatar"> {member.initials} </div>
                                                    <strong>{member.name}</strong>
                                                </div>
                                            </td>
                                            <td>{member.id}</td>
                                            <td>{member.phone}</td>
                                            <td> <span className="memberPlan"> <span>☆</span> {member.plan} </span> </td>
                                            <td>
                                                <div className="memberDates">
                                                    <span>Joined: {member.joined}</span>
                                                    <span>Expires: {member.expires}</span>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="memberStatus"> {member.status} </span>
                                            </td>

                                            <td>
                                                <button className="memberAction" aria-label={`Actions for ${member.name}`} onClick={() => console.log("Member actions:", member.id)} > ⋮ </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody> */}


                            <tbody>

                                {members.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px"
                                            }}
                                        >
                                            No members added yet.
                                        </td>

                                    </tr>

                                ) : (

                                    members.map((member) => (

                                        <MemberRow
                                            key={member.id}
                                            member={member}
                                        />

                                    ))

                                )}

                            </tbody>


                        </table>

                    </div>

                    <div className="membersFooter">
                        {/* <span> Showing 1 to {members.length} of {members.length} members </span> */}

                        <span>
                            Showing {members.length === 0 ? 0 : 1} to {members.length} of {members.length} members
                        </span>
                        <div className="pageButtons">
                            <button disabled aria-label="Previous page">‹</button>
                            <button disabled aria-label="Next page">›</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}