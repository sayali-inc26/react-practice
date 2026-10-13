
import { useState } from "react";
import { ReceiptText } from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./RecentPayments.css";

export default function RecentPayments() {

    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    const payments = [
        {
            id: 1,
            name: "Marcus Johnson",
            initials: "MJ",
            plan: "Premium Annual",
            amount: "$1,200.00",
            date: "Jun 24, 2024",
            status: "Success"
        },
        {
            id: 2,
            name: "Sarah Chen",
            initials: "SC",
            plan: "Pro Monthly",
            amount: "$85.00",
            date: "Jun 23, 2024",
            status: "Pending"
        },
        {
            id: 3,
            name: "David Rodriguez",
            initials: "DR",
            plan: "Basic Monthly",
            amount: "$45.00",
            date: "Jun 22, 2024",
            status: "Failed"
        },
        {
            id: 4,
            name: "James Wilson",
            initials: "JW",
            plan: "Personal Training x5",
            amount: "$350.00",
            date: "Jun 21, 2024",
            status: "Success"
        }
    ];

    return (
        <div className="recentPayments">

            {/* Header */}

            <div className="recentHeader">
                <h2>Recent Payments</h2>

                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "View All"}
                </button>
            </div>

            {/* Payments Table */}

            <div className="recentScroll">

                <table className="recentTable">

                    <thead>
                        <tr>
                            <th>MEMBER</th>
                            <th>PLAN TYPE</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>

                        {(showAll ? payments : payments.slice(0, 4)).map((payment) => (

                            <tr key={payment.id}
                                onClick={() => navigate("/home/invoicedetails")}
                                style={{ cursor: "pointer" }}
                            >

                                <td>
                                    <div className="recentMember">

                                        <div className="recentAvatar">
                                            {payment.initials}
                                        </div>

                                        <span>{payment.name}</span>

                                    </div>
                                </td>

                                <td>{payment.plan}</td>

                                <td className="recentAmount">
                                    {payment.amount}
                                </td>

                                <td>{payment.date}</td>

                                <td>
                                    <span className={`recentStatus ${payment.status.toLowerCase()}`}>
                                        {payment.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="recentAction"
                                        title="View Receipt"
                                        onClick={() => console.log("Receipt:", payment)}
                                    >
                                        <ReceiptText size={15} />
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
