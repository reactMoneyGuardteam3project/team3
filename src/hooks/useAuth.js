import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' });
      setIsLoggedIn(true);
    }
  }, []);

  return { user, isLoggedIn };
};
