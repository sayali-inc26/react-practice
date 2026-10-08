// import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setHabits, setLoading, setError, updateHabit } from "../redux/habitSlice";
import { getHabits, completeHabit } from "../services/habbit";

import "./MyHabitScreen.css";

// const habits = [
//   {
//     id: 1,
//     icon:health_icon ,
//     category: "HEALTH",
//     categoryType: "health",
//     name: "Hydrate",
//     streak: 12,
//     completed: false,
//   },
//   {
//     id: 2,
//     icon: mindset,
//     category: "MINDSET",
//     categoryType: "mindset",
//     name: "Read 20 Pages",
//     streak: 5,
//     completed: false,
//   },
//   {
//     id: 3,
//     icon:  fitness ,
//     category: "FITNESS",
//     categoryType: "fitness",
//     name: "Morning Gym",
//     streak: 0,
//     completed: false,
//   },
//   {
//     id: 4,
//     icon:  wellness ,
//     category: "WELLNESS",
//     categoryType: "wellness",
//     name: "Meditation",
//     streak: 21,
//     completed: true,
//   },
//   {
//     id: 5,
//     icon:  productivity ,
//     category: "PRODUCTIVITY",
//     categoryType: "productivity",
//     name: "Daily Coding",
//     streak: 8,
//     completed: false,
//   },
// ];



function MyHabitScreen() {

  const dispatch = useDispatch();

  const habits = useSelector(
    (state) => state.habits.habits
  );

  const loading = useSelector(
    (state) => state.habits.loading
  );

  const error = useSelector(
    (state) => state.habits.error
  );


  useEffect(() => {

    const fetchHabits = async () => {

      try {

        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await getHabits();

        console.log("Habits API response:", response);

        dispatch(setHabits(response.data));

      } catch (error) {

        console.error("Get habits error:", error);

        dispatch(setError(error.message));

      } finally {

        dispatch(setLoading(false));

      }
    };

    fetchHabits();

  }, [dispatch]);

  // const handleComplete = async (habit) => {

  //   console.log("FULL HABIT:", habit);
  //   console.log("HABIT ID:", habit.id);
  //   if (habit.completedToday) {
  //     return;
  //   }

  //   try {

  //     console.log("Completing habit:", habit.name);

  //     const response = await completeHabit(habit.id);

  //     console.log("Complete habit response:", response);

  //     dispatch(updateHabit(response.data));

  //   } catch (error) {

  //     console.error(
  //       "Complete habit error:",
  //       error
  //     );

  //     alert("Failed to complete habit");
  //   }
  // };


  const handleComplete = async (habit) => {

    if (habit.completedToday) {
      return;
    }

    try {

      console.log("Completing habit:", habit.id);

      const response = await completeHabit(habit.id);

      console.log("Backend updated habit:", response);

      dispatch(updateHabit(response.data));

    } catch (error) {

      console.error("Complete habit error:", error);

      alert(error.message);
    }
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
                  {habit.streakDays} day{habit.streakDays !== 1 ? "s" : ""} streak
                </span>
              </div>

              <button
                className={`complete-button ${habit.completedToday ? "completed-button" : ""
                  }`}
                onClick={() => handleComplete(habit)}
              >
                {
                  habit.completedToday ? (
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