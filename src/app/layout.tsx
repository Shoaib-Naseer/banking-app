
import React from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Container } from "@mui/material";
import "./globals.css"; 
import Navbar from "./components/Navbar";


export const metadata = {
  title: "Bank App",
  description: "A simple responsive banking application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Navbar />
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
