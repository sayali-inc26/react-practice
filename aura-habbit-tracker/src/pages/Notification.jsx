import { useEffect, useState } from "react";

import {getNotifications, markNotificationAsRead, markAllNotificationsAsRead} from "../services/notification";

import "./Notification.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadNotifications();

    }, []);


    const handleRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true
                        }
                        : notification
                )
            );

        } catch (error) {

            console.error(
                "Failed to mark notification:",
                error
            );

        }
    };


    const handleMarkAllRead = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true
                }))
            );

        } catch (error) {

            console.error(
                "Failed to mark all notifications:",
                error
            );

        }
    };


    if (loading) {
        return (
            <div className="notifications-page">
                <h1>Notifications</h1>
                <p>Loading notifications...</p>
            </div>
        );
    }


    return (
        <div className="notifications-page">

            <div className="notifications-header">

                <div>
                    <h1>Notifications</h1>
                    <p>
                        Stay updated with your habits and progress.
                    </p>
                </div>

                <button
                    onClick={handleMarkAllRead}
                    className="mark-all-btn"
                >
                    Mark all as read
                </button>

            </div>


            <div className="notifications-list">

                {notifications.length === 0 ? (

                    <div className="empty-notifications">
                        <span>🔔</span>
                        <h3>No notifications</h3>
                        <p>
                            You're all caught up!
                        </p>
                    </div>

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className={`notification-card ${
                                notification.read
                                    ? "read"
                                    : "unread"
                            }`}
                            onClick={() =>
                                handleRead(notification.id)
                            }
                        >

                            <div className="notification-card-icon">
                                🔔
                            </div>

                            <div className="notification-card-content">

                                <h3>
                                    {notification.title}
                                </h3>

                                <p>
                                    {notification.message}
                                </p>

                                <span>
                                    {notification.createdAt}
                                </span>

                            </div>

                            {!notification.read && (
                                <div className="unread-dot"></div>
                            )}

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default Notifications;