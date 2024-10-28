import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    // Attempt to parse the JSON body
    let requestData;
    try {
        requestData = await request.json();
    } catch (err) {
        return NextResponse.json({ error: 'Failed to parse JSON' }, { status: 400 });
    }

    const { id, phonenumber } = requestData;

    // Ensure required fields are present
    if (!id || !phonenumber) {
        return NextResponse.json({ error: 'Missing required fields: id or phonenumber' }, { status: 400 });
    }
    
    await dbConnect();

    try {
        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Find the register using the provided phonenumber
        const registerIndex = user.register.findIndex(regi => regi.phonenumber === phonenumber);

        // Check if the register was found
        if (registerIndex === -1) {
            return NextResponse.json({ error: 'No register found with the given phonenumber' }, { status: 404 });
        }

        // Delete the found register entry
        user.register.splice(registerIndex, 1);

        // Save the user document
        const updatedUser = await user.save();

        return NextResponse.json({
            ok: 'Register deleted successfully',
            user: updatedUser // Include the updated user if needed
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 });
    }
};
