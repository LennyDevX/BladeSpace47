import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import GameOverview from './components/GameOverview';
import InGameEconomy from './components/InGameEconomy';
import Marketplace from './components/Marketplace';
import GameMode from './components/GameMode';
import LoadingScreen from './components/LoadingScreen';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  const [showGameMode, setShowGameMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentGameView, setCurrentGameView] = useState<'home' | 'missions' | 'profile' | 'starship' | 'wallet'>('home');
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const toggleGameMode = () => {
    setShowGameMode(!showGameMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData({ uid: user.uid, ...userData });
            localStorage.setItem('userData', JSON.stringify({ uid: user.uid, ...userData }));
          } else {
            const newUserData = {
              uid: user.uid,
              email: user.email,
              points: 5000,
              artifacts: 0,
              playerLevel: 1,
              experience: 0,
              missionsCompleted: 0,
              ownedShips: []
            };
            await setDoc(userDocRef, newUserData);
            setUserData(newUserData);
            localStorage.setItem('userData', JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error al obtener los datos del usuario. Por favor, intenta de nuevo.');
        }
      } else {
        setUserData(null);
        localStorage.removeItem('userData');
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (loading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  if (!domLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar
        toggleGameMode={toggleGameMode}
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
        isGameMode={showGameMode}
        setCurrentGameView={setCurrentGameView}
        user={user}
        setUser={setUser}
      />
      
      <main className="container mx-auto px-4 py-20 transition-all duration-300 ease-in-out">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        {showGameMode ? (
          user && userData ? (
            <GameMode currentView={currentGameView} userData={userData} setUserData={setUserData} />
          ) : (
            <div className="text-center mt-10">Por favor, inicia sesión para acceder al modo de juego.</div>
          )
        ) : (
          <>
            <GameOverview />
            <InGameEconomy />
            <Marketplace />
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-center py-4 mt-8">
        <p>&copy; 2024 Space.NFT. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;