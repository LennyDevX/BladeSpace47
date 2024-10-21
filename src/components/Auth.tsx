import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FaTimes } from 'react-icons/fa';

interface AuthProps {
  setUser: (user: any) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ setUser, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let user;
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
      } else {
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres.');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
      }

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ uid: user.uid, email: user.email, ...userData });
        } else {
          const newUser = {
            uid: user.uid,
            email: user.email,
            points: 5000,
            artifacts: 0,
            playerLevel: 1,
            experience: 0,
            missionsCompleted: 0,
            ownedShips: []
          };
          await setDoc(userDocRef, newUser);
          setUser(newUser);
        }
        onClose();
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está en uso. Por favor, intenta con otro.');
      } else if (error.code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido. Por favor, verifica e intenta de nuevo.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Correo electrónico o contraseña incorrectos. Por favor, intenta de nuevo.');
      } else {
        setError('Ocurrió un error durante la autenticación. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <div className="relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-white">
        <FaTimes />
      </button>
      <form onSubmit={handleAuth} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '¿Necesitas una cuenta?' : '¿Ya tienes una cuenta?'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;