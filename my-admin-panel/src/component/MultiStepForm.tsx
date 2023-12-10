// src/components/MultiStepForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './MultiStepForm.css'
const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
    files: [] as FileList,
    geolocation: null,
    selectedOptions: [] as string[],
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCancel = () => {
    console.log('Form canceled');
    // Implement cancel logic, e.g., reset form data and redirect to another page
  };

  const handleStepSubmit = () => {
    if (currentStep === 3) {
      // TODO: Replace the log statement with actual submission logic
      axios.post("http://localhost:3000/submit-form",{
        name: formData.name,
        email: formData.email,      
      })
      .then((res)=>{
        if(res.status==201){
          alert("Form Submitted");
          window.location.href = '/submission';
          console.log(res);
        }
        else{

        }
      })
      .catch((err)=>{
        console.log(err);
        alert("Error submitting form: Please try again later");
      })
      // You can make an API call or perform other actions here
    } else {
      handleNext();
    }
  };

  return (
    <div className="multi-step-form">
      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Step 1</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Step 2</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>Step 3</div>
      </div>

      {/* Render Step Content based on the current step */}
      {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
      {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}

      {/* Buttons */}
      <div className="buttons">
        {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < 3 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleStepSubmit}>Submit</button>
        )}
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default MultiStepForm;
