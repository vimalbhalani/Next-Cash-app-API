import User from "@/models/User"; // Import your User model
import dbConnect from "@/lib/dbConnect"; // Import your DB connection function
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { phonenumber, passwordcode } = await request.json();
  
  // Ensure our incoming data is valid
  if (!phonenumber || !passwordcode) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Use findOneAndUpdate to find user by token and update regitype and phonenumber
    const user = await User.findOneAndUpdate(
      { phonenumber }, // search condition
      { passwordcode }, // update operation
      { new: true } // options: return the updated document
    );

    if (user) {
      return NextResponse.json({ ok: 'User updated', user }, { status: 200 });
    } else {    
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (err: any) {
    // Handle errors during DB operations
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};