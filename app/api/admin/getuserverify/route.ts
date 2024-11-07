import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();

    try {
        // Find users with at least one object in the 'register' array having 'status' as 'complete'
        const users = await User.find({
            register: { $elemMatch: { status: "processing" } },
        });

        // Map users to extract 'register' arrays containing only 'complete' statuses
        const usersInfo = users.map(user => {
            const completeRegisters = user.register.filter(entry => entry.status === "processing");
            return {
                firstname:user.firstname,
                lastname:user.lastname,
                _id: user._id,
                completeRegisters,
            };
        });

        return NextResponse.json({ ok: 'Fetch successful', data: usersInfo }, { status: 200 });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
    }
};
