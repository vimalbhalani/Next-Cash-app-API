import User from "@/models/User"; // Import your User model
import dbConnect from "@/lib/dbConnect"; // Import your DB connection function
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { token, codenumber, status } = await request.json();
  
  // Ensure our incoming data is valid
  if (!token || !codenumber) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  // Connect to the database
  await dbConnect();
  
  try {
    // Find the user by phonenumber
    const user = await User.findOne({ token });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Compare the provided codenumber with the user's stored codenumber
    if (user.codenumber !== codenumber) {
      return NextResponse.json({ error: 'Invalid codenumber' }, { status: 403 }); // Forbidden
    }
    
    // Since codenumber is valid, proceed to update the user
    user.status = status; // Update the status (you can update other fields too if needed)
    await user.save(); // Save the updated user
    
    return NextResponse.json({ ok: 'User updated', user }, { status: 200 });
  
  } catch (err: any) {
    // Handle errors during DB operations
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
