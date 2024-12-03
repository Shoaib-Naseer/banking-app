import { useState, useEffect } from 'react';

const useBalance = (key: string) => {
  const [balance, setBalance] = useState<number | null>(() => {
    const savedBalance = localStorage.getItem(key);
    return savedBalance ? JSON.parse(savedBalance) : null;
  });

  useEffect(() => {
    if (balance !== null) {
      localStorage.setItem(key, JSON.stringify(balance));
    }
  }, [balance, key]);

  return [balance, setBalance] as const;
};

export default useBalance;
