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
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  // Viewport check to prevent unexpected issues due to screen size changes
  useEffect(() => {
    const checkViewport = () => setIsSmallViewport(window.innerWidth < 768);

    checkViewport(); // Initial check
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Load modal state from localStorage on mount (safe access)
  useEffect(() => {
    try {
      const savedProductId = localStorage.getItem("selectedProductId");
      if (savedProductId) {
        const product = PRODUCTS_DATA.find((p) => p.id === savedProductId);
        if (product) setSelectedProduct(product);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Open modal and save the selected product to localStorage
  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    try {
      localStorage.setItem("selectedProductId", product.id);
    } catch (error) {
      console.warn("Failed to save to localStorage", error);
    }
  }, []);

  // Close modal and clear the selected product from localStorage
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    try {
      localStorage.removeItem("selectedProductId");
    } catch (error) {
      console.warn("Failed to clear localStorage", error);
    }
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
      {isSmallViewport && <div className="text-sm text-gray-500">Small viewport detected</div>}
    </div>
  );
};
