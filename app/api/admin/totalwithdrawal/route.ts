import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  try {
    // Aggregate to calculate the total amount from the deposit array
    const users = await User.aggregate([
      {
        $project: {
          firstname:1,
          lastname:1,
          totalAmount: { $sum: "$withdrawal.amount" } // Sum the amount in the deposit array
        }
      },
      {
        $sort: { totalAmount: -1 } // Sort by the total amount in descending order
      }
    ]);

    return NextResponse.json({ ok: 'Fetch successful', data: users }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
  }
};