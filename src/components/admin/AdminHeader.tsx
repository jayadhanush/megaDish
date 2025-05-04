
import React from 'react';
import { User, ShoppingBag, LayoutDashboard } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 bg-slate-50 p-6 rounded-lg shadow mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage products, orders, and users
        </p>
      </div>
      
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Products</p>
            <p className="font-medium">45 Products</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="font-medium">12 New</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-muted-foreground">Customers</p>
            <p className="font-medium">28 Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};
