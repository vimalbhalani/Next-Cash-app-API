import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong secret in production

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();
  await dbConnect();

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, send an error response
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    // Check if the user has been verified
    if (user.verifystatus !== "yes") {
      return NextResponse.json({ error: 'User not verified' }, { status: 403 });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

    // Save the token to the user record in the database
    user.token = token;
    await user.save();

    // Create a response payload
    const responsePayload = {
      userId: user._id,
      name: user.firstname,
      email: user.email,
      role: user.role,
      token: user.token, // Include the generated token in the response
    };

    // Send success response with user data and token
    return NextResponse.json({ ok: 'Sign-in successful', user: responsePayload }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'An error occurred while signing in' }, { status: 500 });
  }
};
