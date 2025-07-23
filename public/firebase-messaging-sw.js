// public/firebase-messaging-sw.js

// Load Firebase scripts via CDN
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAV9FLYGgpCvttltbxeJPrUBGfSP1UShXA",
  authDomain: "fir-push-notification-e0645.firebaseapp.com",
  projectId: "fir-push-notification-e0645",
  storageBucket: "fir-push-notification-e0645.firebasestorage.app",
  messagingSenderId: "946261790727",
  appId: "1:946261790727:web:bdbda1c7b01d4447409aa2",
  measurementId: "G-0SL0L3ZZES"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});