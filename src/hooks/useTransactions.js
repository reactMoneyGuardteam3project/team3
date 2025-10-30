import { useState, useEffect } from 'react';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions([]);
  }, []);

  return { transactions };
};
