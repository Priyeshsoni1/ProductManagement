import React from "react";
import { useProducts } from "../hooks/useProduct";

const StatsCards = () => {
  const { products } = useProducts();
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock < 20).length;
  const categorySet = new Set(products.map((p) => p.category));

  const cards = [
    {
      label: "Total Products",
      value: totalProducts,
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      bg: "bg-green-100",
      text: "text-green-800",
    },
    {
      label: "Low Stock Items",
      value: lowStockCount,
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    {
      label: "Categories Count",
      value: categorySet.size,
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`p-4 rounded shadow ${card.bg}`}>
          <p className="text-sm font-medium text-gray-600">{card.label}</p>
          <h2 className={`text-2xl font-bold mt-1 ${card.text}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default React.memo(StatsCards);
