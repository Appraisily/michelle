// Sample product data (replace with your database)
const products = [
  { id: '1', name: 'Product 1', price: 99.99, stock: 50 },
  { id: '2', name: 'Product 2', price: 149.99, stock: 30 },
];

export const searchProducts = (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const results = products.filter(product => 
    product.name.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(results);
};

export const getProductInfo = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
};