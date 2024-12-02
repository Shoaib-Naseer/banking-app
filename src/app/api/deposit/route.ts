import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { amount, userId } = await request.json(); 

  if (!amount || amount <= 0 || !userId) {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    const currentBalance = 1000;
    const newBalance = currentBalance + amount;

    // Save the transaction to the database
    const transaction = await prisma.transaction.create({
      data: {
        type: 'deposit',
        amount,
        balance: newBalance,
        userId, // Link the transaction to the user
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error while depositing' }, { status: 500 });
  }
}
