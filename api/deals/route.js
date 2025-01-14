import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Deals from '@/lib/models/Deals'; // Updated model name

// GET handler: Retrieve all deals from the database
export async function GET() {
  try {
    await connectToDatabase();
    const deals = await Deals.find({});
    return NextResponse.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json({ message: 'Failed to fetch deals' }, { status: 500 });
  }
}

// POST handler: Add a new deal
export async function POST(request) {
  try {
    const {
      name,
      industry,
      businessType,
      amount,
      title,
      description,
      website,
      email,
      phone,
      address,
      business,
      status,
      startDate,
      endDate,
      month,
      year,
    } = await request.json();

    await connectToDatabase();

    const newDeal = await Deals.create({
      name,
      industry,
      businessType,
      amount,
      title,
      description,
      website,
      email,
      phone,
      address,
      business,
      status,
      startDate,
      endDate,
      month,
      year,
    });

    return NextResponse.json(newDeal);
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json({ message: 'Failed to create deal' }, { status: 500 });
  }
}
