import { initializeApp } from "firebase/app";
// import getAuth from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const db = getFirestore();
const colRef = collection(db, "books");

getDocs(colRef)
  .then((snapshot) => {
    let catalogue = [];
    snapshot.docs.forEach((doc) => {
      catalogue.push({ ...doc.data(), id: doc.id });
    });
    console.log(catalogue);
  })
  .catch((err) => {
    console.log(err);
  });

// export { app, auth };
export default app;
