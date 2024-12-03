import React, { useEffect, useState } from "react";
import { depositMoney, fetchAccountDetails, transferMoney, withdrawMoney } from '../api/api';
import { CircularProgress, Button } from '@mui/material';
import TableWrapper from './TableWrapper';
import Modal from './Modal';
import useBalance from '../hooks/useBalance';

const AccountPage = ({ accountId }: { accountId: string }) => {
  const [balance, setBalance] = useBalance('balance');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);
  const [amount, setAmount] = useState<number | string>('');
  const [iban, setIban] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetails = async () => {
    if (accountId) {
      setIsLoading(true);
      const data = await fetchAccountDetails(accountId);
      setBalance(data.balance);
      setTransactions(data.transactions);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [accountId]);

  const handleModalOpen = (type: 'deposit' | 'withdraw' | 'transfer') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAmount('');
    setIban('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (modalType === 'deposit') {
        await depositMoney(accountId, amount);
      } else if (modalType === 'withdraw') {
        await withdrawMoney(accountId, amount);
      } else if (modalType === 'transfer') {
        await transferMoney(accountId, amount, iban);
      }
      await fetchDetails(); 
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);   
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        {/* Buttons */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleModalOpen('deposit')}
            disabled={isLoading}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleModalOpen('withdraw')}
            disabled={isLoading}
          >
            Withdraw
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleModalOpen('transfer')}
            disabled={isLoading}
          >
            Transfer
          </Button>
        </div>

      
          <TableWrapper
            columns={['type', 'date', 'amount']}
            data={transactions.map((txn) => ({
              type: txn.type,
              date: formatDate(txn.createdAt),
              amount: `$${txn.amount.toFixed(2)}`, 
            }))}
          />
        
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          type={modalType}
          amount={amount}
          setAmount={setAmount}
          iban={iban}
          setIban={setIban}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AccountPage;
