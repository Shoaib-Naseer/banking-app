import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';


export async function POST(request: Request) {
  let { accountId, amount } = await request.json();
  amount = Number(amount)

  // Fetch the account
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 });
  }

  // Update balance
  const newBalance = account.balance + amount;

  // Create transaction
  await prisma.transaction.create({
    data: {
      accountId,
      type: 'DEPOSIT',
      amount,
      balance: newBalance,
    },
  });

  // Update account balance
  const updatedAccount = await prisma.account.update({
    where: { id: accountId },
    data: { balance: newBalance },
  });

  return NextResponse.json(updatedAccount);
}
