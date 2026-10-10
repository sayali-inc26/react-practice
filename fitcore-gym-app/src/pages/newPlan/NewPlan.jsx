import "./NewPlan.css"

import { useState } from "react";

import {
    Info,
    Banknote,
    List,
    Star,
    Zap,
    Dumbbell,
    Award,
    Gem,
    PersonStanding,
    Waves,
    Plus,
    CheckCircle,
    Trash2
} from "lucide-react";

import "./NewPlan.css";

export default function NewPlan() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("star");

    const [monthly, setMonthly] = useState("");
    const [annual, setAnnual] = useState("");
    const [annualBilling, setAnnualBilling] = useState(true);
    const [status, setStatus] = useState(true);

    const [feature, setFeature] = useState("");

    const [features, setFeatures] = useState([
        "24/7 Gym Access",
        "Unlimited Group Classes",
        "1 Personal Training Session / M"
    ]);

    const icons = [
        { name: "star", Icon: Star },
        { name: "zap", Icon: Zap },
        { name: "gym", Icon: Dumbbell },
        { name: "award", Icon: Award },
        { name: "gem", Icon: Gem },
        { name: "person", Icon: PersonStanding },
        { name: "waves", Icon: Waves },
        { name: "plus", Icon: Plus }
    ];

    const addFeature = () => {
        if (feature.trim() !== "") {
            setFeatures([...features, feature.trim()]);
            setFeature("");
        }
    };

    const deleteFeature = (index) => {
        setFeatures(features.filter((item, i) => i !== index));
    };

    const createPlan = () => {
        const plan = {
            name,
            description,
            icon,
            monthlyPrice: monthly,
            annualPrice: annual,
            annualBilling,
            features,
            status: status ? "Active" : "Inactive"
        };

        console.log("New Plan:", plan);
    };

    return (
        <div className="addPlan">

            {/* PLAN BASICS */}
            <div className="box">

                <h3>
                    <Info size={17} />
                    Plan Basics
                </h3>

                <div className="basic">

                    <div className="left">

                        <label>Plan Name</label>

                        <input
                            type="text"
                            placeholder="e.g., Gold Membership"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Description</label>

                        <textarea
                            placeholder="Brief description of the plan benefits..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>

                    <div className="right">

                        <label>Plan Icon</label>

                        <div className="icons">

                            {icons.map(({ name, Icon }) => (
                                <button
                                    type="button"
                                    key={name}
                                    className={icon === name ? "chosen" : ""}
                                    onClick={() => setIcon(name)}
                                    aria-label={name}
                                >
                                    <Icon size={25} />
                                </button>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

            {/* PRICING AND BILLING */}
            <div className="box">

                <div className="title">

                    <h3>
                        <Banknote size={17} />
                        Pricing & Billing
                    </h3>

                    <label className="switch">
                        <span>Enable Annual Billing</span>

                        <input
                            type="checkbox"
                            checked={annualBilling}
                            onChange={(e) => setAnnualBilling(e.target.checked)}
                        />

                        <span className="slider"></span>
                    </label>

                </div>

                <div className="prices">

                    <div>
                        <label>Monthly Price ($)</label>

                        <input
                            type="number"
                            min="0"
                            placeholder="$"
                            value={monthly}
                            onChange={(e) => setMonthly(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="annualPlan">
                            <p> Annual Price ($)    <span className="save">Save 20%</span></p>
                            
                        </label>

                        <input
                            type="number"
                            min="0"
                            placeholder="$"
                            value={annual}
                            onChange={(e) => setAnnual(e.target.value)}
                            disabled={!annualBilling}
                        />
                    </div>

                </div>

            </div>

            {/* FEATURES */}
            <div className="box">

                <h3>
                    <List size={17} />
                    Features & Access
                </h3>

                <div className="features">

                    {features.map((item, index) => (
                        <div className="feature" key={`${item}-${index}`}>

                            <CheckCircle size={16} />

                            <span>{item}</span>

                            <button
                                type="button"
                                onClick={() => deleteFeature(index)}
                                aria-label={`Delete ${item}`}
                            >
                                <Trash2 size={15} />
                            </button>

                        </div>
                    ))}

                </div>

                <div className="addFeature">

                    <input
                        type="text"
                        placeholder="Add a new feature..."
                        value={feature}
                        onChange={(e) => setFeature(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addFeature();
                            }
                        }}
                    />

                    <button type="button" onClick={addFeature}>
                        Add
                    </button>

                </div>

            </div>

            {/* BOTTOM ACTIONS */}
            <div className="bottom">

                <label className="switch boxstatus">

                    <span>
                        Plan Status: {status ? "Active" : "Inactive"}
                    </span>

                    <input
                        type="checkbox"
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />

                    <span className="slider"></span>

                </label>

                <div className="buttons">

                    <button
                        className="cancel"
                        type="button"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </button>

                    <button
                        className="create"
                        type="button"
                        onClick={createPlan}
                    >
                        Create Plan
                    </button>

                </div>

            </div>

        </div>
    );
}