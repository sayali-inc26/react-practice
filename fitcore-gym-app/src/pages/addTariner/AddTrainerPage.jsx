import { useState } from "react";
import {
    UserRound,
    Award,
    FilePenLine,
    Clock,
    Camera
} from "lucide-react";

import "./AddTrainerPage.css";

export default function AddTrainerPage() {
    const [photo, setPhoto] = useState("");
    const [shift, setShift] = useState("Morning");
    const [days, setDays] = useState(["M", "T", "W", "T", "F"]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        rate: "",
        certifications: "",
        summary: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handlePhoto(e) {
        const file = e.target.files[0];

        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    }

    function toggleDay(day, index) {
        const key = `${day}-${index}`;

        setDays((prev) =>
            prev.includes(key)
                ? prev.filter((item) => item !== key)
                : [...prev, key]
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Trainer Details:", {
            ...form,
            photo,
            shift,
            days
        });
    }

    return (
        <div className="addTrainer">

            {/* Header */}
            <div className="header">
                <div>
                    <h1>Add New Trainer</h1>
                    <p>Enter details to register a new trainer to the FitCore system.</p>
                </div>

                <div className="buttons">
                    <button
                        type="button"
                        className="cancel"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="trainerForm"
                        className="add"
                    >
                        Add Trainer
                    </button>
                </div>
            </div>

            <form id="trainerForm" onSubmit={handleSubmit}>

                <div className="content">

                    {/* Left side */}
                    <div className="left">

                        {/* Personal Information */}
                        <section className="box personal">
                            <h2>
                                <UserRound />
                                Personal Information
                            </h2>

                            <div className="person">
                                <div className="upload">
                                    <label>Profile Photo</label>

                                    <label className="photo" htmlFor="photo">
                                        {photo ? (
                                            <img src={photo} alt="Trainer" />
                                        ) : (
                                            <>
                                                <Camera size={23} />
                                                <span>Upload</span>
                                            </>
                                        )}
                                    </label>

                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhoto}
                                    />
                                </div>

                                <div className="fields">
                                    <label className="full">
                                        Full Name
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="e.g. John Doe"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>

                                    <label>
                                        Email Address
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>

                                    <label>
                                        Phone Number
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Bio / Notes */}
                        <section className="box bio">
                            <h2>
                                <FilePenLine />
                                Bio / Notes
                            </h2>

                            <label>
                                Professional Summary
                                <textarea
                                    name="summary"
                                    placeholder="Brief description of the trainer's background and training philosophy..."
                                    value={form.summary}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </label>
                        </section>

                    </div>

                    {/* Right side */}
                    <div className="right">

                        {/* Professional */}
                        <section className="box professional">
                            <h2>
                                <Award />
                                Professional
                            </h2>

                            <div className="fields one">

                                <label>
                                    Specialization
                                    <select
                                        name="specialization"
                                        value={form.specialization}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select specialization...</option>
                                        <option value="Strength">Strength</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Yoga">Yoga</option>
                                        <option value="CrossFit">CrossFit</option>
                                        <option value="Personal Training">Personal Training</option>
                                    </select>
                                </label>

                                <div className="two">
                                    <label>
                                        Experience (Yrs)
                                        <input
                                            type="number"
                                            name="experience"
                                            placeholder="e.g. 5"
                                            min="0"
                                            value={form.experience}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>

                                    <label>
                                        Hourly Rate ($)
                                        <input
                                            type="number"
                                            name="rate"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            value={form.rate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                </div>

                                <label>
                                    Certifications
                                    <textarea
                                        name="certifications"
                                        placeholder="ISSA, NASM, ACE, etc..."
                                        value={form.certifications}
                                        onChange={handleChange}
                                        rows="2"
                                    />
                                </label>

                            </div>
                        </section>

                        {/* Availability */}
                        <section className="box availability">
                            <h2>
                                <Clock />
                                Availability
                            </h2>

                            <div className="shift">
                                <label>Preferred Shift</label>

                                <div className="shifts">
                                    {["Morning", "Afternoon", "Evening"].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            className={shift === item ? "chosen" : ""}
                                            onClick={() => setShift(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="work">
                                <label>Working Days</label>

                                <div className="days">
                                    {[
                                        ["M", 0],
                                        ["T", 1],
                                        ["W", 2],
                                        ["T", 3],
                                        ["F", 4],
                                        ["S", 5],
                                        ["S", 6]
                                    ].map(([day, index]) => {
                                        const key = `${day}-${index}`;

                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={days.includes(key) ? "chosen" : ""}
                                                onClick={() => toggleDay(day, index)}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

            </form>
        </div>
    );


}
