'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileUpload from '../../components/FileUpload';
import Select from '../../components/Select';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  hospitalName: string;
  degreeCertificate: File | null;
}

const DoctorRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    hospitalName: '',
    degreeCertificate: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');

  // Hardcoded list of hospitals for now - could be fetched from API
  const hospitalOptions = [
    { value: 'aiims_patna', label: 'AIIMS Patna' },
    { value: 'patna_medical_college', label: 'Patna Medical College and Hospital' },
    { value: 'nalanda_medical_college', label: 'Nalanda Medical College and Hospital' },
    { value: 'indira_gandhi_institute', label: 'Indira Gandhi Institute of Medical Sciences' },
    { value: 'darbhanga_medical_college', label: 'Darbhanga Medical College and Hospital' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, degreeCertificate: file }));
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.hospitalName) {
      newErrors.hospitalName = 'Hospital name is required';
    }
    
    if (!formData.degreeCertificate) {
      newErrors.degreeCertificate = 'Degree certificate is required';
    } else if (formData.degreeCertificate.type !== 'application/pdf') {
      newErrors.degreeCertificate = 'Degree certificate must be a PDF file';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Create form data to send file
        const data = new FormData();
        data.append('username', formData.username.toLowerCase());
        data.append('password', formData.password);
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('hospitalName', formData.hospitalName);
        if (formData.degreeCertificate) {
          data.append('degreeCertificate', formData.degreeCertificate);
        }
        
        const response = await axios.post('/api/register/doctor', data);
        setSuccessMessage('Registration successful!');
        setEmployeeCode(response.data.employeeCode);
        
        // Reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          hospitalName: '',
          degreeCertificate: null,
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
      <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Doctor Registration</h1>
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{successMessage}</p>
          {employeeCode && (
            <p className="mt-2">
              <strong>Your Employee Code:</strong> {employeeCode}
              <br />
              <small className="text-sm">Please keep this code safe. You will need it for patient referrals.</small>
            </p>
          )}
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
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
              required
              error={errors.firstName}
            />
            
            <Input
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              required
              error={errors.lastName}
            />
            
            <Select
              id="hospitalName"
              label="Hospital"
              value={formData.hospitalName}
              onChange={handleChange}
              options={hospitalOptions}
              required
              error={errors.hospitalName}
            />
            
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
          
          <FileUpload
            id="degreeCertificate"
            label="Degree Certificate (PDF)"
            accept=".pdf"
            required
            error={errors.degreeCertificate}
            onChange={handleFileChange}
          />
          
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

export default DoctorRegistration; 