
import "./MembersPage.css";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { Outlet, useLocation } from "react-router-dom";
const members = [
    {
        name: "Rahul Patil",
        id: "#FC1001",
        phone: "+1 (555) 123-4567",
        plan: "Premium",
        joined: "Oct 12, 2023",
        expires: "Oct 12, 2024",
        status: "Active",
        initials: "RP"
    }
];


export default function MembersPage() {
    const navigate = useNavigate();

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

                            <tbody>
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

                            </tbody>

                        </table>
                        
                    </div>

                    <div className="membersFooter">
                        <span> Showing 1 to {members.length} of {members.length} members </span>
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