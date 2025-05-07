import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { adminService } from '@/services/adminService';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];

export const AnalyticsAdmin = () => {
  const [salesData, setSalesData] = useState([]);  // Sales data state
  const [productData, setProductData] = useState([]);  // Product category data state
  const [userData, setUserData] = useState([]);  // User activity data state
  const [loading, setLoading] = useState(true);  // Loading state

  const getCategoryData = async () => {
    try {
      const smpdata = await adminService.getCategory();
      return smpdata; // This will return the category data
    } catch (error) {
      console.error('Error fetching category data:', error);
      return [];
    }
  };

  const getUserJoinData = async () => {
    try {
      const response = await adminService.getUsers();
      // Extract and group users by their join date (month)
      const monthlyUserData = response.reduce((acc, user) => {
        const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
        if (acc[month]) {
          acc[month]++;
        } else {
          acc[month] = 1;
        }
        return acc;
      }, {});

      // Convert the data into an array for use in the chart
      const formattedData = Object.keys(monthlyUserData).map((month) => ({
        name: month,
        usersJoined: monthlyUserData[month],
      }));

      return formattedData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  };

  // Load data asynchronously when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch sample data
        const sampleProductData = await getCategoryData();
        console.log(sampleProductData); // To check the fetched data

        const sampleSalesData = [
          { name: 'Jan', total: 2400 },
          { name: 'Feb', total: 1398 },
          { name: 'Mar', total: 9800 },
          { name: 'Apr', total: 3908 },
          { name: 'May', total: 4800 },
          { name: 'Jun', total: 3800 },
          { name: 'Jul', total: 4300 },
        ];

        // Fetch user join data
        const sampleUserJoinData = await getUserJoinData();
        console.log(sampleUserJoinData); // To check the fetched data

        // Set the data after fetching
        setSalesData(sampleSalesData);
        setProductData(sampleProductData);  // Set product data fetched from API
        setUserData(sampleUserJoinData); // Set the user join data
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);  // Empty dependency array to run once when component mounts

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Overview cards data
  const overviewCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(5700500),
      description: '10% increase from last month',
      trend: 'up'
    },
    {
      title: 'Orders',
      value: '145',
      description: '5% increase from last month',
      trend: 'up'
    },
    {
      title: 'Customers',
      value: '87',
      description: '12% increase from last month',
      trend: 'up'
    },
    {
      title: 'Avg. Order Value',
      value: formatCurrency(16800.93),
      description: '3% decrease from last month',
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="text-center py-12">Loading analytics data...</div>
      ) : (
        <>
          {/* Overview Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className={`text-xs mt-1 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div> */}

          {/* Analytics Tabs */}
          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Products by Category</CardTitle>
                  <CardDescription>Distribution of product across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Users Joined Monthly</CardTitle>
                  <CardDescription>Number of new users joined each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="usersJoined" stroke="#0088FE" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};
