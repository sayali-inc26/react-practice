import "./AddMemberPage.css";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import {
    MonitorCheck,
    ClipboardPlus,
    UserRound
} from "lucide-react";

export default function AddMemberPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        height: "175",
        weight: "70",
        goal: "",
        experience: "Intermediate (1-3 yrs)",
        plan: "Standard",
        duration: "12",
        startDate: "",
        endDate: "",
        contactName: "",
        relationship: "",
        emergencyPhone: ""
    });

    const [photo, setPhoto] = useState(null);

    const prices = {
        Basic: 29,
        Standard: 49,
        Premium: 89
    };

    const updateField = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const bmi =
        Number(formData.height) > 0 && Number(formData.weight) > 0
            ? (
                Number(formData.weight) /
                Math.pow(Number(formData.height) / 100, 2)
            ).toFixed(1)
            : "--";

    const totalFee =
        prices[formData.plan] * Number(formData.duration || 0);

    const calculateEndDate = (startDate, months) => {
        if (!startDate) return "";

        const date = new Date(`${startDate}T12:00:00`);
        date.setMonth(date.getMonth() + Number(months));

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    };

    const handleStartDate = (event) => {
        const startDate = event.target.value;

        setFormData((previous) => ({
            ...previous,
            startDate,
            endDate: calculateEndDate(startDate, previous.duration)
        }));
    };

    const handleDuration = (event) => {
        const duration = event.target.value;

        setFormData((previous) => ({
            ...previous,
            duration,
            endDate: calculateEndDate(previous.startDate, duration)
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("New Member:", formData);
        console.log("Profile Photo:", photo);

        // Connect your create-member API here.
    };

    return (
        <>
            <div className="addMemberContent">

                <div className="addMembersHeader">
                    <div>
                        <h1>Add New Member</h1>
                        <h5>Complete the multi-step form below to register a new member to the facility.</h5>
                    </div>


                    <div className="informationForm">

                        <form className="informationForm" onSubmit={handleSubmit}>

                            {/* 1. PERSONAL INFORMATION */}

                            <section className="formSection">

                                <div className="sectionHeader">
                                    <span className="sectionIcon"><UserRound size={20} color="#D7FF00" /></span>
                                    <h2>1. Personal Information</h2>

                                </div>

                                <div className="personalInformation">

                                    <div className="photoSection">

                                        <label className="photoCircle" htmlFor="memberPhoto"> {photo ? (

                                            <img src={photo} alt="Member profile" />) : (<span>📷</span>)}

                                        </label>

                                        <input id="memberPhoto" type="file" accept="image/*" className="hiddenInput" onChange={(event) => {

                                            const file = event.target.files?.[0]; if (file) { setPhoto(URL.createObjectURL(file)); }
                                        }} />

                                        <span className="photoLabel">PROFILE PHOTO</span>

                                    </div>

                                    <div className="personalFields">
                                        <div className="formGroup fullWidth">
                                            <label>Full Name</label>

                                            <input name="fullName" value={formData.fullName} onChange={updateField} placeholder="e.g. John Doe" required />

                                        </div>

                                        <div className="formGrid twoColumns">

                                            <div className="formGroup">

                                                <label>Date of Birth</label>

                                                <input type="date" name="dob" value={formData.dob} onChange={updateField} required />

                                            </div>

                                            <div className="formGroup">

                                                <label>Gender</label>

                                                <select name="gender" value={formData.gender} onChange={updateField} required >

                                                    <option value="">Select Gender</option>

                                                    <option>Male</option>

                                                    <option>Female</option>

                                                    <option>Other</option>

                                                    <option>Prefer not to say</option>

                                                </select>
                                            </div>
                                            <div className="formGroup">

                                                <label>Phone Number</label>

                                                <input type="tel" name="phone" value={formData.phone} onChange={updateField} placeholder="+1 (555) 000-0000" required />

                                            </div>

                                            <div className="formGroup">

                                                <label>Email Address</label>

                                                <input type="email" name="email" value={formData.email} onChange={updateField} placeholder="member@example.com" required />

                                            </div>

                                            <div className="formGroup fullWidth">

                                                <label>Home Address</label>

                                                <textarea name="address" value={formData.address} onChange={updateField} placeholder="123 Fitness Ave, Muscle City..." rows="2" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. FITNESS METRICS */}

                            <section className="formSection">

                                <div className="sectionHeader">

                                    <span className="sectionIcon"><ClipboardPlus size={20} color="#D7FF00" /></span>

                                    <h2>2. Fitness Metrics</h2>

                                </div>

                                <div className="fitnessMetrics">

                                    <div className="formGroup">

                                        <label>Height (cm)</label>

                                        <input type="number" name="height" value={formData.height} onChange={updateField} min="1" />
                                        <label>Weight (kg)</label>
                                        <input type="number" name="weight" value={formData.weight} onChange={updateField} min="1" />
                                    </div>
                                    <div className="bmiCard">
                                        <span>CALCULATED BMI</span>
                                        <strong>{bmi}</strong>
                                        <small> {bmi === "--" ? "Status: Pending" : Number(bmi) < 18.5 ? "Below healthy range" : Number(bmi) < 25 ? "Healthy range" : Number(bmi) < 30 ? "Above healthy range" : "High BMI range"}</small>
                                    </div>
                                    <div className="formGroup">
                                        <label>Primary Goal</label>
                                        <select name="goal" value={formData.goal} onChange={updateField} required >
                                            <option value="">Select Goal</option>
                                            <option>Weight Loss</option>
                                            <option>Muscle Gain</option>
                                            <option>General Fitness</option>
                                            <option>Strength Training</option>
                                            <option>Endurance</option>
                                        </select>
                                        <label>Experience Level</label>
                                        <select name="experience" value={formData.experience} onChange={updateField} >
                                            <option>Beginner (0-1 yr)</option>
                                            <option>Intermediate (1-3 yrs)</option>
                                            <option>Advanced (3+ yrs)</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* 3. MEMBERSHIP PLAN */}

                            <section className="formSection">
                                <div className="sectionHeader">
                                    <span className="sectionIcon"><MonitorCheck size={20} color="#D7FF00" /></span>
                                    <h2>3. Membership Plan</h2>
                                </div>

                                <div className="membershipPlans">
                                    <label className="fieldLabel">Select Tier</label>
                                    <div className="planGrid"> {Object.entries(prices).map(([plan, price]) => (

                                        <button type="button" key={plan} className={`planCard ${formData.plan === plan ? "selectedPlan" : ""}`} onClick={() => setFormData((previous) => ({ ...previous, plan }))} >

                                            <span className="planName">{plan}</span>

                                            <span className="planCheck"> {formData.plan === plan ? "✓" : "○"} </span>

                                            <strong> ${price}<small>/mo</small> </strong>

                                        </button>
                                    ))}
                                    </div>

                                    <div className="membershipDetails">
                                        <div className="formGroup">
                                            <label>Duration</label>
                                            <select name="duration" value={formData.duration} onChange={handleDuration} >
                                                <option value="1">1 Month</option>
                                                <option value="3">3 Months</option>
                                                <option value="6">6 Months</option>
                                                <option value="12">12 Months</option>
                                            </select>
                                        </div>

                                        <div className="formGroup">
                                            <label>Start Date</label>
                                            <input type="date" name="startDate" value={formData.startDate} onChange={handleStartDate} required />
                                        </div>

                                        <div className="formGroup">

                                            <label>End Date</label>
                                            <input type="date" name="endDate" value={formData.endDate} readOnly />
                                        </div>

                                        <div className="formGroup">

                                            <label>Total Fee Due</label>
                                            <input value={`$${totalFee.toFixed(2)}`} readOnly />

                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 4. EMERGENCY CONTACT */}

                            <section className="formSection">

                                <div className="sectionHeader">
                                    <span className="emergencyIcon">✱</span>
                                    <h2>4. Emergency Contact</h2>
                                </div>

                                <div className="emergencyContacts">

                                    <div className="formGroup">

                                        <label>Contact Name</label>

                                        <input name="contactName" value={formData.contactName} onChange={updateField} placeholder="Jane Doe" required />

                                    </div>

                                    <div className="formGroup">
                                        <label>Relationship</label>

                                        <input name="relationship" value={formData.relationship} onChange={updateField} placeholder="Spouse, Parent, etc." required />
                                    </div>

                                    <div className="formGroup">

                                        <label>Phone Number</label>

                                        <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={updateField} placeholder="+1 (555) 999-9999" required />

                                    </div>
                                </div>
                            </section>

                            {/* FORM ACTIONS */}

                            <div className="formActions">
                                <button type="button" className="cancelButton" onClick={() => navigate("/home/members")} > Cancel </button>

                                <button type="submit" className="submitButton"><UserRound size={12} color="black" />Add Member </button>
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}