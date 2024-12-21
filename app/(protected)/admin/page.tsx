"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const[success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/admin/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({emails: emails.split(",").map((e) => e.trim())

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
    <div>
      <h2 className="text-2xl mb-4">
          Bulk User Creation
      </h2>
      {/* Sua thanh command thanh dau enter hoac dau cach */}
      <textarea 
        className="w-full p-2 border rounded mb-4"
        rows={5}
        placeholder="Enter emails separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}

      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
          {loading ? "Adding..." : "Add Users"}

      </button>
      {success && <p className="text-green-600 mt-2">{success}</p> }
      {error && <p className="text-red-600 mt-2">{error}</p>}

    
    </div>
  );
};

export default AdminPage;
