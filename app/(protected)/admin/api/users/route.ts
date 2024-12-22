import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { error } from "console";
import { hashPassword } from "@/lib/hash";

async function isAdmin() {
    const role = await currentRole();
    return role === UserRole.ADMIN;
}
//Them nguoi dung
export async function POST(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    }
    const { emails } = await req.json();
    const users = await Promise.all(emails.map(async (email: string) => ({
        email,
        password: await hashPassword(`${email}@`),
    }))
    );
    await db.user.createMany({
        data: users
    });
    return NextResponse.json({ sucess: "Users created" }, { status: 201 });
}

//Lay danh sach nguoi dung
export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    }

    const users = await db.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
}


