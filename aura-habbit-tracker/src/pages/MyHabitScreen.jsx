import React from "react";
import "./MyHabitScreen.css";

const habits = [
  {
    id: 1,
    icon: "💧",
    category: "HEALTH",
    categoryType: "health",
    name: "Hydrate",
    streak: 12,
    completed: false,
  },
  {
    id: 2,
    icon: "▣",
    category: "MINDSET",
    categoryType: "mindset",
    name: "Read 20 Pages",
    streak: 5,
    completed: false,
  },
  {
    id: 3,
    icon: "🏃",
    category: "FITNESS",
    categoryType: "fitness",
    name: "Morning Gym",
    streak: 0,
    completed: false,
  },
  {
    id: 4,
    icon: "🧘",
    category: "WELLNESS",
    categoryType: "wellness",
    name: "Meditation",
    streak: 21,
    completed: true,
  },
  {
    id: 5,
    icon: "</>",
    category: "PRODUCTIVITY",
    categoryType: "productivity",
    name: "Daily Coding",
    streak: 8,
    completed: false,
  },
];

function MyHabitScreen() {
  const handleComplete = (habit) => {
    console.log("Complete habit:", habit.name);
  };

  const handleEdit = (habit) => {
    console.log("Edit habit:", habit.name);
  };

  const handleAddHabit = () => {
    console.log("Add new habit");
  };

  return (
    <main className="my-habits-main">

      {/* Page Heading */}
      <div className="habits-heading">
        <div>
          <h1>My Habits</h1>

          <p>
            Manage your daily rituals and track your journey towards
            consistent mastery.
          </p>
        </div>

        {/* Category Filter */}
        <button className="category-filter">
          <span className="filter-icon">☰</span>
          <span>All Categories</span>
        </button>
      </div>


      {/* Habit Grid */}
      <div className="habits-grid">

        {habits.map((habit) => (
          <div
            className={`habit-card ${
              habit.completed ? "habit-completed" : ""
            }`}
            key={habit.id}
          >

            {/* Top Row */}
            <div className="habit-card-top">

              <div className="habit-icon">
                {habit.icon}
              </div>

              <button
                className="edit-habit"
                onClick={() => handleEdit(habit)}
                aria-label={`Edit ${habit.name}`}
              >
                ✎
              </button>

            </div>


            {/* Category */}
            <div className={`habit-category ${habit.categoryType}`}>
              {habit.category}
            </div>


            {/* Habit Name */}
            <h2>{habit.name}</h2>


            {/* Streak */}
            <div className="habit-streak">
              <span className="fire-icon">♨</span>

              <span>
                {habit.streak} day{habit.streak !== 1 ? "s" : ""} streak
              </span>
            </div>


            {/* Complete Button */}
            <button
              className={`complete-button ${
                habit.completed ? "completed-button" : ""
              }`}
              onClick={() => handleComplete(habit)}
            >
              {habit.completed ? (
                <>
                  <span className="completed-check">✹</span>
                  Done for Today
                </>
              ) : (
                <>
                  <span className="check-circle">✓</span>
                  Complete
                </>
              )}
            </button>

          </div>
        ))}


        {/* Add Habit Card */}
        <button
          className="add-habit-card"
          onClick={handleAddHabit}
        >
          <div className="add-habit-icon">
            +
          </div>

          <h2>Add Habit</h2>

          <p>Build your aura</p>
        </button>

      </div>
    </main>
  );
}

export default MyHabitScreen;