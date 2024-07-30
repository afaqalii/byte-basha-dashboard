"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/loader/loader";
import { Button } from "@/components/ui/button";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // const router = useRouter();
    // const [loading, setLoading] = useState(true);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     } else {
    //         setIsAuthenticated(false);
    //         router.push('/login');
    //     }
    //     setLoading(false);
    // }, [router]);

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <Spinner />
    //         </div>
    //     );
    // }

    // if (!isAuthenticated) {
    //     return (
    //         <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
    //             <h1 className="text-2xl font-semibold">You are not authorized</h1>
    //             <Button onClick={() => router.push('/login')}>Sign in</Button>
    //         </div>
    //     );
    // }

    return <>{children}</>;
};

export default ProtectedRoute;
