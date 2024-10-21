import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApDeyV4-EUn8NomARZ_hakVcEE1QN0TIw",
  authDomain: "space-nft-6acba.firebaseapp.com",
  projectId: "space-nft-6acba",
  storageBucket: "space-nft-6acba.appspot.com",
  messagingSenderId: "745606745925",
  appId: "1:745606745925:web:2d214093b5f98798c6f82c",
  measurementId: "G-MVZT6980WD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Asegúrate de que las colecciones 'users' y 'missions' existan en Firestore
// Puedes crear las colecciones manualmente en la consola de Firebase si aún no existen

// También, asegúrate de que las reglas de seguridad de Firestore permitan lectura y escritura
// para usuarios autenticados. Aquí hay un ejemplo de reglas que puedes usar:

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /missions/{missionId} {
      allow read, write: if request.auth != null;
    }
  }
}
*/