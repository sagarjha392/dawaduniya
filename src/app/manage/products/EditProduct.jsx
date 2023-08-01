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

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

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
            <label htmlFor="brandName">Brand Name:</label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={handleBrandNameChange}
            />
          </div>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>
          <div>
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              rows={5}
              id="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor="productQuantity">Product Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              value={productQuantity}
              onChange={handleProductQuantityChange}
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
            />
          </div>
          <div>
            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
              <option  key={category.id} className="options" value={category.categoryName}>
                {category.categoryName}{" "}
              </option>
            ))}
            </select>
          </div>
          <div>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;
