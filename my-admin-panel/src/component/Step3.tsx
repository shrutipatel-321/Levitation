// src/components/Step3.tsx
import React, { useState } from 'react';
import './Steps.css'
const Step3: React.FC<any> = ({ formData, setFormData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionSelect = (selectedOption: string) => {
    setFormData({
      ...formData,
      selectedOptions: [...formData.selectedOptions, selectedOption],
    });
    setIsDropdownOpen(false);
  };

  return (
    <div className="step-content">
      <label>Select Options:</label>
      <div className="dropdown">
        <div className="dropdown-toggle" onClick={handleDropdownToggle}>
          {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
        </div>
        {isDropdownOpen && (
          <div className="dropdown-options">
            <div onClick={() => handleOptionSelect('Option 1')}>Option 1</div>
            <div onClick={() => handleOptionSelect('Option 2')}>Option 2</div>
            <div onClick={() => handleOptionSelect('Option 3')}>Option 3</div>
            {/* Add more options */}
          </div>
        )}
      </div>

      {/* Display selected options */}
      <div className="selected-options">
        <strong>Selected Options:</strong>
        {formData.selectedOptions.map((option: string) => (
          <div key={option}>{option}</div>
        ))}
      </div>
    </div>
  );
};

export default Step3;
