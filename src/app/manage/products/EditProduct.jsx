// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { showToast } from "@/app/components/toastcomponent";

const EditProduct = ({ product }) => {
  const [brandName, setBrandName] = useState(product.brandName);
  const [productName, setProductName] = useState(product.productName);
  const [category, setCategory] = useState(product.category);
  const [productPrice, setProductPrice] = useState(product.productPrice);
  const [productQuantity, setProductQuantity] = useState(
    product.productQuantity
  );
  const [productDescription, setProductDescription] = useState(
    product.productDescription
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollectionRef = collection(db, "categories");
        const querySnapshot = await getDocs(categoriesCollectionRef);

        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleEditProduct = async () => {
    if (
      !brandName ||
      !category ||
      !productName ||
      !productPrice ||
      !productQuantity ||
      !productDescription
    ) {
      showToast("Fill all required fields", { type: "failed" });
      return;
    }
    const updatedProduct = {
      brandName,
      productName,
      category,
      productPrice,
      productQuantity,
      productDescription,
    };
    try {
      await updateDoc(doc(db, "Products", product.id), updatedProduct);
      showToast("Product is updated successfully", { type: "success" });
      console.log("Successfully updated");
      window.location.reload();
    } catch (error) {
      showToast("Product not updated", { type: "failed" });
      console.log("Failed to update Product",error);
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
              name="brandName"
              value={brandName}
              onChange={handleBrandNameChange}
            />
          </div>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category} // Make sure to set the correct value
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="productPrice">Price:</label>
            <input
              type="number"
              name="productPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
            />
          </div>
          <div>
            <label htmlFor="productQuantity">Quantity:</label>
            <input
              type="number"
              name="productQuantity"
              value={productQuantity}
              onChange={handleProductQuantityChange}
            />
          </div>
          <div>
            <label htmlFor="productDescription">Description:</label>
            <textarea
              rows={6}
              name="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Update Products
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;
