// App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import { requestFCMToken, listenToForegroundMessages } from './utils/firebaseUtils';

function App() {
  const [fcmToken, setFcmToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initFCM = async () => {
      try {
        // Manually register the service worker
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        // Pass registration to requestFCMToken
        const token = await requestFCMToken(registration);
        setFcmToken(token);
      } catch (err) {
        setError(err.message || "Failed to get FCM token");
      } finally {
        setLoading(false);
      }
    };

    initFCM();

    // Listen for foreground notifications
    listenToForegroundMessages((payload) => {
      console.log("Foreground message received:", payload);
      alert(`🔔 New Notification: ${payload.notification?.title}`);
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Firebase Push Notification Demo 🚀</h1>
      {loading ? (
        <p>Requesting permission...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>❌ {error}</p>
      ) : (
        <>
          <h3>✅ FCM Token:</h3>
          <code style={{ wordBreak: 'break-all' }}>{fcmToken}</code>
        </>
      )}
    </div>
  );
}

export default App;