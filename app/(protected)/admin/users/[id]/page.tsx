"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/admin/users/${params.id}`);

        const permissionsResponse = await fetch(`/api/admin/users/${params.id}/permissions`);


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

        const userData = await userResponse.json();
        const permissionData = await permissionsResponse.json();

        console.log("User data fetched successfully:", userData); // Debug log
        console.log("Permissions fetched successfully:", permissionData); // Debug log

        setUser(userData);
        setPermissions(permissionData.permissions);
        setSelectedPermissions(userData.permissions.map((p: any) => p.id));
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
    <div>
      <h2 className="text-2xl mb-4">User Details</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Permissions:</p>
      <div>
        {permissions.map((permission: any) => (
          <div key={permission.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              />
              {permission.name}
            </label>
          </div>
        ))}
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
