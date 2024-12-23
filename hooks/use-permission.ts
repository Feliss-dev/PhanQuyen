import { useSession } from "next-auth/react";


type PermissionCheck = (permission: string) => boolean;

export const userPermission = (): PermissionCheck => {
    const { data: session } = useSession();

    return (permission: string) => {
        if (!session?.user?.permissions) return false;
        return session.user.permissions.includes(permission);
    };
};

//DEMO OF USAGE
// import { usePermission } from "../hooks/usePermission";

// const SomeComponent = () => {
//   const hasPermission = usePermission();

//   if (!hasPermission("EDIT_POST")) {
//     return <p>Bạn không có quyền chỉnh sửa bài viết.</p>;
//   }

//   return <p>Bạn có quyền chỉnh sửa bài viết.</p>;
// };