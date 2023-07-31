// pages/add-product.js
"use client";
import React, { useState, useEffect } from "react";

const AddServicePage = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceSubName, setServiceSubName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceType, setServiceType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //   useEffect(() => {
  // Fetch existing categories from your backend API here
  // For example, you might have an API endpoint like '/api/categories'
  // Replace the fetchCategories() function with your actual fetch logic
  //     fetchCategories().then((data) => {
  //       setCategories(data);
  //       // Set the default selected category to the first one in the list
  //       if (data.length > 0) {
  //         setSelectedCategory(data[0].id);
  //       }
  //     });
  //   }, []);

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };
  const handleServiceSubNameChange = (e) => {
    setServiceSubName(e.target.value);
  };

  const handleServiceDescriptionChange = (e) => {
    setServiceDescription(e.target.value);
  };

  const handleServicePriceChange = (e) => {
    setServicePrice(e.target.value);
  };

  const handleServiceTypeChange = (e) => {
    setSelectedServiceType(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Name:", ServiceName);
    console.log("Service Description:", ServiceDescription);
    console.log("Service Price:", ServicePrice);
    console.log("Service Type:", ServiceType);
    console.log("Selected Category:", selectedCategory);
  };

  return (
    <main>
      <div className="form-container">
        <h1 className="form-heading">Add New Service</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="serviceName">Service Name:</label>
            <input
              type="text"
              id="serviceName"
              value={serviceName}
              onChange={handleServiceNameChange}
            />
          </div>
          <div>
            <label htmlFor="serviceSubName">Sub-Service Category:</label>
            <input
              type="text"
              id="serviceSubName"
              value={serviceSubName}
              onChange={handleServiceSubNameChange}
            />
          </div>
          <div>
            <label htmlFor="serviceDescription">Service Description:</label>
            <textarea
              id="serviceDescription"
              value={serviceDescription}
              onChange={handleServiceDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor="servicePrice">Service Price:</label>
            <input
              type="number"
              id="servicePrice"
              value={servicePrice}
              onChange={handleServicePriceChange}
            />
          </div>
          <div>
            <label htmlFor="serviceType">Sub Category</label>
            <select
              id="serviceType"
              value={selectedServiceType}
              onChange={handleServiceTypeChange}
            >
              {serviceType.map((serviceType) => (
                <option key={serviceType.id} value={serviceType.id}>
                  {serviceType.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='btn' htmlFor="uploadServiceImage">Upload Service Image</label>
            <input type="file"  id="uploadServiceImage" style={{display:"none"}}/>
        </div>
          <button type="submit">Add Service</button>
        </form>
      </div>
    </main>
  );
};

export default AddServicePage;
