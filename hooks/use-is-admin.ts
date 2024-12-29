// helpers/checkIsAdmin.ts
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function checkIsAdmin() {
  const role = await currentRole();
  return role === UserRole.ADMIN;
}
