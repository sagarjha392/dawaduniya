// src/components/DeleteProduct.js
import React,{useState} from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { showToast } from "@/app/components/toastcomponent";

const DeleteProduct = ({ product }) => {
  const [showComponent, setShowComponent] = useState(true);

  const handleDeleteProduct = async () => {
    try {
      // Delete the product from the 'Products' collection in Firestore
      await deleteDoc(doc(db, "Products", product.id));

      showToast("Product deleted successfully", { type: "success" });
      setShowComponent(false); // Hide the component when the user cancels
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error deleting product", { type: "failed" });
    }
  };
  const handleCancelDelete = () => {
    // Implement any additional logic here if needed
    setShowComponent(false); // Hide the component when the user cancels
    window.location.reload();
  };
  return (
    <main>
      <div className="form-container">
        <h1 className="form-heading">Delete Product</h1>
        <p className="warning">Are you sure you want to delete this product?</p>
        <div>
          <button className="delbtn" onClick={handleDeleteProduct}>
            Delete Product
          </button>
          <button className="cancelbtn" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeleteProduct;
