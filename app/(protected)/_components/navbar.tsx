"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FaExclamationTriangle } from "react-icons/fa";

import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const isAdmin = session?.data?.user.role === "ADMIN";

  const menuOptions = {
    ĐGCSĐT: [
      { title: "Option 1", href: "/dgcsdt/option1" },
      { title: "Option 2", href: "/dgcsdt/option2" },
    ],
    "Kho dữ liệu": [
      { title: "Option 1", href: "/khodulieu/option1" },
      { title: "Option 2", href: "/khodulieu/option2" },
    ],
    "Mạng lưới DBCL": [
      { title: "Option 1", href: "/mangluoi/option1" },
      { title: "Option 2", href: "/mangluoi/option2" },
    ],
    "Danh mục": [
      { title: "Option 1", href: "/danhmuc/option1" },
      { title: "Option 2", href: "/danhmuc/option2" },
    ],
    "Giới thiệu": [
      { title: "About Us", href: "/gioithieu/about" },
      { title: "Contact", href: "/gioithieu/contact" },
    ],
  };

  const adminOptions = [
    {title: "Admin Dashboard", href: "/admin"},
    {title: "Add users", href: "/admin/users"},
    {title: "Users Management", href: "/admin/users"},
  
  ];

  return (
    <nav className="sticky inset-x-0 top-0 z-50 bg-slate-50 shadow-sm dark:bg-gray-950/90 border border-gray-200 dark:border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <FaExclamationTriangle className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
            {Object.entries(menuOptions).map(([tabName, options]) => (
              <DropdownMenu key={tabName} >
                <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium flex items-center transition-colors hover:bg-gray-100 rounded-md relative groupgroup">
                  {tabName}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </DropdownMenuTrigger >
                <DropdownMenuContent className="w-56 animate-fade-in">
                  {options.map((option) => (
                    <DropdownMenuItem asChild key={option.title}>
                      <Link
                        href={option.href}
                        className="block w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-accent-foreground"
                      >
                        {option.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

              {/* Admin tab */}
              {isAdmin && (
                <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium flex">
                  Admin
                  <ChevronDownIcon className="h-3 w-3 mt-1 ml-1"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {adminOptions.map((option, index)=> (
                    <DropdownMenuItem asChild key={index}>
                      <Link
                        href={option.href}
                        className="block w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-accent-foreground"
                      >
                        {option.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
