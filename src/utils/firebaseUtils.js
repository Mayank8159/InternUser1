import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAV9FLYGgpCvttltbxeJPrUBGfSP1UShXA",
  authDomain: "fir-push-notification-e0645.firebaseapp.com",
  projectId: "fir-push-notification-e0645",
  storageBucket: "fir-push-notification-e0645.firebasestorage.app",
  messagingSenderId: "946261790727",
  appId: "1:946261790727:web:bdbda1c7b01d4447409aa2",
  measurementId: "G-0SL0L3ZZES"
};

const vapidKey = "BFeowsCw5OjToBWFpGf1kFH9d_q_X9Zw8lSQoYT_n7Jf5UVi17v0M3OrzlqjuwhQPtMDjvhaj5-CxZtWRjpe3tM";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    return Notification.requestPermission().then((permission) => {
        if(permission === 'granted'){
            return getToken(messaging, { vapidKey })
        }else{
            throw new Error("Notification not granted!");
        }
        
    })
    .catch((err) => {
        console.error('Error getting FCM token:',err);
        throw err;
    })
}