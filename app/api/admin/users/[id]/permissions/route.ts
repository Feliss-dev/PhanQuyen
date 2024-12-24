import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

async function isAdmin() {
    const role = await currentRole();
    return role === UserRole.ADMIN;
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id;

    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        // Fetch permissions specific to the user
        const permissions = await db.permission.findMany({
            where: {  },
        });
        return NextResponse.json({ permissions }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PATCH(req: Request){
    if(!(await isAdmin())){
        return NextResponse.json({error: "Unauthorized"}, {status: 403});
    }
  
    const {userId, permissions} = await req.json();
  
    if(!userId || !Array.isArray(permissions)){
        return NextResponse.json({error: "Invalid input"}, {status: 400});
    }
  
    try {
        //Xoa cac quyen hien tai
        await db.userPermission.deleteMany({
            where: {
                userId,
            },
        });
  
        //Them quyen moi
        const permissionRecords = permissions.map((permissionId: string) => ({
            userId,
            permissionId,
        
        }));
        
        await db.userPermission.createMany({
            data: permissionRecords,
        });
        return NextResponse.json({success: "Permissions updated"}, {status: 200});
    }catch(err){
        console.error(err);
        return NextResponse.json({error: "Failed to update permissions"}, {status: 500});
    }
  
  }