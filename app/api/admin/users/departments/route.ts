import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const departments = await db.departments.findMany({
            select: {id: true, name: true},
        });
        return NextResponse.json({ departments }, { status: 200 });

    }catch(error){
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
    }
}