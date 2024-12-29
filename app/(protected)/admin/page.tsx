"use client";

import { admin } from "@/actions/admin";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  // useEffect(() => {
  //   // Fetch data for the dashboard (e.g., user count, report count)
  //   const fetchDashboardData = async () => {
  //     try {
  //       const userResponse = await admin.getUserCount();
  //       const reportResponse = await admin.getReportCount();
  //       const taskResponse = await admin.getPendingTasks();

  //       setUserCount(userResponse.count);
  //       setReportCount(reportResponse.count);
  //       setPendingTasks(taskResponse.count);
  //     } catch (error) {
  //       toast.error("Failed to fetch dashboard data.");
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  // if (!session || session.user.role !== UserRole.ADMIN) {
  //   // Redirect non-admin users
  //   redirect("/unauthorized");
  // }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard Quản Lý</h1>

      {/* Thẻ thông tin tổng quan */}
      <div className="grid grid-cols-3 gap-6">
        {/* Số lượng người dùng */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Số lượng người dùng</h2>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{userCount}</p>
            <Button onClick={() => router.push("/admin/users")} className="mt-4">Quản lý người dùng</Button>
          </CardContent>
        </Card>

        {/* Số lượng báo cáo */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Số lượng báo cáo</h2>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{reportCount}</p>
            <Button onClick={() => router.push("/admin/reports")} className="mt-4">Xem báo cáo</Button>
          </CardContent>
        </Card>

        {/* Số lượng tác vụ chờ xử lý */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Tác vụ chờ xử lý</h2>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{pendingTasks}</p>
            <Button onClick={() => router.push("/admin/tasks")} className="mt-4">Xử lý tác vụ</Button>
          </CardContent>
        </Card>
      </div>

      {/* Hiển thị thông báo thành công */}
      <div className="mt-6">
        <FormSuccess message="Dashboard đã được tải thành công!" />
      </div>
    </div>
  );
};

export default AdminPage;
