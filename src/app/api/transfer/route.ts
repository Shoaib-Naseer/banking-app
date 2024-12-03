import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { validateIBAN } from 'ibantools'; 


export async function POST(request: Request) {
  let { fromAccountId, toIBAN, amount } = await request.json();
  amount = Number(amount)

 
  if (!validateIBAN(toIBAN)) {
    return NextResponse.json({ error: 'Invalid IBAN' }, { status: 400 });
  }

  const fromAccount = await prisma.account.findUnique({
    where: { id: fromAccountId },
  });

  if (!fromAccount) {
    return NextResponse.json({ error: 'Sender account not found' }, { status: 404 });
  }

  if (fromAccount.balance < amount) {
    return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
  }

  const toAccount = await prisma.account.findUnique({
    where: { iban: toIBAN },
  });

  if (!toAccount) {
    return NextResponse.json({ error: 'Receiver account not found' }, { status: 404 });
  }

  // Update balances
  const fromNewBalance = fromAccount.balance - amount;
  const toNewBalance = toAccount.balance + amount;

  // Create transactions
  await prisma.transaction.create({
    data: {
      accountId: fromAccountId,
      type: 'TRANSFER',
      amount: -amount,
      balance: fromNewBalance,
    },
  });

  await prisma.transaction.create({
    data: {
      accountId: toAccount.id,
      type: 'TRANSFER',
      amount: amount,
      balance: toNewBalance,
    },
  });

  const updatedFromAccount = await prisma.account.update({
    where: { id: fromAccountId },
    data: { balance: fromNewBalance },
  });

  const updatedToAccount = await prisma.account.update({
    where: { id: toAccount.id },
    data: { balance: toNewBalance },
  });

  return NextResponse.json({ from: updatedFromAccount, to: updatedToAccount });
}
