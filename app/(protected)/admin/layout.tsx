"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { cn } from "@/lib/utils"; // Utility for conditional class names

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-30 inset-y-0 left-0 bg-gray-800 text-white w-[18%] text-overflow:ellipsis transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0"
        )}
      >
         <div className="p-2">
      <h3 className="text-2xl font-semibold mb-6 text-center">Admin Panel</h3>
      <nav className="space-y-4">
        <div>
          <a href="/admin" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m0 6l-3 3m3-3l3 3" />
            </svg>
            Dashboard
          </a>
        </div>
        <div className="group">
          <button className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-700 rounded">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              Quản lý người dùng
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="hidden group-hover:block ml-6 space-y-2">
            <a href="/admin/users-add" className="block py-2 px-4 hover:bg-gray-700 rounded">Tạo tài khoản</a>
            <a href="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Danh sách người dùng</a>
          </div>
        </div>
        <div className="group">
          <button className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-700 rounded">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tính năng khác
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="hidden group-hover:block ml-6 space-y-2">
            <a href="/admin/demo" className="block py-2 px-4 hover:bg-gray-700 rounded">Demo</a>
            <a href="/admin/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">Cài đặt</a>
            <a href="/admin/analytics" className="block py-2 px-4 hover:bg-gray-700 rounded">Phân tích</a>
          </div>
        </div>
      </nav>
    </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <Button
            variant="outline"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </Button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </header>

        {/* Main */}
        <main className="flex-1 p-6 items-center justify-center bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
