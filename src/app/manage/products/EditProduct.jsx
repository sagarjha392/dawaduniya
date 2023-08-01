// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { showToast } from "@/app/components/toastcomponent";

const EditProduct = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState({
    brandName: product.brandName,
    productName: product.productName,
    category: product.category,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
    productDescription: product.productDescription,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      // Update the product in the 'Products' collection in Firestore
      await updateDoc(doc(db, "Products", product.id), editedProduct);

      showToast("Product updated successfully", { type: "success" });
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Error updating product", { type: "failed" });
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1 className="form-heading">Edit Product</h1>
        <hr />
        <form>
          <div>
            <label htmlFor="brandName">Brand Name:</label>
            <input
              type="text"
              name="brandName"
              value={editedProduct.brandName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={editedProduct.productName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={editedProduct.category} // Make sure to set the correct value
              onChange={handleChange}
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
              value={editedProduct.productPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="productQuantity">Quantity:</label>
            <input
              type="number"
              name="productQuantity"
              value={editedProduct.productQuantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
            rows={6}
              name="description"
              value={editedProduct.productDescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn" onClick={handleUpdateProduct}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;
