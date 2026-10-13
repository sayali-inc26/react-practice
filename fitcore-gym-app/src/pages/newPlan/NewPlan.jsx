import "./NewPlan.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlan } from "../../redux/slices/planSlice";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [planFormData, setPlanFormData] = useState({
        name: "",
        description: "",
        icon: "star",

        monthly: "",
        annual: "",
        annualBilling: true,
        status: true,
        feature: "",
        features: [
            "24/7 Gym Access",
            "Unlimited Group Classes",
            "1 Personal Training Session / M"
        ]

    })

    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [icon, setIcon] = useState("star");

    // const [monthly, setMonthly] = useState("");
    // const [annual, setAnnual] = useState("");
    // const [annualBilling, setAnnualBilling] = useState(true);
    // const [status, setStatus] = useState(true);

    // const [feature, setFeature] = useState("");

    // const [features, setFeatures] = useState([
    //     "24/7 Gym Access",
    //     "Unlimited Group Classes",
    //     "1 Personal Training Session / M"
    // ]);

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

    const updateForm = (field, value) => {
        setPlanFormData((previous) => ({
            ...previous,
            [field]: value
        }));
    };

    const addFeature = () => {
        const newFeature = planFormData.feature.trim();

        if (newFeature === "") return;

        setPlanFormData((previous) => ({
            ...previous,
            features: [...previous.features, newFeature],
            feature: ""
        }));
    };

    const deleteFeature = (index) => {
        setPlanFormData((previous) => ({
            ...previous,
            features: previous.features.filter((item, i) => i !== index)
        }));
    };

    const createPlan = () => {

        if (!planFormData.name.trim()) {
            alert("Please enter a plan name");
            return;
        }

        if (
            planFormData.monthly === "" ||
            Number(planFormData.monthly) < 0
        ) {
            alert("Please enter a valid monthly price");
            return;
        }

        if (
            planFormData.annualBilling &&
            (
                planFormData.annual === "" ||
                Number(planFormData.annual) < 0
            )
        ) {
            alert("Please enter a valid annual price");
            return;
        }

        const plan = {
            id: Date.now().toString(),

            name: planFormData.name.trim(),
            description: planFormData.description,
            icon: planFormData.icon,

            price: Number(planFormData.monthly),

            annual: planFormData.annualBilling
                ? Number(planFormData.annual)
                : null,

            annualBilling: planFormData.annualBilling,

            features: planFormData.features.map((item) => [item, true]),

            status: planFormData.status ? "ACTIVE" : "INACTIVE",

            popular: false
        };

        dispatch(addPlan(plan));

        navigate("/home/membershipplans");
    };

    return (
        <div className="addPlan">


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
                            value={planFormData.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                        />

                        <label>Description</label>

                        <textarea
                            placeholder="Brief description of the plan benefits..."
                            value={planFormData.description}
                            onChange={(e) => updateForm("description", e.target.value)}
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