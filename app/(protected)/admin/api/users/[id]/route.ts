import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

async function isAdmin() {
    const role = await currentRole();
    return role === UserRole.ADMIN;
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;

    try {
        const user = await db.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        console.error("Error fetching user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

//Xoa nguoi dung
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  
    const { id } = params;
  
    try {
      const user = await db.user.findUnique({ where: { id } });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      await db.user.delete({ where: { id } });
      return NextResponse.json({ success: "User deleted" }, { status: 200 });
    } catch (err) {
      console.error("Error deleting user:", err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
