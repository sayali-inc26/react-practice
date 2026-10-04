import { useState } from "react";
import "./AddHabitScreen.css";

function AddHabitScreen() {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Health");
  const [frequency, setFrequency] = useState("Daily");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [startDate, setStartDate] = useState("2023-10-24");
  const [selectedIcon, setSelectedIcon] = useState(0);

  const icons = ["⚡", "🏃", "📖", "♟", "◉", "</>", "✣", "♙"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const habit = {
      habitName,
      description,
      category,
      frequency,
      reminderTime,
      startDate,
      icon: icons[selectedIcon],
    };

    console.log("New Habit:", habit);
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
              <option>Health</option>
              <option>Fitness</option>
              <option>Work</option>
              <option>Learning</option>
              <option>Personal</option>
              <option>Finance</option>
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
                className={`frequency-btn ${
                  frequency === item ? "active" : ""
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
                className={`icon-btn ${
                  selectedIcon === index ? "selected" : ""
                }`}
                onClick={() => setSelectedIcon(index)}
              >
                {icon}
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