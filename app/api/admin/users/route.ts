import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { hashPassword } from "@/lib/hash";
import { checkIsAdmin } from "@/hooks/use-is-admin";


//Them nguoi dung
export async function POST(req: Request) {
    if (!(await checkIsAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    }
    const { emails, departmentId, role, permissions } = await req.json();

    if (!emails || !Array.isArray(emails) || !departmentId || !role){
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

     // Tạo người dùng với các quyền đã chọn
    const users = await Promise.all(emails.map(async (email: string) => ({
        email,
        password: await hashPassword(`${email}@`),
        departmentId,
        role,
      
    }))
    );
    try {
        // Create users in the database
        const createdUsers = await db.user.createMany({
            data: users,
            skipDuplicates: true, // Skip duplicate emails
        });

        // Assign permissions to the created users
        for (const email of emails) {
            const user = await db.user.findUnique({
                where: { email },
            });

            if (user && permissions && permissions.length > 0) {
                for (const permissionId of permissions) {
                    await db.userPermission.create({
                        data: {
                            userId: user.id,
                            permissionId,
                        },
                    });
                }
            }
        }
        return NextResponse.json({ success: "Users created" }, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create users" }, { status: 500 });
      }
}

//Lay danh sach nguoi dung
export async function GET() {
    if (!(await checkIsAdmin())) {
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

