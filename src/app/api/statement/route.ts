
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  const userId = request.headers.get('user-id'); // Assume user ID is passed in headers

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(userId) },
      orderBy: {
        createdAt: 'desc', // Sort by date in descending order
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching statement' }, { status: 500 });
  }
}
