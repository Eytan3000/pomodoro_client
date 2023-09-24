// import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// // import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     // measurementId:REACT_APP_FIREBASE_MEASUREMENT_ID
// };


// const app = initializeApp(firebaseConfig);

// // const analytics = getAnalytics(app);
// export const auth = getAuth();
// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAfN4bobkB9Wq7sUiXqA1Wd44J60YGSnQ",
  authDomain: "pomodoro-a8bad.firebaseapp.com",
  projectId: "pomodoro-a8bad",
  storageBucket: "pomodoro-a8bad.appspot.com",
  messagingSenderId: "668638820258",
  appId: "1:668638820258:web:c393c2c0a9e1a6039764fb",
  measurementId: "G-WZPDDS0NNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;