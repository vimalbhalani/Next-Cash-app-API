import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  try {
    const users = await User.aggregate([
      {
        $project: {
          firstname: 1,
          lastname: 1,
          totalAmount: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$withdrawal",
                    as: "withdrawalItem",
                    cond: { $eq: ["$$withdrawalItem.paymentstatus", "complete"] } // Filter by paymentstatus
                  }
                },
                as: "filteredWithdrawal",
                in: "$$filteredWithdrawal.amount" // Sum the amounts of filtered withdrawal items
              }
            }
          }
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
