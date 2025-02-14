import React from 'react';
import AddMenuItem from "@/components/AddMenuItem";
import UsersList from "@/components/UsersList";

export default function AdminDashboard() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <AddMenuItem />
            <UsersList />
        </div>
    );
}
