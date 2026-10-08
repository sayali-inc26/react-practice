const API_URL = "http://192.168.1.81:8085/api";

const getToken = () => {
    return localStorage.getItem("habitToken");
};


export const getNotifications = async () => {

    const token = getToken();

    const response = await fetch(`${API_URL}/notifications`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    return await response.json();
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

export const connectNotificationStream = async (onNotification) => {

    const token = getToken();

    try {

        const response = await fetch(
            `${API_URL}/notifications/stream`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "text/event-stream"
                }
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