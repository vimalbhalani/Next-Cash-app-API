import User from "@/models/User"; // Import your User model
import dbConnect from "@/lib/dbConnect"; // Import your DB connection function
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { phonenumber, loginid, id } = await request.json();
  
  // Ensure our incoming data is valid
  if (!phonenumber || !loginid || !id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Find the existing user document by id
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's codenumber and status in the "register" array
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, 'register.phonenumber': phonenumber }, // search condition includes phonenumber in register array
      { 
        $set: {
          'register.$.loginid': loginid, // Update the codenumber of the found index
        }
      }, // update operation
      { new: true } // options: return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Phone number not found in register' }, { status: 404 });
    }

    return NextResponse.json({ ok: 'User updated', user: updatedUser }, { status: 200 });
    
  } catch (err: any) {
    // Handle errors during DB operations
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
