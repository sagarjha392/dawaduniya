"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import { showToast } from "@/app/components/toastcomponent";

const AddProductPage = () => {
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState(null);

  const fetchProductCategories = async () => {
    try {
      const categoriesCollectionRef = collection(db, "categories");
      const querySnapshot = await getDocs(categoriesCollectionRef);

      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        const category = { id: doc.id, ...doc.data() };
        if (category.categoryType === "product") {
          categoriesData.push(category);
        }
        // categoriesData.push({ id: doc.id, ...doc.data() });
      });

      return categoriesData;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    // Fetch existing categories from your backend API here
    // Replace the fetchCategories() function with your actual fetch logic
    fetchProductCategories().then((data) => {
      setCategories(data);
      // Set the default selected category to the first one in the list
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    });
  }, []);

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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      brandName &&
      productName &&
      productDescription &&
      productPrice &&
      selectedCategory &&
      productImage
    ) {
      try {
        // Create a storage reference with a unique file name
        const storageRef = ref(storage, `product-images/${productImage.name}`);

        // Upload the image file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, productImage);

        // Get the download URL of the uploaded image
        const imageURL = await getDownloadURL(snapshot.ref);

        // Create an object representing the new product
        const newProduct = {
          brandName: brandName,
          productName: productName,
          productDescription: productDescription,
          productQuantity: Number(productQuantity),
          productPrice: parseFloat(productPrice),
          category: selectedCategory,
          imageURL: imageURL, // Add the image URL to the product object
        };

        // Add the new product to the 'Products' collection in Firestore
        const docRef = await addDoc(collection(db, "Products"), newProduct);

        showToast("Product " + productName + " added successfully", {
          type: "success",
        });
        console.log("Document written with ID: ", docRef.id);

        // Clear the input fields after successful addition
        setBrandName("");
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setSelectedCategory("");
        setProductImage(null);
      } catch (e) {
        console.error("Error adding document: ", e);
        showToast("Error adding document" + e.message), { type: "failed" };
      }
    } else {
      showToast("Please fill in all the required fields and select an image.", {
        type: "failed",
      });
    }
  };

  return (
<main>
<div className="form-container">
      <h1 className="form-heading">Add New Product</h1>
      <hr />
      <form onSubmit={handleSubmit}>
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
            <option className="options"value="">Select a category</option>
            {categories.map((category) => (
              <option  key={category.id} className="options" value={category.categoryName}>
                {category.categoryName}{" "}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="btn" htmlFor="uploadProductImage">
            Upload Product Image
          </label>
          <input
            type="file"
            id="uploadProductImage"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div>
        <button className="btn" type="submit">Add Product</button>
        </div>
      </form>
    </div>
</main>
  );
};
export default AddProductPage;
