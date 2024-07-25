"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        // Show a loader while checking authentication status
        return (
            <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
                <h1 className="text-2xl font-semibold">Your are not authorized</h1>
                <Button
                    onClick={() => signIn("google")}
                >
                    Sign in using Google
                </Button>
            </div>
        );
    }
    if (status === "loading") {
        // Show a loader while checking authentication status
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (status === "authenticated") {
        return <>{children}</>;
    }
    return null;
};

export default ProtectedRoute;