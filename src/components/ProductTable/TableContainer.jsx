import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useCart } from "../../hooks/useCart";
import { useDebounce } from "../../hooks/useDebounce";
import { useProducts } from "../../hooks/useProduct";

const ITEMS_PER_PAGE = 10;

const TableContainer = () => {
  const {
    products,
    selectedProduct,
    deleteProduct: onDelete,
    setSelectedProduct,
    viewMode,
    setViewMode,
    currentView,
    setCurrentView,
  } = useProducts();

  const onView = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  const {
    cart: items,
    addToCart: onAddToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const defaultColumns = [
    { key: "id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const [columns, setColumns] = useState(defaultColumns);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const debounceSearchText = useDebounce(search, 800);

  const filtered = useMemo(() => {
    const term = debounceSearchText.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [debounceSearchText, products]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "price" || sortBy === "stock" || sortBy === "id") {
        return sortDir === "asc"
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      }
      return sortDir === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    });
  }, [filtered, sortBy, sortDir]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [page, sorted]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      {/* Header section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or category..."
          className="border p-2 rounded w-full sm:w-64 text-sm"
        />
        <p className="text-sm text-gray-500 text-center sm:text-right">
          Page {page} of {totalPages}
        </p>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <TableHeader
            columns={columns}
            setColumns={setColumns}
            sortBy={sortBy}
            sortDir={sortDir}
            onSort={(key, dir) => {
              setSortBy(key);
              setSortDir(dir);
            }}
          />
          <tbody>
            {paginated.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => {
                  if (col.key === "actions") {
                    return (
                      <td key={col.key} className="px-3 py-2 space-x-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => onView(product)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    );
                  }

                  if (col.key === "image") {
                    return (
                      <td key={col.key} className="px-3 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>
                    );
                  }

                  if (col.key === "status") {
                    return (
                      <td key={col.key} className="px-3 py-2">
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
                    );
                  }

                  return (
                    <td key={col.key} className="px-3 py-2">
                      {product[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableContainer;
