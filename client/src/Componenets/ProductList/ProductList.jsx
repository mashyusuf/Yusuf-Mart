import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; 
import Filter from "../Filter/Filter"; 

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initial product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list

  useEffect(() => {
    // Fetch products from an API or use static data
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initially, all products are displayed
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (filters) => {
    const { category, priceRange } = filters;

    // Filter products by category and price range
    const filtered = products.filter((product) => {
      const inCategory = category === "All" || product.category === category;
      const inPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
      return inCategory && inPriceRange;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        {/* Filter  <Filter onFilterChange={handleFilterChange} /> Component */}
       
      </div>

      <div className="w-3/4 grid grid-cols-3 gap-4">
        {/* Display filtered products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
