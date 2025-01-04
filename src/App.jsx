// src/App.jsx
import { useState, useEffect } from 'react';
import { useColorMode, useToast } from '@chakra-ui/react';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import GridBackground from './components/layout/GridBackground';
import { account } from './lib/appwrite';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const user = await account.get();
      setLoggedInUser(user);
    } catch (error) {
      console.log('No active session');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <GridBackground>
      {loggedInUser ? (
        <Dashboard
          user={loggedInUser}
          onLogout={() => setLoggedInUser(null)}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      ) : (
        <Auth onLogin={setLoggedInUser} colorMode={colorMode} toggleColorMode={toggleColorMode} />
      )}
    </GridBackground>
  );
};

export default App;
