'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import jsPDF from 'jspdf';
import { ExternalLink, Download, FileWarning, Droplet, Search, CalendarDays, ArrowUp, ArrowDown, Hash } from 'lucide-react';
import { Spinner } from '@/components/kibo-ui/spinner';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import FileUpload from '../../components/FileUpload';
import Prescription from '../../components/Prescription';

// Safe localStorage wrapper to prevent SSR issues
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

interface ReferralFormData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone: string;
  patientAddress: string;
  medicalHistory: string;
  referralReason: string;
  referralHospital: string;
  prescription: File | null;
  employeeCode: string;
}

interface Hospital {
  id: string;
  hospitalName: string;
  hospitalType: string;
  address: string;
  contactNumber: string;
  totalBeds: number;
  availableBeds: number;
  totalICUBeds: number;
  availableICUBeds: number;
  totalVentilators: number;
  availableVentilators: number;
  oxygenCylinders: number;
  availableOxygenCylinders: number;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Referral {
  id: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone?: string;
  patientAddress?: string;
  medicalHistory: string;
  referralReason: string;
  prescriptionUrl: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  referringDoctor?: any;
  targetHospital?: {
    hospitalName: string;
    address: string;
    contactNumber: string;
  } | null;
}

const DoctorDashboard = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<ReferralFormData>({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    patientAddress: '',
    medicalHistory: '',
    referralReason: '',
    referralHospital: '',
    prescription: null,
    employeeCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [higherHospitals, setHigherHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showHospitalDetails, setShowHospitalDetails] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [hospitalsLoadError, setHospitalsLoadError] = useState('');

  // My Referrals state
  const [myReferrals, setMyReferrals] = useState<Referral[]>([]);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(true);
  const [referralsLoadError, setReferralsLoadError] = useState('');
  const [selectedPrescriptionUrl, setSelectedPrescriptionUrl] = useState<string | null>(null);
  const [referralSearch, setReferralSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'id'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Prescription state
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  useEffect(() => {
    // Redirect if not logged in or not a doctor
    if (!isLoading && (!isAuthenticated || (user && user.userType !== 'doctor'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  useEffect(() => {
    // Fetch higher hierarchy hospitals
    const fetchHospitals = async () => {
      setHospitalsLoadError('');
      try {
        const response = await axios.get('/api/register/hospital?type=higher', {
          headers: {
            Authorization: `Bearer ${storage.getItem('token')}`,
          }
        });
        setHigherHospitals(response.data || []);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setHigherHospitals([]);
        setHospitalsLoadError('Could not load hospitals right now. Please refresh the page.');
      }
    };

    if (isAuthenticated) {
      fetchHospitals();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Fetch doctor's referrals
    const fetchReferrals = async () => {
      try {
        setIsLoadingReferrals(true);
        setReferralsLoadError('');
        const response = await axios.get('/api/referrals', {
          headers: {
            Authorization: `Bearer ${storage.getItem('token')}`,
          }
        });
        setMyReferrals(response.data || []);
      } catch (err) {
        console.error('Error fetching my referrals:', err);
        setMyReferrals([]);
        setReferralsLoadError('Could not load your referrals right now. Please refresh the page.');
      } finally {
        setIsLoadingReferrals(false);
      }
    };

    if (isAuthenticated) {
      fetchReferrals();
    }
  }, [isAuthenticated, successMessage]); // Refetch when a new referral is successfully created

  useEffect(() => {
    // Update selected hospital when referralHospital changes
    if (formData.referralHospital) {
      const hospital = higherHospitals.find(h => h.id === formData.referralHospital) || null;
      setSelectedHospital(hospital);
      setShowHospitalDetails(!!hospital);
    } else {
      setSelectedHospital(null);
      setShowHospitalDetails(false);
    }
  }, [formData.referralHospital, higherHospitals]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, prescription: file }));
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const hospitalOptions = higherHospitals.map(hospital => ({
    value: hospital.id,
    label: `${hospital.hospitalName} (${hospital.availableBeds} beds available)`,
  }));

  const getShortRefId = (id: string) => `REF-${id.slice(0, 8).toUpperCase()}`;

  const displayedReferrals = myReferrals
    .filter((referral) => {
      const term = referralSearch.trim().toLowerCase();
      if (!term) return true;
      return (
        getShortRefId(referral.id).toLowerCase().includes(term) ||
        referral.id.toLowerCase().includes(term) ||
        referral.patientName.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        comparison = a.id.localeCompare(b.id);
      }
      return sortDir === 'asc' ? comparison : -comparison;
    });

  const toggleSort = (field: 'date' | 'id') => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientAge.trim()) {
      newErrors.patientAge = 'Patient age is required';
    } else if (!/^\d+$/.test(formData.patientAge) || parseInt(formData.patientAge) <= 0 || parseInt(formData.patientAge) > 120) {
      newErrors.patientAge = 'Patient age must be a valid number between 1 and 120';
    }

    if (!formData.patientGender) {
      newErrors.patientGender = 'Patient gender is required';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Patient phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.patientPhone.trim())) {
      newErrors.patientPhone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.patientAddress.trim()) {
      newErrors.patientAddress = 'Patient address is required';
    }

    if (!formData.referralReason.trim()) {
      newErrors.referralReason = 'Referral reason is required';
    }

    if (!formData.referralHospital) {
      newErrors.referralHospital = 'Referral hospital is required';
    }

    if (!formData.prescription) {
      newErrors.prescription = 'Prescription is required';
    }

    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = 'Employee code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage('');
    setErrorMessage('');

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Create form data to send file
        const data = new FormData();
        data.append('patientName', formData.patientName);
        data.append('patientAge', formData.patientAge);
        data.append('patientGender', formData.patientGender);
        data.append('patientPhone', formData.patientPhone);
        data.append('patientAddress', formData.patientAddress);
        data.append('medicalHistory', formData.medicalHistory);
        data.append('referralReason', formData.referralReason);
        data.append('referralHospital', formData.referralHospital);
        if (formData.prescription) {
          data.append('prescription', formData.prescription);
        }
        data.append('employeeCode', formData.employeeCode);
        data.append('doctorId', user?.id || '');

        const response = await axios.post('/api/referrals', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${storage.getItem('token')}`,
          }
        });

        setSuccessMessage(`Patient ${formData.patientName} has been successfully referred to the selected hospital.`);

        // Reset form
        setFormData({
          patientName: '',
          patientAge: '',
          patientGender: '',
          patientPhone: '',
          patientAddress: '',
          medicalHistory: '',
          referralReason: '',
          referralHospital: '',
          prescription: null,
          employeeCode: '',
        });
      } catch (err: any) {
        console.error('Referral error:', err);
        setErrorMessage(err.response?.data?.message || 'Failed to create referral. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleGeneratePrescription = () => {
    setShowPrescriptionModal(true);
  };

  const handleClosePrescription = () => {
    setShowPrescriptionModal(false);
  };

  const handlePrescriptionDownloaded = () => {
    setShowPrescriptionModal(false);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1100;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Prescription', canvas.width / 2, 80);

        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(user?.hospitalName || 'ResQBed Health Services', canvas.width / 2, 120);

        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 140);
        ctx.lineTo(canvas.width - 50, 140);
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Patient: ${formData.patientName}`, 50, 180);
        ctx.fillText(`Age: ${formData.patientAge} years`, 50, 210);
        ctx.fillText(`Gender: ${formData.patientGender}`, 50, 240);
        ctx.fillText(`Diagnosis: ${diagnosis}`, 50, 270);

        ctx.fillText('Medications:', 50, 310);
        let yPos = 340;
        medications.forEach((med, index) => {
          ctx.font = '14px sans-serif';
          ctx.fillText(`${index + 1}. ${med.name} - ${med.dosage}`, 70, yPos);
          ctx.fillText(`   ${med.frequency}, for ${med.duration}`, 70, yPos + 25);
          yPos += 60;
        });

        if (additionalNotes) {
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('Additional Notes:', 50, yPos);
          ctx.font = '14px sans-serif';
          ctx.fillText(additionalNotes, 70, yPos + 30);
          yPos += 60;
        }

        if (formData.referralReason) {
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('Referral Reason:', 50, yPos);
          ctx.font = '14px sans-serif';
          ctx.fillText(formData.referralReason, 70, yPos + 30);
          yPos += 60;
        }

        const date = new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`Date: ${date}`, canvas.width - 50, 180);

        ctx.font = 'italic 16px sans-serif';
        ctx.fillText('Digitally signed by', canvas.width - 50, yPos);
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`Dr. ${user?.firstName || ''} ${user?.lastName || ''}`, canvas.width - 50, yPos + 30);
        ctx.font = '12px sans-serif';
        ctx.fillText(`Employee Code: ${user?.employeeCode || 'N/A'}`, canvas.width - 50, yPos + 50);

        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.download = `prescription-${formData.patientName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();

        const prescriptionFile = dataURLtoFile(
          dataUrl,
          `prescription-${formData.patientName.replace(/\s+/g, '-').toLowerCase()}.png`
        );

        handleFileChange(prescriptionFile);
      }
    } catch (error) {
      console.error('Error generating prescription:', error);
      alert('Failed to generate prescription. Please try again.');
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handlePrintReferral = (referral: Referral) => {
    try {
      const doc = new jsPDF();
      const leftMargin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 20;

      const drawHeading = (text: string) => {
        y += 12;
        doc.setTextColor(220, 38, 38); // red-600
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(text, leftMargin, y);
        y += 2;
      };

      const drawLine = (label: string, value: string) => {
        y += 8;
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const wrapped = doc.splitTextToSize(`${label}: ${value || 'N/A'}`, pageWidth - leftMargin * 2);
        doc.text(wrapped, leftMargin, y);
        y += (wrapped.length - 1) * 6;
      };

      const drawDivider = () => {
        y += 6;
        doc.setDrawColor(229, 231, 235);
        doc.line(leftMargin, y, pageWidth - leftMargin, y);
      };

      // Header
      doc.setTextColor(220, 38, 38);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('ResQBed Referral Slip', pageWidth / 2, y, { align: 'center' });
      y += 6;
      doc.setDrawColor(220, 38, 38);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, y, pageWidth - leftMargin, y);

      // Patient details
      drawHeading('Patient Details');
      drawLine('Name', referral.patientName);
      drawLine('Age', `${referral.patientAge} years`);
      drawLine('Gender', referral.patientGender);
      drawLine('Phone', referral.patientPhone || 'N/A');
      drawLine('Address', referral.patientAddress || 'N/A');

      drawDivider();

      // Referral details
      drawHeading('Referral Details');
      drawLine('Reason', referral.referralReason);
      drawLine('Medical History', referral.medicalHistory || 'None provided');
      drawLine('Status', referral.status.charAt(0).toUpperCase() + referral.status.slice(1));
      drawLine('Submitted On', new Date(referral.createdAt).toLocaleString('en-IN'));

      drawDivider();

      // Referring doctor
      drawHeading('Referring Doctor');
      drawLine('Name', `Dr. ${referral.referringDoctor?.firstName || ''} ${referral.referringDoctor?.lastName || ''}`.trim());
      drawLine('Hospital', referral.referringDoctor?.hospitalName || 'N/A');
      drawLine('Employee Code', referral.referringDoctor?.employeeCode || 'N/A');

      drawDivider();

      // Receiving hospital — the contact details the patient needs
      drawHeading('Referred To');
      drawLine('Hospital', referral.targetHospital?.hospitalName || 'N/A');
      drawLine('Address', referral.targetHospital?.address || 'N/A');
      drawLine('Contact Number', referral.targetHospital?.contactNumber || 'N/A');

      y += 14;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      const footerText = doc.splitTextToSize(
        'Please carry this slip and contact the hospital above to confirm bed availability before travel.',
        pageWidth - leftMargin * 2
      );
      doc.text(footerText, pageWidth / 2, y, { align: 'center' });

      doc.save(`referral-${referral.patientName.replace(/\s+/g, '-').toLowerCase()}-${referral.id.slice(0, 8)}.pdf`);
    } catch (error) {
      console.error('Error generating referral slip:', error);
      alert('Failed to generate referral slip. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner variant="throbber" className="text-red-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-start flex-wrap gap-4 mb-2">
        <h1 className="text-2xl font-bold text-red-600">Doctor Dashboard</h1>
        <Link
          href="/blood-availability"
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-4 py-2 rounded-md shadow-sm transition-colors"
        >
          <Droplet className="w-4 h-4" />
          See Blood Availability
        </Link>
      </div>
      {user && (
        <p className="text-gray-600 mb-6">
          Welcome, Dr. {user.firstName} {user.lastName}
        </p>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Referral</h2>

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}

        {hospitalsLoadError && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4" role="alert">
            <p>{hospitalsLoadError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="patientName"
              label="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              name="patientName"
              required
              error={errors.patientName}
            />

            <Input
              id="patientAge"
              label="Patient Age"
              value={formData.patientAge}
              onChange={handleChange}
              name="patientAge"
              required
              error={errors.patientAge}
            />

            <Select
              id="patientGender"
              label="Patient Gender"
              value={formData.patientGender}
              onChange={handleChange}
              name="patientGender"
              options={genderOptions}
              required
              error={errors.patientGender}
            />

            <Input
              id="patientPhone"
              label="Patient Phone Number"
              value={formData.patientPhone}
              onChange={handleChange}
              name="patientPhone"
              placeholder="10-digit mobile number"
              required
              error={errors.patientPhone}
            />

            <div className="md:col-span-2">
              <label htmlFor="patientAddress" className="form-label">
                Patient Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="patientAddress"
                name="patientAddress"
                value={formData.patientAddress}
                onChange={handleChange}
                rows={2}
                autoComplete="off"
                className={`input-field ${errors.patientAddress ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Patient's current address, so the hospital can reach them"
                required
              ></textarea>
              {errors.patientAddress && <p className="error-message">{errors.patientAddress}</p>}
            </div>

            <Select
              id="referralHospital"
              label="Refer to Hospital"
              value={formData.referralHospital}
              onChange={handleChange}
              name="referralHospital"
              options={hospitalOptions}
              required
              error={errors.referralHospital}
            />

            {showHospitalDetails && selectedHospital && (
              <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200 mb-2">
                <h3 className="text-md font-semibold text-blue-800 mb-2">Hospital Resource Availability</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 block">Regular Beds:</span>
                    <span className={`font-semibold ${selectedHospital.availableBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedHospital.availableBeds} / {selectedHospital.totalBeds}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">ICU Beds:</span>
                    <span className={`font-semibold ${selectedHospital.availableICUBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedHospital.availableICUBeds} / {selectedHospital.totalICUBeds}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Ventilators:</span>
                    <span className={`font-semibold ${selectedHospital.availableVentilators === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedHospital.availableVentilators} / {selectedHospital.totalVentilators}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Oxygen Cylinders:</span>
                    <span className={`font-semibold ${selectedHospital.availableOxygenCylinders === 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedHospital.availableOxygenCylinders} / {selectedHospital.oxygenCylinders}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Address: {selectedHospital.address}
                </p>
              </div>
            )}

            <div className="md:col-span-2">
              <label htmlFor="medicalHistory" className="form-label">
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows={3}
                autoComplete="off"
                className="input-field"
                placeholder="Enter patient's medical history (optional)"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="referralReason" className="form-label">
                Reason for Referral <span className="text-red-500">*</span>
              </label>
              <textarea
                id="referralReason"
                name="referralReason"
                value={formData.referralReason}
                onChange={handleChange}
                rows={3}
                autoComplete="off"
                className={`input-field ${errors.referralReason ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter detailed reason for referring this patient"
                required
              ></textarea>
              {errors.referralReason && <p className="error-message">{errors.referralReason}</p>}
            </div>

            <div className="md:col-span-2 flex justify-between items-start">
              <div className="w-full mr-4">
                <FileUpload
                  id="prescription"
                  label="Upload Prescription"
                  accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
                  required
                  error={errors.prescription}
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="button"
                onClick={handleGeneratePrescription}
                className="btn-secondary whitespace-nowrap mt-6"
              >
                Generate Prescription
              </button>
            </div>

            <Input
              id="employeeCode"
              label="Your Employee Code"
              value={formData.employeeCode}
              onChange={handleChange}
              name="employeeCode"
              required
              error={errors.employeeCode}
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Referral'}
            </Button>
          </div>
        </form>
      </div>

      {/* My Referrals Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Referrals</h2>

        {referralsLoadError && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4" role="alert">
            <p>{referralsLoadError}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={referralSearch}
              onChange={(e) => setReferralSearch(e.target.value)}
              autoComplete="off"
              placeholder="Search by Referral ID or Patient Name"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSort('date')}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors ${
                sortBy === 'date' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Date
              {sortBy === 'date' && (sortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
            </button>
            <button
              onClick={() => toggleSort('id')}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors ${
                sortBy === 'id' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Hash className="w-4 h-4" />
              ID
              {sortBy === 'id' && (sortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
            </button>
          </div>
        </div>

        {isLoadingReferrals ? (
          <div className="flex justify-center items-center h-32">
            <Spinner variant="throbber" className="text-red-600 w-8 h-8" />
          </div>
        ) : displayedReferrals.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
            {myReferrals.length === 0 ? "You haven't made any patient referrals yet." : 'No referrals match your search.'}
          </div>
        ) : (
          <div className="space-y-4">
            {displayedReferrals.map((referral) => (
              <div key={referral.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {referral.patientName} <span className="text-sm font-normal text-gray-500">({referral.patientAge}, {referral.patientGender === 'male' ? 'Male' : referral.patientGender === 'female' ? 'Female' : 'Other'})</span>
                    </h3>
                    <p className="text-xs font-mono text-red-600 font-semibold mt-1">
                      {getShortRefId(referral.id)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Submitted on: {new Date(referral.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        referral.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          referral.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'}`}
                    >
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Medical History</h4>
                    <p className="text-sm text-gray-600">{referral.medicalHistory || 'None provided'}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Referral Reason</h4>
                    <p className="text-sm text-gray-600">{referral.referralReason}</p>
                  </div>
                </div>

                <div className="flex justify-start gap-4">
                  <button
                    className="text-red-600 text-sm font-medium hover:underline focus:outline-none"
                    onClick={() => setSelectedPrescriptionUrl(referral.prescriptionUrl)}
                  >
                    View Prescription Sent
                  </button>
                  <button
                    className="text-red-600 text-sm font-medium hover:underline focus:outline-none"
                    onClick={() => handlePrintReferral(referral)}
                  >
                    Print / Download Referral
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl mx-4 my-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Generate Prescription</h2>
              <button onClick={handleClosePrescription} className="text-gray-500 hover:text-gray-700">
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  id="modalPatientName"
                  label="Patient Name"
                  value={formData.patientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                  required
                />

                <Input
                  id="modalPatientAge"
                  label="Patient Age"
                  value={formData.patientAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                  required
                />

                <Select
                  id="modalPatientGender"
                  label="Patient Gender"
                  value={formData.patientGender}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientGender: e.target.value }))}
                  options={genderOptions}
                  required
                />

                <Input
                  id="diagnosis"
                  label="Diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Medications</h3>
                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-2 rounded"
                  >
                    + Add Medication
                  </button>
                </div>

                {medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Medication #{index + 1}</h4>
                      {medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Input
                        id={`med-name-${index}`}
                        label="Medication Name"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                        required
                      />
                      <Input
                        id={`med-dosage-${index}`}
                        label="Dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        placeholder="e.g., 500mg"
                        required
                      />
                      <Input
                        id={`med-frequency-${index}`}
                        label="Frequency"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        placeholder="e.g., 3 times daily"
                        required
                      />
                      <Input
                        id={`med-duration-${index}`}
                        label="Duration"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        placeholder="e.g., 7 days"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label htmlFor="additionalNotes" className="form-label">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                  autoComplete="off"
                  className="input-field"
                  placeholder="Enter any additional instructions or notes"
                ></textarea>
              </div>

              <div className="mt-8">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Prescription Preview</h3>

                  <Prescription
                    patientName={formData.patientName}
                    patientAge={formData.patientAge}
                    patientGender={formData.patientGender}
                    patientDiagnosis={diagnosis}
                    medications={medications}
                    referralReason={formData.referralReason}
                    additionalNotes={additionalNotes}
                    onDownload={handlePrescriptionDownloaded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {selectedPrescriptionUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Prescription Attached</h2>
              <div className="flex items-center gap-3">
                <a
                  href={selectedPrescriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-red-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in new tab
                </a>
                <a
                  href={selectedPrescriptionUrl}
                  download
                  className="text-sm text-red-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <button
                  onClick={() => setSelectedPrescriptionUrl(null)}
                  className="text-gray-500 hover:text-gray-700 font-bold"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>
            <div className="p-0 flex-grow bg-gray-100 overflow-auto relative flex justify-center items-start" style={{ minHeight: '600px' }}>
              {(() => {
                const url = selectedPrescriptionUrl.toLowerCase();
                const isImage = url.startsWith('data:image') || /\.(jpeg|jpg|gif|png)$/i.test(url);
                const isPdf = url.startsWith('data:application/pdf') || /\.pdf$/i.test(url);

                if (isImage) {
                  return (
                    <img
                      src={selectedPrescriptionUrl}
                      alt="Prescription"
                      className="max-w-full max-h-full object-contain"
                    />
                  );
                }

                if (isPdf) {
                  return (
                    <embed
                      src={selectedPrescriptionUrl}
                      type="application/pdf"
                      className="w-full h-full absolute inset-0"
                    />
                  );
                }

                // Formats browsers can't reliably preview inline (e.g. HEIC)
                return (
                  <div className="flex flex-col items-center gap-3 text-gray-500 p-8 text-center">
                    <FileWarning className="w-12 h-12" />
                    <p>Preview isn't available for this file format in the browser.</p>
                    <div className="flex gap-3 mt-2">
                      <a
                        href={selectedPrescriptionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm"
                      >
                        Open in new tab
                      </a>
                      <a
                        href={selectedPrescriptionUrl}
                        download
                        className="btn-primary text-sm"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <Button onClick={() => setSelectedPrescriptionUrl(null)} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;