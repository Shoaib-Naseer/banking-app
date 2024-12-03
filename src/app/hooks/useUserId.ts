import { useState, useEffect } from "react";

// Function to generate a new userId if none exists
const generateUserId = () => `user_${Date.now()}`;

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      const newUserId = generateUserId();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }
  }, []);

  return userId;
};
