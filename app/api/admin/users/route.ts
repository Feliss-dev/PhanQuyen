import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
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
    const { emails, departmentId, role } = await req.json();

    if (!emails || !Array.isArray(emails) || !departmentId || !role){
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const users = await Promise.all(emails.map(async (email: string) => ({
        email,
        password: await hashPassword(`${email}@`),
        departmentId,
        role,
       
    }))
    );
    try {
        await db.user.createMany({
          data: users,
          skipDuplicates: true, // Bỏ qua email trùng lặp
        });
        return NextResponse.json({ success: "Users created" }, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create users" }, { status: 500 });
      }
}

//Lay danh sach nguoi dung
export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    }

    const users = await db.user.findMany({
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
            department: true, // Lay thong tin don vi lien ketket
        },
    });
    const formattedUsers = users.map((user) => ({
        ...user,
        permissions: user.permissions.map((p) => p.permission.name),
        department: user.department.name || "N/A",
    }))
    return NextResponse.json({ formattedUsers }, { status: 200 });
}

