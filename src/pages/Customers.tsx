import React from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
}

const Customers: React.FC = () => {
  const sampleCustomers: Customer[] = [
    { id: 1, name: "Aditi Sharma", email: "aditi@example.com" },
    { id: 2, name: "Rahul Mehta", email: "rahul@example.com" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Customers</h1>
      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
