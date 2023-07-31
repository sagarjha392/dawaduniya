// src/components/DeleteCategory.js
import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { showToast } from '@/app/components/toastcomponent';

const DeleteCategory = ({ category }) => {
  const [showComponent, setShowComponent] = useState(true);

  const handleDeleteCategory = async () => {
    try {
      await deleteDoc(doc(db, 'categories', category.id));
      showToast('Category deleted successfully', 'success');
      setShowComponent(false); // Hide the component after successful deletion
      window.location.reload();
    } catch (error) {
      showToast('Category not deleted', 'failed');
    }
  };

  const handleCancelDelete = () => {
    // Implement any additional logic here if needed
    setShowComponent(false); // Hide the component when the user cancels
    window.location.reload();
  };

  if (!showComponent) {
    return null; // Render nothing if showComponent is false
  }

  return (
    <div className='form-container'>
      <h1>Delete Category</h1>
      <p className='warning'>Are you sure you want to delete this category?</p>
      <div>
        <button className='delbtn' onClick={handleDeleteCategory}>Delete Category</button>
        <button className='cancelbtn' onClick={handleCancelDelete}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCategory;
