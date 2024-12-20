"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  // Load modal state from localStorage on mount
  useEffect(() => {
    const savedProductId = localStorage.getItem("selectedProductId");
    if (savedProductId) {
      const product = PRODUCTS_DATA.find(p => p.id === savedProductId);
      if (product) setSelectedProduct(product);
    }
  }, []);

  // Open modal and save the selected product to localStorage
  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProductId", product.id);
  }, []);

  // Close modal and clear the selected product from localStorage
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    localStorage.removeItem("selectedProductId");
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
