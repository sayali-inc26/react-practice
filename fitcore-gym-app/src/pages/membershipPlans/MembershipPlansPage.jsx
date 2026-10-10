import { useState } from "react";
import {
    Dumbbell,
    Activity,
    Flower2,
    Check,
    X,
    Users,
    MoreVertical,
    Plus
} from "lucide-react";

import "./MembershipPlansPage.css";
import { useNavigate } from "react-router-dom";



export default function MembershipPlansPage() {
     const navigate = useNavigate();

    const [billing, setBilling] = useState("Monthly");
    const [active, setActive] = useState("Standard Pro");

    const plans = [
        {
            name: "Basic Access",
            price: 29,
            annual: 23,
            status: "ACTIVE",
            icon: Activity,
            features: [
                ["Access to gym floor", true],
                ["Locker room access", true],
                ["24/7 Access", false],
                ["Group Classes", false]
            ]
        },
        {
            name: "Standard Pro",
            price: 59,
            annual: 47,
            status: "ACTIVE",
            icon: Dumbbell,
            popular: true,
            features: [
                ["Access to gym floor", true],
                ["Locker room access", true],
                ["24/7 Access Keyfob", true],
                ["Unlimited Group Classes", true]
            ]
        },
        {
            name: "Elite VIP",
            price: 129,
            annual: 103,
            status: "DRAFT",
            icon: Flower2,
            features: [
                ["All Standard Pro Features", true],
                ["Pool & Spa Access", true],
                ["2 Personal Trainer Sessions/mo", true],
                ["Guest Passes (4/mo)", true]
            ]
        }
    ];

    const comparison = [
        ["Gym Floor Access", "✓", "✓", "✓"],
        ["Locker Rooms & Showers", "✓", "✓", "✓"],
        ["24/7 Keyfob Entry", "—", "✓", "✓"],
        ["Group Fitness Classes", "—", "Unlimited", "Unlimited"],
        ["Pool & Spa Area", "—", "$10/visit", "✓"],
        ["Guest Passes", "—", "1 / Month", "4 / Month"]
    ];

    return (
        <div className="plans">

            
            <div className="header">
                <div>
                    <h1>Membership Plans</h1>
                    <p>Manage and configure your gym's subscription offerings.</p>
                </div>

                <button className="create" onClick={() => {navigate("/home/newplan")}}>
                    <Plus size={15} />
                    Create New Plan
                </button>
            </div>

            {/* Billing */}
            <div className="billing">
                <button
                    className={billing === "Monthly" ? "selected" : ""}
                    onClick={() => setBilling("Monthly")}
                >
                    Monthly Billing
                </button>

                <button
                    className={billing === "Annual" ? "selected" : ""}
                    onClick={() => setBilling("Annual")}
                >
                    Annual Billing
                    <span className="save">SAVE 20%</span>
                </button>
            </div>

            {/* Plans */}
            <div className="list">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    const price = billing === "Monthly"
                        ? plan.price
                        : plan.annual;

                    return (
                        <div
                            className={`card ${plan.popular ? "popular" : ""}`}
                            key={plan.name}
                        >
                            {plan.popular && (
                                <span className="badge">MOST POPULAR</span>
                            )}

                            <div className="top">
                                <div className="icon">
                                    <Icon size={17} />
                                </div>

                                <span className="status">{plan.status}</span>
                            </div>

                            <h3>{plan.name}</h3>

                            <div className="price">
                                ${price}
                                <small>/ mo</small>
                            </div>

                            <div className="features">
                                {plan.features.map(([feature, included]) => (
                                    <div className="feature" key={feature}>
                                        {included ? (
                                            <Check className="yes" size={13} />
                                        ) : (
                                            <X className="no" size={13} />
                                        )}
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="actions">
                                <button
                                    className={active === plan.name ? "edit active" : "edit"}
                                    onClick={() => setActive(plan.name)}
                                >
                                    Edit Plan
                                </button>

                                <button
                                    className="profile"
                                    title="Manage members"
                                    onClick={() => alert(`Manage ${plan.name} members`)}
                                >
                                    <Users size={14} />
                                </button>

                                <button
                                    className="menu"
                                    title="More options"
                                    onClick={() => alert(`More options for ${plan.name}`)}
                                >
                                    <MoreVertical size={14} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Comparison */}
            <div className="compare">
                <div className="comparehead">
                    <h3>Feature Comparison</h3>
                    <p>Detailed breakdown of allowances and restrictions per tier.</p>
                </div>

                <div className="scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Basic</th>
                                <th className="highlight">Standard Pro</th>
                                <th>Elite VIP</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comparison.map((row) => (
                                <tr key={row[0]}>
                                    {row.map((value, index) => (
                                        <td
                                            key={index}
                                            className={index === 2 ? "highlight" : ""}
                                        >
                                            {index === 0 ? (
                                                value
                                            ) : (
                                                <span className={
                                                    value === "—"
                                                        ? "no"
                                                        : value === "✓"
                                                            ? "yes"
                                                            : ""
                                                }>
                                                    {value}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );


}
