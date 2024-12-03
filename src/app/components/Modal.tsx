'use client';

import React from 'react';
import { CircularProgress } from '@mui/material';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

type ModalProps = {
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: string;
  setAmount: (amount: string) => void;
  iban: string;
  isLoading: boolean,
  setIban: (iban: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const Modal = ({ type, amount, setAmount, iban, isLoading,setIban, onSubmit, onClose }: ModalProps) => {
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Money`;

  return (
    <Dialog open={true} onClose={onClose}>
        {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please enter the {type === 'transfer' ? 'amount and IBAN' : 'amount'} to {type}.
        </Typography>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {type === 'transfer' && (
          <TextField
            label="IBAN"
            type="text"
            fullWidth
            margin="normal"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
