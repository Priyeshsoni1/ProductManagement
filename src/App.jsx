import React, { useState } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import CartSidebar from "./components/CartSidebar";
import TableContainer from "./components/ProductTable/TableContainer";
import ListCardView from "./components/ProductList/ListCardView";
import ProductDetail from "./components/ProductTable/ProductDetail";
import { useProducts } from "./hooks/useProduct";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { viewMode, setViewMode, currentView } = useProducts();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="p-4">
        <StatsCards />

        {currentView === "main" && (
          <>
            {/* View Toggle Buttons */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                List View
              </button>
            </div>

            {/* Product Views */}
            {viewMode === "table" ? <TableContainer /> : <ListCardView />}
          </>
        )}

        {currentView === "detail" && <ProductDetail />}
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
