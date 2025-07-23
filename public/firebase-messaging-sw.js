import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAV9FLYGgpCvttltbxeJPrUBGfSP1UShXA",
  authDomain: "fir-push-notification-e0645.firebaseapp.com",
  projectId: "fir-push-notification-e0645",
  storageBucket: "fir-push-notification-e0645.firebasestorage.app",
  messagingSenderId: "946261790727",
  appId: "1:946261790727:web:bdbda1c7b01d4447409aa2",
  measurementId: "G-0SL0L3ZZES"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Teacher Portal Alert';
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});