import { useEffect, useState } from 'react'
import './App.css'
import { requestFCMToken } from './utils/firebaseUtils';

function App() {
   const [fcmtoken, setFcmtoken] = useState(null);

   useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmtoken(token);
        console.log(token);
      } catch (error) {
        console.error("Error getting FCM token :", error);
      }
    }
    fetchFCMToken();
   })

  return (
    <>
      
    </>
  )
}

export default App
