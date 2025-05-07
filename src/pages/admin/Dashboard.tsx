
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsAdmin } from '@/components/admin/ProductsAdmin';
import { OrdersAdmin } from '@/components/admin/OrdersAdmin';
import { UsersAdmin } from '@/components/admin/UsersAdmin';
import { AnalyticsAdmin } from '@/components/admin/AnalyticsAdmin';
import { AdminHeader } from '@/components/admin/AdminHeader';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect non-admin users
  //   if (user && !user.isAdmin) {
  //     navigate('/');
  //   } else if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AdminHeader />
        
        <Tabs defaultValue="products" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Products Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsAdmin />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersAdmin />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
              </CardHeader>
              <CardContent>
                <UsersAdmin />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsAdmin />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
