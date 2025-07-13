import React from "react";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProduct";

const ListCardView = () => {
  const {
    products,

    setSelectedProduct,

    setCurrentView,
  } = useProducts();
  const onView = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  const { addToCart: onAddToCart } = useCart();
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.slice(0, 20).map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            onClick={() => onView(product)}
            className="w-full h-40 object-cover rounded"
          />
          <div className="mt-4">
            <h3
              className="text-lg font-semibold"
              onClick={() => onView(product)}
            >
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <p className="text-sm text-gray-700 mb-1">
              Price: <strong>${product.price}</strong>
            </p>
            <p className="text-sm text-gray-700 mb-1">Stock: {product.stock}</p>
            <span
              className={`inline-block px-2 py-1 mt-1 text-xs rounded ${
                product.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onView(product)}
              className="text-gray-600 text-sm underline"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCardView;
