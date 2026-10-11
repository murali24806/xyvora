import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma/client';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const { title, imageUrl } = await request.json();

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        title,
        imageUrl,
      },
    });

    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json([], { status: 200 });
    }
    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.warn("Portfolio database not reachable, returning default items:", error);
    return NextResponse.json([], { status: 200 });
  }
}
