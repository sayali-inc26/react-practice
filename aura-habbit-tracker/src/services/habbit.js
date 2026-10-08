const API_URL = "http://192.168.1.81:8085/api/habits";

export const createHabit = async (habitData) => {

    const token = localStorage.getItem("authToken");

    console.log("Habit API token:", token);

    if (!token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(habitData)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to create habit"
        );
    }

    return data;
};