import React from "react";

interface Order {
  id: number;
  customer: string;
  amount: string;
  status: string;
}

const Orders: React.FC = () => {
  const sampleOrders: Order[] = [
    { id: 101, customer: "Aditi", amount: "$300", status: "Delivered" },
    { id: 102, customer: "Rahul", amount: "$450", status: "Pending" },
    { id: 103, customer: "Sonia", amount: "$120", status: "Cancelled" },
    { id: 104, customer: "Karan", amount: "$600", status: "Delivered" },
  ];

  // Status color map
  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-700 uppercase">Order ID</th>
              <th className="p-3 text-sm font-semibold text-gray-700 uppercase">Customer</th>
              <th className="p-3 text-sm font-semibold text-gray-700 uppercase">Amount</th>
              <th className="p-3 text-sm font-semibold text-gray-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 text-gray-700 font-medium">{order.id}</td>
                <td className="p-3 text-gray-700">{order.customer}</td>
                <td className="p-3 text-gray-700">{order.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
