import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Plus, GripVertical, Pencil, Utensils, Camera, Wallet } from "lucide-react";
// import { addActivity, updateActivity } from "../../../../redux/slices/tripDetails";
import useTripStore from "../../../../store/tripStore";


import "./ItionaryTab.css";

export default function ItionaryTab({ trip }) {
    // const dispatch = useDispatch();

    const addActivity = useTripStore((state) => state.addActivity);

    const updateActivity = useTripStore((state) => state.updateActivity);

    const [selectedDay, setSelectedDay] = useState(1);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState(null);

    const [activity, setActivity] = useState(
        {
            title: "",
            time: "",
            category: "Food",
            amount: "",
            notes: ""
        }
    );
    const dayData = trip.itinerary.find(item => item.day === selectedDay);
    function openAddForm() {
        setEditId(null);
        setActivity(
            {
                title: "",
                time: "",
                category: "Food",
                amount: "",
                notes: ""
            }
        );
        setShowForm(true)
    }
    function openEditForm(item) {
        setEditId(item.id);
        setActivity(
            {
                title: item.title,
                time: item.time,
                category: item.category,
                amount: item.amount,
                notes: item.notes || ""
            }
        );
        setShowForm(true)
    }

    function saveActivity(e) {
        e.preventDefault();

        const data = {
            ...activity,
            id: editId ?? Date.now(),
            amount: Number(activity.amount)
        };

        if (editId !== null) {

            updateActivity({
                tripId: trip.id,
                day: selectedDay,
                activity: data
            });

        } else {

            addActivity({
                tripId: trip.id,
                day: selectedDay,
                activity: data
            });

        }

        setShowForm(false);
    }
    return (
        <>

            <div className="itineraryLayout">

                <div className="daysList">

                    {trip.itinerary.map((item) => (

                        <button
                            key={item.day}
                            className={
                                selectedDay === item.day
                                    ? "selectedDay"
                                    : ""
                            }
                            onClick={() => setSelectedDay(item.day)}
                        >

                            <span>
                                <strong>Day {item.day}</strong>
                                <small>{item.date}</small>
                            </span>

                            {selectedDay === item.day && (
                                <span>›</span>
                            )}

                        </button>

                    ))}

                </div>


                <div className="dayContent">

                    <div className="dayHeading">

                        <h2>
                            Day {selectedDay} - {dayData?.title}
                        </h2>

                        <button
                            className="addActivity"
                            onClick={openAddForm}
                        >
                            <Plus size={16} />
                            Add Activity
                        </button>

                    </div>

                    <div className="timeline">

                        {dayData?.activities.length === 0 && (
                            <p>No activities added for this day.</p>
                        )}

                        {dayData?.activities.map((item, index) => (

                            <div
                                className={
                                    index % 2 === 0
                                        ? "timelineItem rightItem"
                                        : "timelineItem leftItem"
                                }
                                key={item.id}
                            >

                                <div className="timelineDot">
                                    <GripVertical size={15} />
                                </div>

                                <div className="activityCard">

                                    <button
                                        className="editActivity"
                                        onClick={() => openEditForm(item)}
                                        aria-label={`Edit ${item.title}`}
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <h4>{item.time}</h4>

                                    <h3>{item.title}</h3>

                                    <div className="activityTags">

                                        <span>
                                            {item.category === "Food"
                                                ? <Utensils size={12} />
                                                : <Camera size={12} />
                                            }

                                            {item.category}
                                        </span>

                                        <span>
                                            <Wallet size={12} />

                                            {item.amount === 0
                                                ? "Free"
                                                : `${trip.currency}${item.amount}`
                                            }
                                        </span>

                                    </div>

                                    {item.notes && (
                                        <p>{item.notes}</p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
            {showForm && <div className="activityOverlay"><form className="activityForm" onSubmit={saveActivity}><h2>{editId ? "Edit Activity" : "Add Activity"}</h2><label>Activity Name</label><input value={activity.title} onChange={e => setActivity({ ...activity, title: e.target.value })} required /><label>Time</label><input type="time" value={activity.time} onChange={e => setActivity({ ...activity, time: e.target.value })} required /><label>Category</label><select value={activity.category} onChange={e => setActivity({ ...activity, category: e.target.value })}>{["Food", "Sightseeing", "Activities", "Shopping", "Stay"].map(x => <option key={x}>{x}</option>)}</select><label>Amount</label><input type="number" min="0" value={activity.amount} onChange={e => setActivity({ ...activity, amount: e.target.value })} required /><label>Notes</label><textarea value={activity.notes} onChange={e => setActivity({ ...activity, notes: e.target.value })} /><div className="activityButtons"><button type="button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit">Save Activity</button></div></form></div>}
        </>
    );
}
