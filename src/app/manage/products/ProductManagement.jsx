// src/components/ProductManagementPage.js
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import AddProductPage from "./addproducts/addproduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "Products");
        const querySnapshot = await getDocs(productsCollectionRef);

        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setDeletingProduct(null);
  };

  const handleDeleteProduct = (product) => {
    setDeletingProduct(product);
    setEditingProduct(null);
  };

  return (
    <div>
      {/* Add a section to manage products */}
        {(editingProduct === null && deletingProduct === null) && ( // Only render the table if editingProduct is null
      <div className="table-container">
          <>
            <h1>Product Management</h1>
            {/* Display the list of existing products in a table */}
            <table>
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.brandName}</td>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.category}</td>
                    <td>${product.productPrice}</td>
                    <td>{product.productQuantity}</td>
                    <td>
                      <button
                        id="edit"
                        className="btn"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        id="del"
                        className="btn"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
      </div>
        )}

      {/* Render EditProduct and DeleteProduct components */}
      {editingProduct && <EditProduct product={editingProduct} />}
      {deletingProduct && <DeleteProduct product={deletingProduct} />}
    </div>
  );
};

export default ProductManagementPage;
