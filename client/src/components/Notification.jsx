import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.email) {
        setLoggedInUserEmail(userData.email);
      }
    } catch (err) {
      console.error("Invalid user data in localStorage");
    }
  }, []);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/notifications/${loggedInUserEmail}`
        );
        setNotifications(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUserEmail) {
      fetchNotifications();
    }
  }, [loggedInUserEmail]);

  const handleResponse = async (senderEmail, isAccepted) => {
   
    try {
      setLoading(true);
  
      console.log("Sender:", senderEmail);
console.log("Receiver:", loggedInUserEmail);

      await axios.put("http://localhost:5000/api/notifications/respond", {
        from: senderEmail,
        to: loggedInUserEmail,
        isAccepted
      });
  

      const res = await axios.get(
        `http://localhost:5000/api/notifications/${loggedInUserEmail}`
      );
      setNotifications(res.data);
   // Assuming the sender is the logged-in user
console.log("Sender Email:", senderEmail);

      setError(null);
    } catch (error) {
      console.error("Error responding to notification", error);
      setError("Failed to process your response. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-poppins p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notifications
            </h1>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p>{error}</p>
              </div>
            )}

            {loading && notifications.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 mt-4 text-lg">No notifications yet</p>
                <p className="text-gray-400">You'll see notifications here when you receive them</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {notifications.map((notification) => (
                  
                  <li
                  
                    key={notification._id}
                    
                    className={`border-l-4 ${
                      notification.status === "accepted"
                        ? "border-green-500 bg-green-50"
                        : notification.status === "rejected"
                        ? "border-red-500 bg-red-50"
                        : "border-purple-500 bg-purple-50"
                    } p-4 rounded-lg shadow-sm transition-all duration-200`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          <span className="text-purple-600">{notification.from}</span>{" "}
                          wants to swap skills with you!
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            className="px-3 py-1 bg-purple-500 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center"
                            onClick={() => handleResponse(notification.from , true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Accept
                          </button>
                          
                        </div>
                    </div>                
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
