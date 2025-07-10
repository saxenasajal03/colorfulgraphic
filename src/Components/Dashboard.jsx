import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchAllOrders } from '../services/api';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allStatuses, setAllStatuses] = useState([]);
  const [statusUpdateSelection, setStatusUpdateSelection] = useState({});

  const statusOptions = [
    { id: 1, label: "Placed", color: "bg-blue-100 text-blue-800" },
    { id: 2, label: "Payment Done", color: "bg-green-100 text-green-800" },
    { id: 3, label: "Payment Confirm", color: "bg-green-100 text-green-800" },
    {
      id: 4,
      label: "Prepairing for Dispatch",
      color: "bg-yellow-100 text-yellow-800",
    },
    { id: 5, label: "Dispatched", color: "bg-purple-100 text-purple-800" },
    { id: 6, label: "Delivered", color: "bg-green-100 text-green-800" },
    { id: 7, label: "Closed", color: "bg-gray-100 text-gray-800" },
  ];

  useEffect(() => {
    fetchOrders();
    console.log('Orders state:', orders);
  }, [currentPage]);

  useEffect(() => {
    // Debug: log orders state
    console.log('Orders state:', orders);
  }, [orders]);

  useEffect(() => {
    // Fetch all statuses from backend
    axios.get("http://localhost:3000/api/orders/status-master")
      .then(res => {
        if (res.data.success) setAllStatuses(res.data.data);
      });
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await fetchAllOrders(currentPage, 10);
      setOrders(orders);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, statusId) => {
    try {
      setUpdatingStatus(orderId);
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, {
        statusId,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (statusId) => {
    const status = statusOptions.find((s) => s.id === statusId);
    return status ? status.color : "bg-gray-100 text-gray-800";
  };

  const getCurrentStatus = (order) => {
    // Use order_statuses from API (snake_case)
    const latestStatus = order.order_statuses?.[0];
    return latestStatus?.OrderStatusID || 1;
  };

  const getCurrentStatusLabel = (order) => {
    const latestStatus = order.order_statuses?.[0];
    return latestStatus?.OrderStatus?.status || "-";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer & Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => {
                const currentStatus = getCurrentStatus(order);
                const statusColor = getStatusColor(currentStatus);
                const currentStatusLabel = getCurrentStatusLabel(order);

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        #{order.OrderId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(order.order_date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {(order.order_items?.length || 0)} items
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {order.user ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">
                            {order.user.firstname} {order.user.lastname}
                          </div>
                          <div className="text-sm text-gray-500">{order.user.email}</div>
                          <div className="text-sm text-gray-500">{order.user.mobile}</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                      <div className="mt-2 text-sm text-gray-600">
                        <div>{order.Address}</div>
                        <div>
                          {order.City}, {order.State} - {order.PinCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {order.order_items?.map((item) => (
                          <div key={item.order_item_id} className="text-sm">
                            <div className="font-medium text-gray-900">
                              {item.product?.name}
                            </div>
                            <div className="text-gray-500">
                              Qty: {item.product_quantity} × ₹{item.per_unit_product_price}
                            </div>
                            <div className="text-gray-600">
                              Total: ₹{item.total_product_price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{order.total}
                      </div>
                      {order.delivery_charges > 0 && (
                        <div className="text-sm text-gray-500">
                          Delivery: ₹{order.delivery_charges}
                        </div>
                      )}
                      <div className="text-sm text-gray-600 font-medium mt-1">
                        Total: ₹
                        {(
                          parseFloat(order.total) +
                          parseFloat(order.delivery_charges || 0)
                        ).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                      >
                        {currentStatusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <select
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          value={statusUpdateSelection[order.id] ?? currentStatus}
                          onChange={(e) =>
                            setStatusUpdateSelection((prev) => ({
                              ...prev,
                              [order.id]: parseInt(e.target.value),
                            }))
                          }
                          disabled={updatingStatus === order.id}
                        >
                          {allStatuses.map((status) => (
                            <option key={status.status_id} value={status.status_id}>
                              {status.status}
                            </option>
                          ))}
                        </select>
                        <div className="flex justify-end">
                          {updatingStatus === order.id ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                          ) : (
                            <button
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
                              onClick={() =>
                                handleStatusChange(order.id, statusUpdateSelection[order.id] ?? currentStatus)
                              }
                            >
                              Update
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
