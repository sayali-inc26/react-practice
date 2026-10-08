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


export const getHabits = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Authentication token not found. Please login again.");
    }

    const response = await fetch(API_URL, {
        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to fetch habits"
        );
    }

    return data;
};

export const completeHabit = async (habitId) => {

    const token = localStorage.getItem("authToken");

    const response = await fetch(
        `http://192.168.1.81:8085/api/habits/${habitId}/complete`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log("==========================================COMPLETE RESPONSE :",response);
    

    if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
            errorText || "Failed to complete habit"
        );
    }

    return await response.json();
};