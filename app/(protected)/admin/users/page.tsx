"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserManagement(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/admin/users");
            const data = await response.json();
            setUsers(data.formattedUsers);
            setLoading(false);
            
        };
        fetchUsers();
    }, []);

    if(loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-2xl mb-4">User Management</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Permissions</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) =>(
                        <tr key={user.id}>
                            <td className="border border-gray-300 p-2">{user.id}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">
                                {user.permissions.length > 0
                                ? user.permissions.join(", ")
                                : "No permissions"
                                }
                                </td>
                            <td className="border border-gray-300 p-2">
                                <Link href={`/admin/users/${user.id}`} className="text-blue-600">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}