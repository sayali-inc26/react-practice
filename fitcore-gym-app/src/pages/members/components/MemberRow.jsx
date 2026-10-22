import { useNavigate } from "react-router-dom";

export default function MemberRow({ member }) {
    const navigate = useNavigate();

    const initials = (member.fullName || "")
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (

        <tr
            onClick={() => navigate(`/home/memberdetails/${member.id}`)}
            style={{ cursor: "pointer" }}
        >

            <td>

                <div className="memberInfo">

                    <div className="memberAvatar">

                        {
                            member.profilePhotoUrl ? (

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
                    ☆ {member.plan}
                </span>
            </td>

            <td>

                <div className="memberDates">

                    <span>
                        Joined: {member.startDate}
                    </span>

                    <span>
                        Expires: {member.endDate}
                    </span>

                </div>

            </td>

            <td>

                <span className="memberStatus">
                    {member.active}
                </span>

            </td>

            <td>

                <button
                    className="memberAction"
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log("Member:", member);
                    }}
                >
                    ⋮
                </button>

            </td>

        </tr>

    );
}