import { db } from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {id: string}}){
    const userId = await params.id;

    try {
        // Fetch department information for the user
        const user = await db.user.findUnique({
            where: {id: userId},
            select: {
                department: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            }
        });

        if (!user || !user.department){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({department: user.department}, {status: 200});
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch department" }, { status: 500 });
    }

}