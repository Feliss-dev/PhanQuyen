"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/admin/api/users/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleDelete = async () => {
    try {
        const response = await fetch(`/admin/api/users/${params.id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      router.push("/admin/users");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };
  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">User Details</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete User
      </button>
    </div>
  );
}
