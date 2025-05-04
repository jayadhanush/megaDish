import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Search, 
  Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Order } from '@/types';
import { adminService } from '@/services/adminService';

export const OrdersAdmin = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderStatus(order.isDelivered ? 'delivered' : 'pending');
    setDetailsOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    
    try {
      await adminService.updateOrderStatus(selectedOrder.id, {
        isDelivered: orderStatus === 'delivered'
      });
      
      toast({
        title: "Success",
        description: "Order status updated successfully"
      });
      
      // Refresh orders list
      fetchOrders();
      setDetailsOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order =>
    order.id.includes(searchTerm) ||
    order.shippingAddress.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Paid</TableHead>
              <TableHead className="text-center">Delivered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="text-right">${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    {order.isPaid ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>
                    ) : (
                      <Badge variant="destructive">Unpaid</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.isDelivered ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Delivered</Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleViewOrderDetails(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Order Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                  <p>Address: {selectedOrder.shippingAddress.address}</p>
                  <p>City: {selectedOrder.shippingAddress.city}</p>
                  <p>Postal Code: {selectedOrder.shippingAddress.postalCode}</p>
                  <p>Country: {selectedOrder.shippingAddress.country}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p>Order ID: {selectedOrder.id}</p>
                  <p>Date: {formatDate(selectedOrder.createdAt)}</p>
                  <p>Payment Method: {selectedOrder.paymentMethod}</p>
                  <p>Payment Status: {selectedOrder.isPaid ? 'Paid' : 'Unpaid'}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium">Delivery Status</h4>
                    <Select 
                      value={orderStatus} 
                      onValueChange={setOrderStatus}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select delivery status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${selectedOrder.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${selectedOrder.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${selectedOrder.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setDetailsOpen(false)} variant="outline">Cancel</Button>
                <Button onClick={handleUpdateStatus}>Update Status</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
