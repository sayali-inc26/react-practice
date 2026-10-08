import { useEffect } from "react";

import "./CustomNotification.css";

function CustomNotification({ notification, onClose }) {

    useEffect(() => {

        if (!notification) {
            return;
        }

        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };

    }, [notification, onClose]);


    if (!notification) {
        return null;
    }


    return (
        <div className="custom-notification">

            <div className="notification-icon">
                🔔
            </div>

            <div className="notification-content">

                <h4>
                    {notification.title || "New Notification"}
                </h4>

                <p>
                    {notification.message}
                </p>

            </div>

            <button
                className="notification-close"
                onClick={onClose}
            >
                ×
            </button>

        </div>
    );
}

export default CustomNotification;