
import { useState } from "react";
import {
    MapPin,
    CalendarDays,
    UserRound,
    Users,
    Minus,
    Plus,
    Check,
    CircleCheck
} from "lucide-react";

import "./TripConfiguration.css";

const startingData = {
    title: "Goa Coastal Escape & Beach Exploration",
    destination: "South & North Goa, India",
    departure: "2024-11-14",
    returnDate: "2024-11-19",
    group: "Couple",
    adults: 2,
    children: 0,
    currency: "INR",
    budget: 30000,
    notes: "Confirmed scooter rental with Fernandes Garage near Madgaon Junction. Check-in at Casa Da Praia requires photo IDs sent prior to arrival. Sunset dinner reservation at Martin's Corner on Day 3 evening."
};

export default function TripConfiguration() {

    const [form, setForm] = useState({ ...startingData });
    const [saved, setSaved] = useState("");

    const groups = [
        { name: "Solo", label: "Solo Explorer", detail: "1 Person" },
        { name: "Couple", label: "Couple", detail: "2 Persons" },
        { name: "Family", label: "Family Pack", detail: "3-5 Persons" },
        { name: "Group", label: "Nomad Tribe", detail: "6+ Persons" }
    ];

    function changeField(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setSaved("");
    }

    function selectGroup(group) {

        let count = 2;

        if (group === "Solo") count = 1;
        if (group === "Family") count = 3;
        if (group === "Group") count = 6;

        setForm({
            ...form,
            group: group,
            adults: count,
            children: 0
        });

        setSaved("");
    }

    function changeCount(field, amount) {

        const minimum = field === "adults" ? 1 : 0;

        setForm({
            ...form,
            [field]: Math.max(minimum, form[field] + amount)
        });

        setSaved("");
    }

    function discardChanges() {
        setForm({ ...startingData });
        setSaved("");
    }

    function saveDraft() {
        console.log("Trip draft:", form);
        setSaved("Draft saved successfully!");
    }

    function saveTrip(e) {
        e.preventDefault();

        if (new Date(form.returnDate) < new Date(form.departure)) {
            alert("Return date cannot be before departure date.");
            return;
        }

        console.log("Trip details:", form);

        setSaved("Trip details saved successfully!");
    }

    const totalDays = form.departure && form.returnDate
        ? Math.max(
            0,
            Math.round(
                (new Date(form.returnDate) - new Date(form.departure)) /
                (1000 * 60 * 60 * 24)
            )
        )
        : 0;

    const totalPeople = form.adults + form.children;

    return (
        <div className="configPage">

            <div className="configContainer">

                <div className="configBreadcrumb">
                    Dashboard › My Trips › Edit Trip
                </div>

                <h1>Trip Configuration</h1>

                <div className="editingTag">
                    ● Editing: Goa Coastal Escape
                </div>

                <form onSubmit={saveTrip}>

                    {/* SECTION 1 */}

                    <section className="configCard">

                        <div className="configHeading">
                            <div className="headingLeft">
                                <span className="step">1</span>

                                <div>
                                    <h2>Core Essentials</h2>
                                    <p>Destination foundation, travel schedule, and experience markers</p>
                                </div>
                            </div>

                            <span className="sectionTag">BASICS</span>
                        </div>

                        <div className="configField">

                            <div className="fieldHeading">
                                <label>Trip Title</label>
                                <span>{form.title.length} / 60</span>
                            </div>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={changeField}
                                maxLength={60}
                                required
                            />

                        </div>

                        <div className="configField">

                            <label>Destination & Region</label>

                            <div className="destinationBox">
                                <MapPin size={18} />

                                <input
                                    type="text"
                                    name="destination"
                                    value={form.destination}
                                    onChange={changeField}
                                    required
                                />

                                <span className="validated">
                                    <CircleCheck size={13} />
                                    Validated
                                </span>
                            </div>

                            <div className="vibes">
                                <span>Suggested vibes:</span>
                                <span className="vibe">Beach & Coast ✓</span>
                                <span className="vibe activeVibe">Cultural Heritage ✓</span>
                                <span className="vibe">+ Watersports</span>
                                <span className="vibe">+ Nightlife Hubs</span>
                            </div>

                        </div>

                        <div className="dateRow">

                            <div className="configField">
                                <label>Departure Date</label>

                                <div className="dateBox">
                                    <CalendarDays size={18} />

                                    <input
                                        type="date"
                                        name="departure"
                                        value={form.departure}
                                        onChange={changeField}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="daysTag">
                                {totalDays}D / {Math.max(totalDays - 1, 0)}N
                            </div>

                            <div className="configField">
                                <label>Return Date</label>

                                <div className="dateBox">
                                    <CalendarDays size={18} />

                                    <input
                                        type="date"
                                        name="returnDate"
                                        value={form.returnDate}
                                        onChange={changeField}
                                        min={form.departure}
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                    </section>

                    {/* SECTION 2 */}

                    <section className="configCard">

                        <div className="configHeading">
                            <div className="headingLeft">
                                <span className="step">2</span>

                                <div>
                                    <h2>Travelers & Crew</h2>
                                    <p>Define group party dynamics and grant live planning permissions</p>
                                </div>
                            </div>

                            <span className="sectionTag">PARTY</span>
                        </div>

                        <label>Group Size Preset</label>

                        <div className="groupOptions">

                            {groups.map((item) => (

                                <button
                                    type="button"
                                    key={item.name}
                                    className={
                                        form.group === item.name
                                            ? "groupBtn selectedGroup"
                                            : "groupBtn"
                                    }
                                    onClick={() => selectGroup(item.name)}
                                >
                                    {item.name === "Solo"
                                        ? <UserRound size={19} />
                                        : <Users size={19} />
                                    }

                                    <strong>{item.label}</strong>
                                    <span>{item.detail}</span>
                                </button>

                            ))}

                        </div>

                        <div className="counterRow">

                            <div className="counterBox">

                                <div>
                                    <strong>Adults</strong>
                                    <p>Ages 13 and above</p>
                                </div>

                                <div className="counter">
                                    <button
                                        type="button"
                                        onClick={() => changeCount("adults", -1)}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <strong>{form.adults}</strong>

                                    <button
                                        type="button"
                                        onClick={() => changeCount("adults", 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                            </div>

                            <div className="counterBox">

                                <div>
                                    <strong>Children</strong>
                                    <p>Ages 0 to 12</p>
                                </div>

                                <div className="counter">
                                    <button
                                        type="button"
                                        onClick={() => changeCount("children", -1)}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <strong>{form.children}</strong>

                                    <button
                                        type="button"
                                        onClick={() => changeCount("children", 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* SECTION 3 */}

                    <section className="configCard">

                        <div className="configHeading">
                            <div className="headingLeft">
                                <span className="step">3</span>

                                <div>
                                    <h2>Budget & Allocations</h2>
                                    <p>Set financial caps and adjust smart category expenditure bands</p>
                                </div>
                            </div>

                            <span className="sectionTag">BUDGETING</span>
                        </div>

                        <div className="budgetRow">

                            <div className="configField">
                                <label>Base Currency</label>

                                <select
                                    name="currency"
                                    value={form.currency}
                                    onChange={changeField}
                                >
                                    <option value="INR">INR (₹) - Indian Rupee</option>
                                    <option value="USD">USD ($) - US Dollar</option>
                                    <option value="EUR">EUR (€) - Euro</option>
                                </select>
                            </div>

                            <div className="configField">

                                <div className="fieldHeading">
                                    <label>Overall Target Budget</label>

                                    <span className="budgetHint">
                                        Auto-derived: ₹{totalDays && totalPeople
                                            ? Math.round(form.budget / totalDays / totalPeople).toLocaleString()
                                            : 0}/day/person
                                    </span>
                                </div>

                                <input
                                    type="number"
                                    name="budget"
                                    min="0"
                                    value={form.budget}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            budget: Number(e.target.value)
                                        })
                                    }
                                    required
                                />

                            </div>

                        </div>

                    </section>

                    {/* SECTION 4 */}

                    <section className="configCard">

                        <div className="configHeading">
                            <div className="headingLeft">
                                <span className="step">4</span>

                                <div>
                                    <h2>Logistics & Operational Notes</h2>
                                    <p>Flight codes, scooter booking, and dietary restrictions</p>
                                </div>
                            </div>

                            <span className="sectionTag">LOGISTICS</span>
                        </div>

                        <div className="configField">

                            <label>Internal Itinerary Notes & Contingencies</label>

                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={changeField}
                                rows={5}
                                placeholder="Add your trip notes..."
                            />

                        </div>

                    </section>

                    {/* BOTTOM BUTTONS */}

                    <div className="configBottom">

                        <p>
                            <span className="greenDot">●</span>
                            {saved || "You have unsaved changes"}
                        </p>

                        <div className="configActions">

                            <button
                                type="button"
                                className="discardBtn"
                                onClick={discardChanges}
                            >
                                Discard
                            </button>

                            <button
                                type="button"
                                className="draftBtn"
                                onClick={saveDraft}
                            >
                                Save as Draft
                            </button>

                            <button
                                type="submit"
                                className="saveBtn"
                            >
                                <Check size={17} />
                                Save & Update Trip
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
}
