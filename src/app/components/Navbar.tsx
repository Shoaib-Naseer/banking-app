'use client'
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import useBalance from '../hooks/useBalance';

const Navbar = () => {
  const [balance] = useBalance('balance');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bank App
        </Typography>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          Account Balance: ${balance !== null ? balance : 'Loading...'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
