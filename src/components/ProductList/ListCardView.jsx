import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProduct";
import EditProductDialog from "../ProductEdit";

const BATCH_SIZE = 10;

const ListCardView = () => {
  const { products, setSelectedProduct, setCurrentView } = useProducts();
  const { addToCart: onAddToCart } = useCart();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const onView = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  const loadMore = useCallback(() => {
    if (loading || visibleCount >= products.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, products.length));
      setLoading(false);
    }, 500);
  }, [loading, visibleCount, products.length]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onClick={() => onView(product)}
              className="w-full h-40 object-cover rounded cursor-pointer"
            />
            <div className="mt-4">
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => onView(product)}
              >
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <p className="text-sm text-gray-700 mb-1">
                Price: <strong>${product.price}</strong>
              </p>
              <p className="text-sm text-gray-700 mb-1">
                Stock: {product.stock}
              </p>
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
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsOpenEdit(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onView(product)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div
          ref={observerRef}
          className="text-center text-xl text-amber-500 mt-4 py-4"
        >
          {loading ? "Loading more products..." : "Scroll to load more"}
        </div>
      )}

      <EditProductDialog
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
      />
    </>
  );
};

export default ListCardView;
