import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [salesTotal, setSalesTotal] = useState("$0");

  // Load live data from localStorage
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    setProductsCount(products.length);
    setCustomersCount(customers.length);
    setOrdersCount(orders.length);

    const totalSales = orders.reduce(
      (sum: number, o: any) => sum + parseFloat(o.amount?.replace("$", "") || 0),
      0
    );
    setSalesTotal(`$${totalSales.toFixed(2)}`);
  }, []);

  const stats = [
    { title: "Total Sales", value: salesTotal, icon: DollarSign },
    { title: "Total Orders", value: ordersCount, icon: ShoppingBag },
    { title: "Products", value: productsCount, icon: Package },
    { title: "Customers", value: customersCount, icon: Users },
  ];

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-3xl font-bold text-amber-700">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-amber-100 dark:border-gray-700 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <h3 className="text-3xl font-semibold text-amber-700">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Manage Products Shortcut */}
        <div className="flex justify-end">
          <Link
            to="/admin/products"
            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-700 transition"
          >
            Manage Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-amber-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-amber-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-amber-700">
              Recent Orders
            </h2>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>

          {orders.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
              No orders yet. Once customers buy products, they will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                <thead className="bg-amber-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {orders.map((order: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-amber-50/40 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customers Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-amber-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-amber-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-amber-700">Customers</h2>
            <Users className="w-5 h-5 text-amber-500" />
          </div>

          {customers.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
              No customers yet. Subscribers and buyers will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                <thead className="bg-amber-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {customers.map((customer: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-amber-50/40 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 font-medium">
                        {customer.id || index + 1}
                      </td>
                      <td className="px-6 py-4">{customer.name}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
          © {new Date().getFullYear()} Jewelry Admin • All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
