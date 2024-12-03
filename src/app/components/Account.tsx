'use client';

import { useEffect, useState } from 'react';
import { fetchAccountId } from '../api/api';  
import { useUserId } from "../hooks/useUserId"; 
import AccountPage from './AccountPage'; 

import { CircularProgress } from '@mui/material';

const Account = () => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const userId = useUserId();

  useEffect(() => {
    if (userId) {
      fetchAccountId(userId)
        .then((data) => setAccountId(data.id))  
        .catch((error) => console.error('Error fetching accountId:', error));
    }
  }, [userId]);

  if (!accountId) {
    return  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <CircularProgress />
  </div>
  }

  return <AccountPage accountId={accountId} />;
};

export default Account;
