import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProduct";

const EditProductDialog = ({ open, onClose }) => {
  const { selectedProduct: product, updateProduct: update } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        status: product.status || "Active",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedProduct = { ...product, ...formData };
    update(updatedProduct);

    onClose();
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData?.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={formData?.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={formData?.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border px-3 py-2 rounded"
          />
          <select
            name="status"
            value={formData?.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductDialog;
