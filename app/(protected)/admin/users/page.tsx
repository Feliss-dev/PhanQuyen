"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead ,TableHeader, TableRow } from '@/components/ui/table'; // Import các thành phần ShadcnUI
import { Button } from "@/components/ui/button"; // ShadcnUI Button
export default function UserManagement(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    

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

    //Phan trang
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Tính toán số trang
     const totalPages = Math.ceil(users.length / itemsPerPage);
    return (
        <div className="p-4">
        <h2 className="text-2xl mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.permissions.length > 0
                      ? user.permissions.join(", ")
                      : "No permissions"}
                  </TableCell>
                  <TableCell>{user.department || "No department"}</TableCell>
                  <TableCell>
                    <Link href={`/admin/users/${user.id}`} className="text-blue-600">
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  
        {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </Button>
          <span>{currentPage} / {totalPages}</span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      </div>
    )
}