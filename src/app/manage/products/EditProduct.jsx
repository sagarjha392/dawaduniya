// src/components/EditProduct.js
import React, { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { showToast } from "@/app/components/toastcomponent";

const EditProduct = ({ product }) => {
  const [brandName, setBrandName] = useState(product.brandName);
  const [productName, setProductName] = useState(product.productName);
  const [productDescription, setProductDescription] = useState(product.productDescription);
  const [productPrice, setProductPrice] = useState(String(product.productPrice));
  const [productQuantity, setProductQuantity] = useState(String(product.productQuantity));
  const [selectedCategory, setSelectedCategory] = useState(product.category);

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  // Handle other form input changes (productName, productDescription, etc.)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleEditProduct = async () => {
    if (
      brandName &&
      productName &&
      productDescription &&
      productPrice &&
      productQuantity &&
      selectedCategory
    ) {
      try {
        const updatedProduct = {
          brandName,
          productName,
          productDescription,
          productQuantity: Number(productQuantity),
          productPrice: parseFloat(productPrice),
          category: selectedCategory,
        };

        // Update the product in the 'Products' collection in Firestore
        await updateDoc(doc(db, "Products", product.id), updatedProduct);

        showToast("Product updated successfully", { type: "success" });
      } catch (error) {
        console.error("Error updating product:", error);
        showToast("Error updating product", { type: "failed" });
      }
    } else {
      showToast("Please fill in all the required fields.", { type: "failed" });
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1 className="form-heading">Edit Product</h1>
        <hr />
        <form onSubmit={handleEditProduct}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        <div>
          <label htmlFor="categoryType">Category Type:</label>
          <select
            id="categoryType"
            value={categoryType}
            onChange={handleCategoryTypeChange}
          >
            <option className='options' value="product">Product</option>
            <option className='options' value="service">Service</option>
          </select>
        </div>
        <div><button className='btn' type="submit">Save Changes</button></div>
      </form>
      </div>
    </main>
  );
};

export default EditProduct;
