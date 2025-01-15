import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Deals from '@/lib/models/Deals'; // Updated model name

// PUT handler: Update a specific deal
export async function PUT(request, { params }) {
  const { id } = params;
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

  try {
    await connectToDatabase();
    const updatedDeal = await Deals.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );
    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error('Error updating deal:', error);
    return NextResponse.json({ message: 'Failed to update deal' }, { status: 500 });
  }
}

// DELETE handler: Delete a specific deal
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    await Deals.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return NextResponse.json({ message: 'Failed to delete deal' }, { status: 500 });
  }
}

// GET handler: Retrieve a specific deal
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const deal = await Deals.findById(id);

    if (!deal) {
      return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json({ message: 'Failed to fetch deal' }, { status: 500 });
  }
}
