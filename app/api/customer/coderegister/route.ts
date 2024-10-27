import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { token, phonenumber, codenumber, status } = await request.json();
  
  // Validate input
  if (!phonenumber || !codenumber || !status || !token) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Find the existing user document by token
    const existingUser = await User.findOne({ token: token });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's codenumber and status in the "register" array
    const updatedUser = await User.findOneAndUpdate(
      {
        token: token,
        'register.phonenumber': phonenumber,
        'register.codenumber': codenumber
      },
      { 
        $set: {
          'register.$.status': status // Update the status of the matched index
        }
      },
      { new: true } // options to return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'Phone number not found in register' }, { status: 404 });
    }

    return NextResponse.json({ ok: 'User updated', user: updatedUser }, { status: 200 });
    
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Database error: ", err);
    return NextResponse.json({ error: 'An error occurred while updating user.' }, { status: 500 });
  }
};
