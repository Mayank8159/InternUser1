// firebaseUtils.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV9FLYGgpCvttltbxeJPrUBGfSP1UShXA",
  authDomain: "fir-push-notification-e0645.firebaseapp.com",
  projectId: "fir-push-notification-e0645",
  storageBucket: "fir-push-notification-e0645.firebasestorage.app",
  messagingSenderId: "946261790727",
  appId: "1:946261790727:web:bdbda1c7b01d4447409aa2",
  measurementId: "G-0SL0L3ZZES"
};

// VAPID key for web push authorization
const vapidKey = "BFeowsCw5OjToBWFpGf1kFH9d_q_X9Zw8lSQoYT_n7Jf5UVi17v0M3OrzlqjuwhQPtMDjvhaj5-CxZtWRjpe3tM";

// Initialize Firebase and Messaging
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * Request permission and retrieve FCM token using a registered Service Worker
 * @param {ServiceWorkerRegistration} swRegistration
 * @returns {Promise<string>} FCM token
 */
export const requestFCMToken = async (swRegistration) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Notification permission not granted");
    }

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swRegistration
    });

    if (!token) {
      throw new Error("Failed to generate FCM token");
    }

    return token;
  } catch (err) {
    console.error("Error retrieving FCM token:", err);
    throw err;
  }
};

/**
 * Listen for foreground messages
 * @param {Function} callback
 */
export const listenToForegroundMessages = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    if (typeof callback === "function") {
      callback(payload);
    }
  });
};

// Optional export
export { messaging };

