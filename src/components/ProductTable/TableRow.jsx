import React from "react";

const TableRow = ({ product, onAddToCart, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-3 py-2">{product.id}</td>
      <td className="px-3 py-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 object-cover rounded"
        />
      </td>
      <td className="px-3 py-2">{product.name}</td>
      <td className="px-3 py-2">{product.category}</td>
      <td className="px-3 py-2">${product.price}</td>
      <td className="px-3 py-2">{product.stock}</td>
      <td className="px-3 py-2">
        <span
          className={`px-2 py-1 rounded text-xs ${
            product.status === "Active"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-3 py-2 space-x-2 text-sm">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => alert(JSON.stringify(product, null, 2))}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
