"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const [department, setDepartment] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/admin/users/${params.id}`);

        const permissionsResponse = await fetch(`/api/admin/users/${params.id}/permissions`);

        const departmentResponse = await fetch(`/api/admin/users/${params.id}/department`);




        if (!userResponse.ok) {
          console.error("Failed to fetch user data:", userResponse.statusText);
          throw new Error("Failed to fetch user data");
        }
        if (!permissionsResponse.ok) {
          console.error(
            "Failed to fetch permissions:",
            permissionsResponse.statusText
          );
          throw new Error("Failed to fetch permissions");
        }

        if (!departmentResponse.ok){
          throw new Error("Failed to fetch department");
        }

        const userData = await userResponse.json();
        const permissionData = await permissionsResponse.json();
        const departmentData = await departmentResponse.json();

        console.log("User data fetched successfully:", userData); // Debug log
        console.log("Permissions fetched successfully:", permissionData); // Debug log

        setUser(userData);
        setPermissions(permissionData.permissions);
        setSelectedPermissions(userData.permissions.map((p: any) => p.id));
        setDepartment(departmentData.department?.name || "No department");
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}/permissions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: params.id,
          permissions: selectedPermissions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save permissions");
      }

      router.refresh();
    } catch (err) {
      console.error("Error saving permissions:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl mb-4 font-semibold">User Details</h2>
      <div className="mb-4">
        <p className="text-lg"><strong>ID:</strong> {user.id}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>Department:</strong> {department}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Permissions:</h3>
        <div className="space-y-3">
          {permissions.map((permission: any) => (
            <div key={permission.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
                className="mr-2"
              />
              <label>{permission.name}</label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Permissions
      </button>
    </div>
  );
}
