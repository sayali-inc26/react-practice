import { useState } from "react";

import { useDispatch } from "react-redux";
import { addHabit } from "../redux/habitSlice";
import { createHabit } from "../services/habbit";

import focus from "../assets/add_habbit_screen/focus.png";
import growth from "../assets/add_habbit_screen/growth.png";
import code from "../assets/add_habbit_screen/code.png";
import water from "../assets/add_habbit_screen/water.png";
import exercise from "../assets/add_habbit_screen/exercise.png";
import book from "../assets/add_habbit_screen/book.png";
import dumbbell from "../assets/add_habbit_screen/dumbbell.png";
import lightning from "../assets/add_habbit_screen/lightning.png";

import "./AddHabitScreen.css";

function AddHabitScreen() {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("HEALTH");
  const [frequency, setFrequency] = useState("Daily");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [startDate, setStartDate] = useState("2023-10-24");
  const [selectedIcon, setSelectedIcon] = useState(0);

  const dispatch = useDispatch();

  const icons = [
    { display: lightning, value: "PERFORMANCE" },
    { display: dumbbell, value: "FITNESS" },
    { display: book, value: "BOOK" },
    { display: exercise, value: "WELLNESS" },
    { display: water, value: "HEALTH" },
    { display: code, value: "PRODUCTIVITY" },
    { display: growth, value: "PERSONAL_GROWTH" },
    { display: focus, value: "FOCUS" }
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!habitName.trim()) {
      alert("Please enter habit name");
      return;
    }

    const [hour, minute] = reminderTime.split(":");

    const habitData = {
      name: habitName,
      description: description,

      category: category,

      frequency: frequency.toUpperCase(),

      reminderTime: {
        hour: Number(hour),
        minute: Number(minute),
        second: 0,
        nano: 0
      },

      startDate: startDate,

      icon: icons[selectedIcon].value,

      targetValue: 0,

      unit: "string"
    };

    console.log("Sending habit:", habitData);

    try {

      const response = await createHabit(habitData);

      console.log("Habit API response:", response);

      // Store created habit in Redux
      dispatch(addHabit(response.data));

      alert("Habit created successfully!");

      window.history.back();

    } catch (error) {

      console.error("Habit creation failed:", error);

      alert(error.message);
    }
  };

  return (
    <div className="habit-page">
      <div className="habit-header">
        <h1>Add New Habit</h1>
        <p>
          Define the parameters of your next evolution. Clarity is the first
          step toward mastery.
        </p>
      </div>

      <form className="habit-card" onSubmit={handleSubmit}>
        {/* Habit Name */}
        <div className="form-group full-width">
          <label htmlFor="habitName">HABIT NAME</label>

          <input
            id="habitName"
            type="text"
            placeholder="e.g., Deep Work Session"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label htmlFor="description">DESCRIPTION</label>

          <textarea
            id="description"
            placeholder="Define the core objective of this habit..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">CATEGORY</label>

          <div className="select-wrapper">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="HEALTH">Health</option>
              <option value="MINDSET">Mindset</option>
              <option value="FITNESS">Fitness</option>
              <option value="WELLNESS">Wellness</option>
              <option value="PRODUCTIVITY">Productivity</option>
              <option value="FOCUS">Focus</option>
              <option value="PERFORMANCE">Performance</option>
              <option value="PERSONAL_GROWTH">Personal Growth</option>
              <option value="STUDY">Study</option>
            </select>

            <span className="select-arrow">⌄</span>
          </div>
        </div>

        {/* Frequency */}
        <div className="form-group">
          <label>FREQUENCY</label>

          <div className="frequency-options">
            {["Daily", "Weekly", "Custom"].map((item) => (
              <button
                type="button"
                key={item}
                className={`frequency-btn ${frequency === item ? "active" : ""
                  }`}
                onClick={() => setFrequency(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Reminder */}
        <div className="form-group">
          <label htmlFor="reminderTime">REMINDER TIME</label>

          <div className="input-with-icon">
            <input
              id="reminderTime"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />

            <span>◷</span>
          </div>
        </div>

        {/* Start Date */}
        <div className="form-group">
          <label htmlFor="startDate">START DATE</label>

          <div className="input-with-icon">
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <span>▣</span>
          </div>
        </div>

        {/* Icons */}
        <div className="form-group full-width">
          <label>VISUAL ANCHOR ICON</label>

          <div className="icon-selector">
            {icons.map((icon, index) => (
              <button
                type="button"
                key={index}
                className={`icon-btn ${selectedIcon === index ? "selected" : ""
                  }`}
                onClick={() => setSelectedIcon(index)}
              >
                <img
                  src={icon.display}
                  alt={icon.value}
                  className="icon-image"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions full-width">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button type="submit" className="save-btn">
            Save Habit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHabitScreen;