import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { token, paymentgateway } = await request.json();
    await dbConnect();

    try {
        // Find the user by the token
        const user = await User.findOne({ token });

        if (user) {
            // Check if paymentgateway is "none"
            // Loop through the withdrawal array
            const existingEntryIndex = user.withdrawal.findIndex(entry => entry.paymentgateway === "none");

            if (existingEntryIndex !== -1) {
                // Update existing entry if found
                user.withdrawal[existingEntryIndex].paymentgateway = paymentgateway;

            } else {
                // If not found, push a new withdrawal entry
                user.withdrawal.push({
                    paymentgateway: paymentgateway
                });

            }

            try {
                // Save the updated user document
                await user.save();

                return NextResponse.json({
                    ok: 'Withdrawal processed successfully',
                }, { status: 200 }); // Return success with a 200 status
            } catch (err: any) {
                return NextResponse.json({ error: 'Failed to save updated user' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 }); // Return not found
        }
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};