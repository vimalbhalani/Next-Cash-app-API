import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { phonenumber, paymentstatus, amount } = await request.json();
    await dbConnect();

    try {
        // Find the user by the phone number
        const user = await User.findOne({ phonenumber });

        if (user) {
            // Check if the amount exists in user.deposit
            const depositEntry = user.deposit.find(dep => dep.amount === amount);

            if (depositEntry) {
                // Update the payment status of the found deposit entry
                depositEntry.paymentstatus = paymentstatus;

                try {
                    // Save the updated user document
                    await user.save();

                    return NextResponse.json({
                        ok: 'Deposit updated successfully',
                    }, { status: 200 }); // Return success with a 200 status
                } catch (err: any) {
                    return NextResponse.json({ error: 'Failed to save updated user' }, { status: 500 });
                }
            } else {
                return NextResponse.json({ error: 'No deposit found with the given amount' }, { status: 404 }); // Return not found
            }
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 }); // Return not found
        }
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};