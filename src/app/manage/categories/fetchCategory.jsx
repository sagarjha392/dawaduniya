// src/components/CategoryListing.js
"use client"
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

const CategoryListing = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoryList = [];
      querySnapshot.forEach((doc) => {
        categoryList.push({ ...doc.data(), id: doc.id });
      });
      setCategories(categoryList);
    };

    fetchData();
  }, []);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setDeletingCategory(null); // Clear deleting state when editing is initiated
  };

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
    setEditingCategory(null); // Clear editing state when deleting is initiated
  };

  return (
    <div className='table-container'>
      {editingCategory || deletingCategory ? (
        <>
          {editingCategory && <EditCategory category={editingCategory} />}
          {deletingCategory && <DeleteCategory category={deletingCategory} />}
        </>
      ) : (
        <>
          <h1>Categories</h1>
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Type</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.categoryName}</td>
                  <td>{category.categoryType}</td>
                  <td>
                    <button id="edit" className='btn' onClick={() => handleEditCategory(category)}>Edit</button>
                  </td>
                  <td>
                    <button id="del" className='btn' onClick={() => handleDeleteCategory(category)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CategoryListing;
