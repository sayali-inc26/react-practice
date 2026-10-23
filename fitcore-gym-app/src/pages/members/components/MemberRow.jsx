
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteMember } from "../../../services/members";
import { removeMember } from "../../../redux/slices/memberSlice";

import { Trash } from "lucide-react";

export default function MemberRow({ member }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [deleting, setDeleting] = useState(false);

    const initials = (member.fullName || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();


    // Delete Member

    const handleDelete = async (event) => {

        event.stopPropagation();

        if (deleting) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${member.fullName}?`
        );

        if (!confirmDelete) return;

        try {

            setDeleting(true);

            // Delete member from database
            await deleteMember(member.id);

            // Remove member from Redux (UI)
            dispatch(removeMember(member.id));

            console.log("Member deleted successfully:", member.id);

        } catch (error) {

            console.error("Delete failed:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete member."
            );

        } finally {

            setDeleting(false);

        }

    };


    return (

        <tr
            onClick={() =>
                navigate(`/home/memberdetails/${member.id}`)
            }
            style={{ cursor: "pointer" }}
        >

            <td>

                <div className="memberInfo">

                    <div className="memberAvatar">

                        {member.profilePhotoUrl ? (

                            <img
                                src={member.profilePhotoUrl}
                                alt={member.fullName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />

                        ) : (

                            initials

                        )}

                    </div>

                    <strong>{member.fullName}</strong>

                </div>

            </td>


            <td>
                #FC{String(member.id).padStart(5, "0")}
            </td>

            <td>{member.phoneNumber}</td>

            <td>
                <span className="memberPlan">
                    ☆ {member.membershipPlanName}
                </span>
            </td>

            <td>

                <div className="memberDates">

                    <span>Joined: {member.startDate}</span>

                    <span>Expires: {member.endDate}</span>

                </div>

            </td>


            <td>

                <span className="memberStatus">
                    {member.active ? "ACTIVE" : "INACTIVE"}
                </span>

            </td>


            <td>

                <button
                    type="button"
                    className="memberAction"
                    onClick={handleDelete}
                    disabled={deleting}
                    title="Delete Member"
                >

                    {deleting ? (
                        "Deleting..."
                    ) : (
                        <Trash size={15} />
                    )}

                </button>

            </td>

        </tr>

    );
}
