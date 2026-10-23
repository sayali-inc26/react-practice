
import { useState, useEffect } from "react";
import { ReceiptText } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { getMember } from "../../../services/members";
import { getPayments } from "../../../services/payments";

import "./RecentPayments.css";

export default function RecentPayments() {

    const navigate = useNavigate();

    const [showAll, setShowAll] = useState(false);

    // const [members, setMembers] = useState([]);

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchPayments = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await getPayments();

                console.log("Payments API:", response);

                const data = response.data || response;

                const paymentList = Array.isArray(data)
                    ? data
                    : data.content || [];

                setPayments(paymentList);

            } catch (error) {

                console.error("Payment Error:", error);

                setError("Unable to fetch payments.");

            } finally {

                setLoading(false);

            }
        };

        fetchPayments();

    }, []);



    return (

        <div className="recentPayments">

            {/* Header */}

            <div className="recentHeader">

                <h2>Members ({payments.length})</h2>

                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "View All"}
                </button>

            </div>


            {/* Members Table */}


            <div className="recentScroll">

                <table className="recentTable">

                    <thead>
                        <tr>
                            <th>MEMBER</th>
                            <th>MEMBER ID</th>
                            <th>PLAN TYPE</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    Loading payments...
                                </td>
                            </tr>

                        ) : error ? (

                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    {error}
                                </td>
                            </tr>

                        ) : payments.length === 0 ? (

                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No payments found.
                                </td>
                            </tr>

                        ) : (

                            (showAll ? payments : payments.slice(0, 4))
                                .map((payment) => (

                                    <tr
                                        key={payment.id}
                                        onClick={() => {
                                            navigate(`/home/invoicedetails/${payment.id}`);
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >

                                        {/* Member Name */}

                                        <td>
                                            <div className="recentMember">

                                                <div className="recentAvatar">

                                                    {payment.memberPhotoUrl ? (

                                                        <img
                                                            src={payment.memberPhotoUrl}
                                                            alt={payment.memberName}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                borderRadius: "50%"
                                                            }}
                                                        />

                                                    ) : (

                                                        (payment.memberName || "")
                                                            .trim()
                                                            .split(/\s+/)
                                                            .filter(Boolean)
                                                            .map(word => word[0])
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()

                                                    )}

                                                </div>

                                                <span>
                                                    {payment.memberName || "N/A"}
                                                </span>

                                            </div>
                                        </td>


                                        {/* Member ID */}

                                        <td>
                                            {payment.memberId ?? "N/A"}
                                        </td>


                                        {/* Membership Plan */}

                                        <td>
                                            {payment.planType || "N/A"}
                                        </td>


                                        {/* Amount */}

                                        <td className="recentAmount">

                                            {payment.amount != null
                                                ? `₹${Number(payment.amount).toLocaleString("en-IN")}`
                                                : "N/A"}

                                        </td>


                                        {/* Payment Status */}

                                        <td>
                                            <span
                                                className={`recentStatus ${(payment.status || "")
                                                    .toLowerCase()
                                                    }`}
                                            >
                                                {payment.status || "N/A"}
                                            </span>
                                        </td>


                                        {/* Action */}

                                        <td>
                                            <button
                                                className="recentAction"
                                                title="View Invoice"
                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    navigate(
                                                        `/home/invoicedetails/${payment.id}`
                                                    );

                                                }}
                                            >
                                                <ReceiptText size={15} />
                                            </button>
                                        </td>

                                    </tr>

                                ))

                        )}

                    </tbody>

                </table>

            </div>


        </div>
    );
}
