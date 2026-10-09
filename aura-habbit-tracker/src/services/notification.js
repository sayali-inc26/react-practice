const API_URL = "http://192.168.1.81:8085/api";

const getToken = () => {
    return localStorage.getItem("authToken");
};


// export const getNotifications = async () => {

//     const token = getToken();

//     const response = await fetch(`${API_URL}/notifications`, {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//         }
//     });

//     if (!response.ok) {
//         throw new Error("Failed to fetch notifications");
//     }

//     return await response.json();
// };


export const getNotifications = async () => {
    const response = await fetch(`${API_URL}/notifications`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();

    console.log("Notifications API response:", data);

    // Handle an array returned directly or wrapped in an object
    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data.data)) {
        return data.data;
    }

    if (Array.isArray(data.notifications)) {
        return data.notifications;
    }

    return [];
};



export const getUnreadCount = async () => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/notifications/unread-count`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch unread notification count");
    }

    return await response.json();
};

export const markNotificationAsRead = async (id) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/notifications/${id}/read`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark notification as read");
    }

    return await response.json();
};


export const markAllNotificationsAsRead = async () => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/notifications/read-all`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
    }

    return await response.json();
};

export const connectNotificationStream = async (onNotification, signal) => {

    const token = getToken();

    try {

        const response = await fetch(
            `${API_URL}/notifications/stream`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "text/event-stream"
                },signal
            }
        );

        if (!response.ok) {
            throw new Error("Failed to connect notification stream");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (true) {

            const { value, done } = await reader.read();

            if (done) {
                break;
            }

            buffer += decoder.decode(value, {
                stream: true
            });

            const events = buffer.split("\n\n");

            buffer = events.pop();

            events.forEach((event) => {

                if (!event.trim()) {
                    return;
                }

                const dataLine = event
                    .split("\n")
                    .find((line) => line.startsWith("data:"));

                if (!dataLine) {
                    return;
                }

                const data = dataLine
                    .replace("data:", "")
                    .trim();

                try {

                    const notification = JSON.parse(data);

                    onNotification(notification);

                } catch (error) {

                    console.error(
                        "Invalid notification data:",
                        data
                    );
                }
            });
        }

    } catch (error) {

        console.error(
            "Notification stream error:",
            error
        );

        throw error;
    }
};