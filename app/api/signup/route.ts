import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { firstname, lastname, email, password } = await request.json();
  await dbConnect();
  const user = await User.findOne({ email: email });
  const rawIp = request.headers.get("x-forwarded-for") || request.ip;
  const ip = rawIp.split(",")[0].replace(/^.*:ffff:/, "");

  try {
    if (!user) {
      // Find the maximum code from the users in the database
      const lastUser = await User.find({}).sort({ tag: -1 }).limit(1);
      let newCode = 1000; // Start from 1000

      if (lastUser.length > 0 && lastUser[0].tag >= 1000) {
        newCode = lastUser[0].tag + 1; // Increment from the last code
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        ip, // You might want to save the IP address to your database if needed
        tag: newCode // Save the unique code to the user
      });
      
      try {
        await newUser.save();
        
        return NextResponse.json({ 
          ok: 'User created', 
          email,
        }, { status: 201 });

      } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'User Already Exists', ip }, { status: 409 }); // Change status to 409 for conflict
    }
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 }); // Return the error message
  }
};
