
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { amount, senderUserId, recipientIban } = await request.json();

  if (!amount || amount <= 0 || !senderUserId || !recipientIban) {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    if (!/^([A-Z]{2}[0-9]{2})([A-Z0-9]{4}){2,30}$/.test(recipientIban)) {
      return NextResponse.json({ error: 'Invalid IBAN format' }, { status: 400 });
    }

    const currentBalance = 1000; // Replace with actual balance query
    const newBalance = currentBalance - amount;

    // Save the transaction to the database
    const transaction = await prisma.transaction.create({
      data: {
        type: 'transfer',
        amount,
        balance: newBalance,
        userId: senderUserId,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error while transferring' }, { status: 500 });
  }
}
