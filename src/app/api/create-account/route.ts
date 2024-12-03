import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; 

function generateIBAN(): string {
  const countryCode = 'DE';
  const bankCode = '50020222';
  const accountNumber = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0'); 
  const checksum = '00'; 
  const iban = countryCode + checksum + bankCode + accountNumber;
  return iban;
}



export async function POST(request: Request) {
  try {
    const { userId } = await request.json(); 

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const existingAccount = await prisma.account.findUnique({
      where: {
        userId, 
      },
    });

    if (existingAccount) {
      return NextResponse.json(existingAccount);
    }

    const initialBalance = 0; 
    const iban = generateIBAN(); 
    console.log({iban})

    const newAccount = await prisma.account.create({
      data: {
        userId,
        balance: initialBalance,  
        iban: iban,             
      },
    });

    return NextResponse.json(newAccount);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
