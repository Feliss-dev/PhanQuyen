import { Suspense } from "react";

import React from "react";
import { Navbar } from "./_components/navbar";
import { Spinner } from "@/components/ui/spinner";

// Lazy load Footer component
const Footer = React.lazy(() => import("./_components/footer"));

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="">
      <Navbar />
      {children}
     {/* Suspense wrapper to show spinner while Footer is loading */}
     <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </div>
   );
}
 
export default ProtectedLayout;