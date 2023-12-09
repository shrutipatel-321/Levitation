// src/components/Step2.tsx
import React from 'react';
import './Steps.css'
const Step2: React.FC<any> = ({ formData, setFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: e.target.files,
      });
    }
  };

  return (
    <div className="step-content">
      <label>File Upload (PNG or PDF):</label>
      <input type="file" name="files" accept=".png, .pdf" onChange={handleFileChange} multiple required />

      {/* Geolocation capturing logic goes here */}
    </div>
  );
};

export default Step2;
