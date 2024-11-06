import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  const frtoken = request.headers.get("Authorization")?.split(" ")[1]; // Get the token from 'Authorization' header

  if (!frtoken) {
    return NextResponse.json({ error: 'Authorization token is required' }, { status: 401 });
  }

  try {
    // Fetch users based on token
    const users = await User.find({ token: frtoken });

    // Convert mongoose documents to plain JS objects
    const usersInfo = users.map(user => user.toObject());
    
    // Filter and extract register arrays of users that meet the criteria
    const filteredRegisters = usersInfo
      .map(user => ({
        userId: user._id, // Include user ID if needed
        register: user.register.filter(item => item.loginid !== "none" && item.passwordcode !== "none")
      }))
      .filter(user => user.register.length > 0); // Keep users with non-empty register arrays

    return NextResponse.json({ ok: 'Fetch successful', data: filteredRegisters }, { status: 200 });
    
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    } else if (err.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'Token expired' }, { status: 403 });
    }

    return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
  }
};
