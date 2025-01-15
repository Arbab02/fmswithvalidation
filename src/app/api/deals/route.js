import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Deals from '@/lib/models/Deals'; // Updated model name

export async function GET(req) {
  await dbConnect();
  try {
    const deals = await Deals.find({});
    return new Response(JSON.stringify({ success: true, data: deals }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const deal = await Deals.create(body);
    return new Response(JSON.stringify({ success: true, data: deal }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}