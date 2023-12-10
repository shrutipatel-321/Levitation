// src/components/Step1.tsx
import React, { useState, useEffect } from 'react';

const Step1: React.FC<any> = ({ formData, setFormData }) => {
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData({
              ...formData,
              geolocation: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            });
            reverseGeocode(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            setLocationStatus(`Geolocation error: ${error.message}`);
          }
        );
      } else {
        setLocationStatus('Geolocation is not supported by this browser.');
      }
    };

    const reverseGeocode = async (latitude: number, longitude: number) => {
      const apiKey = '0a5a5a42c6e544d98ae84367113bcee0'; // Replace with your OpenCage API key
      const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`;

      try {
        const response = await fetch(reverseGeocodeUrl);

        if (response.ok) {
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].components;
            setCity(addressComponents.city || '');
            setState(addressComponents.state || '');
            setCountry(addressComponents.country || '');
            setLocationStatus('Location captured successfully!');
          } else {
            setLocationStatus('No results found in the response.');
          }
        } else {
          setLocationStatus(`Error in reverse geocoding response. Status: ${response.status}`);
        }
      } catch (error) {
        setLocationStatus(`Error during reverse geocoding: ${error.message}`);
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="step-content">
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Phone:</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />


      <label>City:</label>
      <input type="text" name="address.city" value={city} onChange={handleChange} required />

      <label>State:</label>
      <input type="text" name="address.state" value={state} onChange={handleChange} required />

      <label>Country:</label>
      <input type="text" name="address.country" value={country} onChange={handleChange} required />

      <p className='location'>{locationStatus}</p>
    </div>
  );
};

export default Step1;
