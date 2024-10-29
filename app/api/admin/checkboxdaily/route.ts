import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    // Attempt to parse the JSON body
    let requestData;
    try {
        requestData = await request.json();
    } catch (err) {
        return NextResponse.json({ error: 'Failed to parse JSON' }, { status: 400 });
    }

    const { id, isChecked, date } = requestData;

    // Ensure required fields are present
    if (!id || !date) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    await dbConnect();

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Log the deposits for debugging
        const depositIndex = user.deposit.findIndex(dep => {
            const depDate = new Date(dep.date).getTime();
            const requestDate = new Date(date).getTime();
            return depDate === requestDate;
        });

        if (depositIndex === -1) {
            return NextResponse.json({ error: 'No deposit found with the given date' }, { status: 404 });
        }

        // If `isChecked` is not provided, set `dailyChecked` to false
        user.deposit[depositIndex].dailyChecked = isChecked !== undefined ? isChecked : false;

        // Save the user document
        const updatedUser = await user.save();

        return NextResponse.json({
            ok: 'Deposit updated successfully',
            user: updatedUser  // Include the updated user if needed
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
    }
};
