
import React from 'react';
import { User, ShoppingBag, LayoutDashboard } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 bg-slate-50 p-6 rounded-lg shadow mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage products, and users
        </p>
      </div>
      

    </div>
  );
};
