export const generateMockProducts = (count = 1000) => {
  const categories = ["Electronics", "Books", "Home", "Clothing", "Toys"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: parseFloat((Math.random() * 500 + 50).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? "Active" : "Inactive",
    image: `https://picsum.photos/seed/${i + 1}/60/60`,
  }));
};
