import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');

  // Fetch transactions for the account
  const transactions = await prisma.transaction.findMany({
    where: { accountId },
    orderBy: { createdAt: 'desc' },
  });

  if (!transactions) {
    return NextResponse.json({ error: 'No transactions found' }, { status: 404 });
  }

  return NextResponse.json(transactions);
}
