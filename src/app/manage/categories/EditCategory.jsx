// src/components/EditCategory.js
"use client";
import { useState } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { showToast } from '@/app/components/toastcomponent';

const EditCategory = ({ category }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categoryType, setCategoryType] = useState(category.categoryType);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryTypeChange = (event) => {
    setCategoryType(event.target.value);
  };

  const handleEditCategory = async () => {
    if (!categoryName) {
      showToast('Fill all required fields', 'failed');
      return;
    }

    const updatedCategory = {
      categoryName,
      categoryType,
      // Add other category properties as needed
    };

    try {
      await updateDoc(doc(db, 'categories', category.id), updatedCategory);
      showToast('Category updated successfully', 'success');
    } catch (error) {
      showToast('Category not updated', 'failed');
    }
  };

  return (
    <div className='form-container'>
      <h1>Edit Category</h1>
      <form onSubmit={handleEditCategory}>
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
  );
};

export default EditCategory;
