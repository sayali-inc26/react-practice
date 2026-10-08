import React from "react";

import health_icon from "../assets/myhabits_screen/health_icon.png"
import mindset from "../assets/myhabits_screen/mindset_icon.png"
import fitness from "../assets/myhabits_screen/fitness_icon.png"
import wellness from "../assets/myhabits_screen/wellness_icon.png"
import productivity from "../assets/myhabits_screen/productivity_icon.png"

import "./MyHabitScreen.css";

const habits = [
  {
    id: 1,
    icon:health_icon ,
    category: "HEALTH",
    categoryType: "health",
    name: "Hydrate",
    streak: 12,
    completed: false,
  },
  {
    id: 2,
    icon: mindset,
    category: "MINDSET",
    categoryType: "mindset",
    name: "Read 20 Pages",
    streak: 5,
    completed: false,
  },
  {
    id: 3,
    icon:  fitness ,
    category: "FITNESS",
    categoryType: "fitness",
    name: "Morning Gym",
    streak: 0,
    completed: false,
  },
  {
    id: 4,
    icon:  wellness ,
    category: "WELLNESS",
    categoryType: "wellness",
    name: "Meditation",
    streak: 21,
    completed: true,
  },
  {
    id: 5,
    icon:  productivity ,
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


      <div className="habits-heading">
        <div>
          <h1>My Habits</h1>

          <p>
            Manage your daily rituals and track your journey towards
            consistent mastery.
          </p>
        </div>


        <button className="category-filter">
          <span className="filter-icon">☰</span>
          <span>All Categories</span>
        </button>
      </div>



      <div className="habits-grid">
        {
          habits.map((habit) => (
            <div
              className="main-card"
              key={habit.id}
            >


              <div className="habit-card-top">

                <div className="habit-icon">
                  <img src={habit.icon} alt="" />
                </div>

                <button
                  className="edit-habit"
                  onClick={() => handleEdit(habit)}
                  aria-label={`Edit ${habit.name}`}
                >
                  ✎
                </button>

              </div>



              <div className={`habit-category ${habit.categoryType}`}>
                {habit.category}
              </div>

              <h2>{habit.name}</h2>

              <div className="habit-streak">
                <span className="fire-icon">🔥</span>

                <span>
                  {habit.streak} day{habit.streak !== 1 ? "s" : ""} streak
                </span>
              </div>

              <button
                className={`complete-button ${habit.completed ? "completed-button" : ""
                  }`}
                onClick={() => handleComplete(habit)}
              >
                {
                habit.completed ? (
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