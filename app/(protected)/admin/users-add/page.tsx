"use client";

import { Button } from "@/components/ui/button";

import { Permission, UserRole } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { permission } from "process";

interface Department {
  id: string;
  name: string;
}

const UserAdd = () => {
  const [emails, setEmails] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]); // Danh sach quyen
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(UserRole.USER);

  useEffect(() => {
    const fetchDepartmentsAndPermissions = async () => {
      try {
        const departmentResponse = await fetch("/api/admin/users/departments");
        const departmentData = await departmentResponse.json();
        if (departmentData.error) throw new Error(departmentData.error);
        setDepartments(departmentData.departments);

        const permissionResponse = await fetch(
          "/api/admin/users/permissions-many"
        ); // API để lấy quyền
        const permissionData = await permissionResponse.json();
        if (permissionData.error) throw new Error(permissionData.error);
        setPermissions(permissionData.permissions);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch departments");
      }
    };
    fetchDepartmentsAndPermissions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!selectedDepartment) {
      setError("Please select a department");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: emails.split(",").map((e) => e.trim()),
          departmentId: selectedDepartment,
          role: selectedRole,
          permissions: selectedPermissions, // Gửi quyền đã chọn
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setSuccess("Users added successfully");
      setEmails("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 font-sans">
      <Card className="w-[70%] h-[70%] max-w-4xl max-h-screen overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Bulk User Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter emails separated by commas. E.g: email@email.com, email2@email2.com"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="mb-4"
          />
          <Select
            onValueChange={setSelectedDepartment}
            value={selectedDepartment}
          >
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedRole} value={selectedRole}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="INSPECTOR">Inspector</SelectItem>
            </SelectContent>
          </Select>

          {/* Hien thi checkbox cho quyen */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Select Permissions
            </h3>
            <div className="space-y-3 mt-2">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={permission.id}
                    value={permission.id}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPermissions([
                          ...selectedPermissions,
                          permission.id,
                        ]);
                      } else {
                        setSelectedPermissions(
                          selectedPermissions.filter(
                            (id) => id !== permission.id
                          )
                        );
                      }
                    }}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={permission.id}
                    className="text-sm font-medium text-gray-700"
                  >
                    {permission.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full mt-5">
            {loading ? "Adding..." : "Add Users"}
          </Button>
          {success && (
            <Alert className="mt-4" variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAdd;
