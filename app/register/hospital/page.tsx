'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  hospitalName: string;
  hospitalType: string;
  address: string;
  contactNumber: string;
  totalBeds: string;
  totalICUBeds: string;
  totalVentilators: string;
  oxygenCylinders: string;
}

const HospitalRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
    hospitalType: '',
    address: '',
    contactNumber: '',
    totalBeds: '',
    totalICUBeds: '',
    totalVentilators: '',
    oxygenCylinders: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const hospitalTypeOptions = [
    { value: 'local', label: 'Local Hospital' },
    { value: 'higher', label: 'Higher Hierarchy Hospital' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username must contain only lowercase letters, numbers, and underscores';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital name is required';
    }
    
    if (!formData.hospitalType) {
      newErrors.hospitalType = 'Hospital type is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    
    if (!formData.totalBeds.trim()) {
      newErrors.totalBeds = 'Total beds is required';
    } else if (!/^\d+$/.test(formData.totalBeds) || parseInt(formData.totalBeds) <= 0) {
      newErrors.totalBeds = 'Total beds must be a positive number';
    }
    
    if (formData.totalICUBeds.trim() && (!/^\d+$/.test(formData.totalICUBeds) || parseInt(formData.totalICUBeds) < 0)) {
      newErrors.totalICUBeds = 'Total ICU beds must be a non-negative number';
    }
    
    if (formData.totalVentilators.trim() && (!/^\d+$/.test(formData.totalVentilators) || parseInt(formData.totalVentilators) < 0)) {
      newErrors.totalVentilators = 'Total ventilators must be a non-negative number';
    }
    
    if (formData.oxygenCylinders.trim() && (!/^\d+$/.test(formData.oxygenCylinders) || parseInt(formData.oxygenCylinders) < 0)) {
      newErrors.oxygenCylinders = 'Oxygen cylinders must be a non-negative number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const data = {
          username: formData.username.toLowerCase(),
          password: formData.password,
          hospitalName: formData.hospitalName,
          hospitalType: formData.hospitalType,
          address: formData.address,
          contactNumber: formData.contactNumber,
          totalBeds: parseInt(formData.totalBeds),
          totalICUBeds: formData.totalICUBeds ? parseInt(formData.totalICUBeds) : 0,
          totalVentilators: formData.totalVentilators ? parseInt(formData.totalVentilators) : 0,
          oxygenCylinders: formData.oxygenCylinders ? parseInt(formData.oxygenCylinders) : 0,
        };
        
        await axios.post('/api/register/hospital', data);
        setSuccessMessage('Registration successful!');
        
        // Reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          hospitalName: '',
          hospitalType: '',
          address: '',
          contactNumber: '',
          totalBeds: '',
          totalICUBeds: '',
          totalVentilators: '',
          oxygenCylinders: '',
        });
      } catch (err: any) {
        console.error('Registration error:', err);
        setErrors({
          submit: err.response?.data?.message || 'Registration failed. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Hospital Registration</h1>
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{successMessage}</p>
          <div className="mt-4">
            <Link href="/login" className="btn-primary inline-block">
              Proceed to Login
            </Link>
          </div>
        </div>
      )}
      
      {errors.submit && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{errors.submit}</p>
        </div>
      )}
      
      {!successMessage && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              required
              error={errors.username}
            />
            
            <Input
              id="hospitalName"
              label="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
              name="hospitalName"
              required
              error={errors.hospitalName}
            />
            
            <Select
              id="hospitalType"
              label="Hospital Type"
              value={formData.hospitalType}
              onChange={handleChange}
              options={hospitalTypeOptions}
              required
              error={errors.hospitalType}
            />
            
            <Input
              id="contactNumber"
              label="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              name="contactNumber"
              required
              error={errors.contactNumber}
            />
            
            <Input
              id="totalBeds"
              label="Total Regular Beds"
              value={formData.totalBeds}
              onChange={handleChange}
              name="totalBeds"
              required
              error={errors.totalBeds}
            />
            
            <Input
              id="totalICUBeds"
              label="Total ICU Beds"
              value={formData.totalICUBeds}
              onChange={handleChange}
              name="totalICUBeds"
              error={errors.totalICUBeds}
            />
            
            <Input
              id="totalVentilators"
              label="Total Ventilators"
              value={formData.totalVentilators}
              onChange={handleChange}
              name="totalVentilators"
              error={errors.totalVentilators}
            />
            
            <Input
              id="oxygenCylinders"
              label="Oxygen Cylinders"
              value={formData.oxygenCylinders}
              onChange={handleChange}
              name="oxygenCylinders"
              error={errors.oxygenCylinders}
            />
            
            <div className="md:col-span-2">
              <Input
                id="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                name="address"
                required
                error={errors.address}
              />
            </div>
            
            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
              error={errors.password}
            />
            
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              required
              error={errors.confirmPassword}
            />
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
            
            <div className="text-sm">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <Link href="/login" className="text-red-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default HospitalRegistration; 