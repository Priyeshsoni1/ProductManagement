import React from "react";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProduct";

const ProductDetail = () => {
  //   const [viewMode, setViewMode] = useState("table"); // "table" | "list"
  // const [currentView, setCurrentView] = useState("main"); // "main" | "detail"
  const {
    selectedProduct: product,
    deleteProduct: onDelete,
    setSelectedProduct,
    viewMode,
    setViewMode,
    currentView,
    setCurrentView,
  } = useProducts();
  const onBack = () => {
    setCurrentView("main");
  };
  if (!product) return null;
  const {
    cart: items,
    addToCart: onAddToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Products
      </button>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-64 object-cover rounded shadow"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-sm">{product.category}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold text-gray-700">Price</p>
              <p className="text-lg text-blue-600 font-bold">
                ${product.price}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold text-gray-700">Stock</p>
              <p
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold text-gray-700">Status</p>
              <span
                className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.status}
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-semibold text-gray-700">Product ID</p>
              <p className="text-gray-900 break-all">{product.id}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              pulvinar diam ut lorem iaculis, in placerat libero feugiat.
              Phasellus fermentum tincidunt sapien, eget malesuada lacus
              fermentum sed.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                onDelete(product.id);
                setCurrentView("main");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
