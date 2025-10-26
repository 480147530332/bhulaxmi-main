import React, { useState } from "react";
import {
  getAllProducts,
  Product,
  products as initialProducts,
} from "@/data/products"; // adjust path if needed

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(getAllProducts());
  const [filter, setFilter] = useState<"all" | Product["category"]>("all");

  const handleDelete = (id: string) => {
    const updated = productList.filter((p) => p.id !== id);
    setProductList(updated);
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: "New Product",
      price: 0,
      image: "https://via.placeholder.com/150",
      description: "Custom jewelry product",
      category: "gold",
    };
    setProductList([newProduct, ...productList]);
  };

  const filtered =
    filter === "all"
      ? productList
      : productList.filter((p) => p.category === filter);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Categories</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="diamond">Diamond</option>
            <option value="gems">Gems</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{p.name}</td>
                <td className="p-3 text-gray-700">${p.price}</td>
                <td className="p-3 capitalize text-gray-700">{p.category}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-gray-600 text-sm capitalize">
                  {p.category}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">${p.price}</span>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
