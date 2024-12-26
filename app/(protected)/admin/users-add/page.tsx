"use client";


import { Button } from "@/components/ui/button"; 

import { UserRole } from "@prisma/client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea }  from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" ;
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
}

const UserAdd = () => {
  const [emails, setEmails] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const[success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(UserRole.USER);

  useEffect(() => {
    const fetchDepartments = async () => {
      try{
        const response = await fetch("/api/admin/users/departments");
        const data = await response.json();
        if(data.error) throw new Error(data.error);

        setDepartments(data.departments);
      }catch(error){
        console.error(error);
        toast.error("Failed to fetch departments");
      };
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!selectedDepartment){
      setError("Please select a department");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          emails: emails.split(",").map((e) => e.trim()),
          departmentId: selectedDepartment,
          role: selectedRole,
        }),
      });

      const result = await response.json();
      if(result.error) throw new Error(result.error);

      setSuccess("Users added successfully");
      setEmails("");

    }catch (err: any) {
      setError(err.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };
 
  
  

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
    <Card className="w-[70%] h-[70%] max-w-4xl max-h-screen overflow-y-auto">
      <CardHeader>
        <CardTitle>Bulk User Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter emails separated by commas"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="mb-4"
        />
        <Select onValueChange={setSelectedDepartment} value={selectedDepartment}>
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
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
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
