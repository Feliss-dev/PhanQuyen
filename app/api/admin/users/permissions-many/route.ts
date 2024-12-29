import { checkIsAdmin } from "@/hooks/use-is-admin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { permission } from "process";

//Lấy danh sách quyền
export async function GET(){
    if(!(await checkIsAdmin())){
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
        }
    });

    const  permissions = await db.permission.findMany({

    });

    const formattedUsers = users.map((user) => ({
        ...user,
        permissions: user.permissions.map((p) => p.permission.name),
        department: user.department.name || "N/A",
    }));

    return NextResponse.json({ formattedUsers, permissions }, { status: 200 });
}