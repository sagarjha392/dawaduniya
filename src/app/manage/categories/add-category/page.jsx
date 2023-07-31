"use client";
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; // Make sure to provide the correct path to your firebase configuration file
import {showToast} from '@/app/components/toastcomponent';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('product'); // Defaulting to 'product'

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryTypeChange = (event) => {
    setCategoryType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName) {
      showToast('Fill all required fields', 'failed');
      return;
    }

    // Create a new category object with the data
    const newCategory = {
      categoryName: categoryName,
      categoryType: categoryType,
      // Add other category properties as needed
    };

    try {
      const docRef = await addDoc(collection(db, 'categories'), newCategory);
      // Show success toast notification using the custom toast component
      showToast('Category added successfully', 'success');

      // Reset form fields after successful submission
      setCategoryName('');
      setCategoryType('product');
    } catch (error) {
      // Show error toast notification using the custom toast component
      showToast('Category not added', 'failed');
    }
  };

  return (
    <main>
      
    <div className='form-container'>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
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
       <div> <button className='btn' type="submit">Add Category</button></div>
      </form>
    </div>
    </main>
  );
};

export default AddCategory;
