import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';  

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const accountId = url.searchParams.get('accountId'); // Retrieve accountId from query string

    if (!accountId || typeof accountId !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing accountId' }, { status: 400 });
    }

    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        transactions: {
          orderBy: {
            createdAt: 'desc', 
          },
        },
      },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      balance: account.balance,
      transactions: account.transactions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch account details' }, { status: 500 });
  }
}
