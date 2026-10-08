export const submitOnboarding = async (
    goals,
    targetHabitCount,
    preferredReminderTime
) => {

    const onboardingData = {
        goals: goals,
        targetHabitCount: targetHabitCount,
        preferredReminderTime: preferredReminderTime
    };

    const token = localStorage.getItem("token");

    if (!token) {

        throw new Error(
            "Authentication token not found. Please login again."
        );
    }

    try {

        const response = await fetch(
            "http://192.168.1.81:8085/api/onboarding",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-Session-Token": token
                },

                body: JSON.stringify(onboardingData)
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(
                data?.message || "Failed to submit onboarding"
            );
        }

        console.log("Onboarding completed:", data);

        return data;

    } catch (error) {

        console.error("Onboarding Error:", error);

        throw error;
    }
};