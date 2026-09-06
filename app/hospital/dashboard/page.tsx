'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Spinner } from '@/components/kibo-ui/spinner';
import { Droplet, Search, CalendarDays, ArrowUp, ArrowDown, Hash, ExternalLink, Download, FileWarning } from 'lucide-react';

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

interface Referral {
  id: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  medicalHistory: string;
  referralReason: string;
  prescriptionUrl: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  referringDoctor: {
    id: string;
    firstName: string;
    lastName: string;
    hospitalName: string;
    employeeCode: string;
  };
  createdAt: string;
  isUpdating?: boolean;
}

interface ResourceUpdateData {
  availableBeds?: number;
  availableICUBeds?: number;
  availableVentilators?: number;
  availableOxygenCylinders?: number;
}

const HospitalDashboard = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Resource states
  const [totalBeds, setTotalBeds] = useState<number>(0);
  const [availableBeds, setAvailableBeds] = useState<number>(0);
  const [totalICUBeds, setTotalICUBeds] = useState<number>(0);
  const [availableICUBeds, setAvailableICUBeds] = useState<number>(0);
  const [totalVentilators, setTotalVentilators] = useState<number>(0);
  const [availableVentilators, setAvailableVentilators] = useState<number>(0);
  const [totalOxygenCylinders, setTotalOxygenCylinders] = useState<number>(0);
  const [availableOxygenCylinders, setAvailableOxygenCylinders] = useState<number>(0);

  // UI states
  const [isUpdatingResources, setIsUpdatingResources] = useState(false);
  const [resourceInputs, setResourceInputs] = useState({
    availableBeds: '',
    availableICUBeds: '',
    availableVentilators: '',
    availableOxygenCylinders: '',
  });
  const [resourceErrors, setResourceErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(true);
  const [dataLoadError, setDataLoadError] = useState('');
  const [selectedPrescriptionUrl, setSelectedPrescriptionUrl] = useState<string | null>(null);
  const [selectedReferralId, setSelectedReferralId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in or not a hospital
    if (!isLoading && (!isAuthenticated || (user && user.userType !== 'hospital'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  useEffect(() => {
    // Fetch hospital data and referrals
    const fetchData = async () => {
      if (!isAuthenticated || !user) return;

      setDataLoadError('');

      try {
        // Fetch hospital details (including bed information)
        const hospitalResponse = await axios.get(`/api/available_beds/${user.id}`, {
          headers: {
            Authorization: `Bearer ${storage.getItem('token')}`,
          }
        });

        const hospitalData = hospitalResponse.data;

        setTotalBeds(hospitalData.totalBeds || 0);
        setAvailableBeds(hospitalData.availableBeds || 0);
        setTotalICUBeds(hospitalData.totalICUBeds || 0);
        setAvailableICUBeds(hospitalData.availableICUBeds || 0);
        setTotalVentilators(hospitalData.totalVentilators || 0);
        setAvailableVentilators(hospitalData.availableVentilators || 0);
        setTotalOxygenCylinders(hospitalData.oxygenCylinders || 0);
        setAvailableOxygenCylinders(hospitalData.availableOxygenCylinders || 0);

        // Fetch referrals for this hospital
        const referralsResponse = await axios.get('/api/referrals', {
          headers: {
            Authorization: `Bearer ${storage.getItem('token')}`,
          }
        });

        setReferrals(referralsResponse.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDataLoadError('Could not load hospital data right now. Please refresh the page.');
        setReferrals([]);
      } finally {
        setIsLoadingReferrals(false);
      }
    };

    if (isAuthenticated && !isLoading) {
      fetchData();
    }
  }, [isAuthenticated, isLoading, user]);

  const [referralSearch, setReferralSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'id'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const getShortRefId = (id: string) => `REF-${id.slice(0, 8).toUpperCase()}`;

  const toggleSort = (field: 'date' | 'id') => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const displayedReferrals = referrals
    .filter((referral) => statusFilter === 'all' || referral.status === statusFilter)
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

  const handleStatusChange = async (referralId: string, newStatus: string) => {
    try {
      setSuccessMessage('');
      setErrorMessage('');

      const referralToUpdate = referrals.find(r => r.id === referralId);
      if (!referralToUpdate) {
        setErrorMessage('Referral not found');
        return;
      }

      if (referralToUpdate.status === newStatus) {
        return;
      }

      const updatedReferrals = referrals.map((referral) => {
        if (referral.id === referralId) {
          return {
            ...referral,
            isUpdating: true
          };
        }
        return referral;
      });
      setReferrals(updatedReferrals as Referral[]);

      try {
        await axios.put(
          `/api/referrals/${referralId}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${storage.getItem('token')}`,
            }
          }
        );

        const updatedReferrals2 = referrals.map((referral) => {
          if (referral.id === referralId) {
            return {
              ...referral,
              status: newStatus as 'pending' | 'accepted' | 'rejected' | 'completed',
              isUpdating: false
            };
          }
          return referral;
        });

        setReferrals(updatedReferrals2 as Referral[]);
        setSuccessMessage(`Referral status updated to ${newStatus}`);

        if (newStatus === 'accepted' && availableBeds <= 0) {
          setErrorMessage('Warning: No beds available. Please update bed availability.');
        }
      } catch (error) {
        const revertedReferrals = referrals.map((referral) => {
          if (referral.id === referralId) {
            return {
              ...referral,
              isUpdating: false
            };
          }
          return referral;
        });
        setReferrals(revertedReferrals as Referral[]);
        throw error;
      }
    } catch (err: any) {
      console.error('Error updating referral status:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to update referral status');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResourceInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateResourceInputs = () => {
    const errors: Record<string, string> = {};

    if (resourceInputs.availableBeds && (
      isNaN(Number(resourceInputs.availableBeds)) ||
      Number(resourceInputs.availableBeds) < 0 ||
      Number(resourceInputs.availableBeds) > totalBeds
    )) {
      errors.availableBeds = `Must be between 0 and ${totalBeds}`;
    }

    if (resourceInputs.availableICUBeds && (
      isNaN(Number(resourceInputs.availableICUBeds)) ||
      Number(resourceInputs.availableICUBeds) < 0 ||
      Number(resourceInputs.availableICUBeds) > totalICUBeds
    )) {
      errors.availableICUBeds = `Must be between 0 and ${totalICUBeds}`;
    }

    if (resourceInputs.availableVentilators && (
      isNaN(Number(resourceInputs.availableVentilators)) ||
      Number(resourceInputs.availableVentilators) < 0 ||
      Number(resourceInputs.availableVentilators) > totalVentilators
    )) {
      errors.availableVentilators = `Must be between 0 and ${totalVentilators}`;
    }

    if (resourceInputs.availableOxygenCylinders && (
      isNaN(Number(resourceInputs.availableOxygenCylinders)) ||
      Number(resourceInputs.availableOxygenCylinders) < 0 ||
      Number(resourceInputs.availableOxygenCylinders) > totalOxygenCylinders
    )) {
      errors.availableOxygenCylinders = `Must be between 0 and ${totalOxygenCylinders}`;
    }

    setResourceErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateResources = async (e: React.FormEvent) => {
    e.preventDefault();

    setResourceErrors({});
    setSuccessMessage('');
    setErrorMessage('');

    if (validateResourceInputs()) {
      setIsUpdatingResources(true);

      const updateData: ResourceUpdateData = {};

      if (resourceInputs.availableBeds) {
        updateData.availableBeds = Number(resourceInputs.availableBeds);
      }

      if (resourceInputs.availableICUBeds) {
        updateData.availableICUBeds = Number(resourceInputs.availableICUBeds);
      }

      if (resourceInputs.availableVentilators) {
        updateData.availableVentilators = Number(resourceInputs.availableVentilators);
      }

      if (resourceInputs.availableOxygenCylinders) {
        updateData.availableOxygenCylinders = Number(resourceInputs.availableOxygenCylinders);
      }

      if (Object.keys(updateData).length === 0) {
        setErrorMessage('Please provide at least one resource to update');
        setIsUpdatingResources(false);
        return;
      }

      try {
        const response = await axios.put(
          `/api/available_beds/${user?.id}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${storage.getItem('token')}`,
            }
          }
        );

        const updatedHospital = response.data.hospital;

        setAvailableBeds(updatedHospital.availableBeds);
        setAvailableICUBeds(updatedHospital.availableICUBeds);
        setAvailableVentilators(updatedHospital.availableVentilators);
        setAvailableOxygenCylinders(updatedHospital.availableOxygenCylinders);

        setResourceInputs({
          availableBeds: '',
          availableICUBeds: '',
          availableVentilators: '',
          availableOxygenCylinders: '',
        });

        setSuccessMessage('Resources updated successfully');
      } catch (err: any) {
        console.error('Error updating resources:', err);
        setErrorMessage(err.response?.data?.message || 'Failed to update resources');
      } finally {
        setIsUpdatingResources(false);
      }
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Referrals' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' },
  ];

  const referralStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accept' },
    { value: 'rejected', label: 'Reject' },
    { value: 'completed', label: 'Complete' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner variant="throbber" className="text-red-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-start flex-wrap gap-4 mb-2">
        <h1 className="text-2xl font-bold text-red-600">Hospital Dashboard</h1>
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
          Welcome, {user.hospitalName || user.firstName + ' ' + user.lastName}
        </p>
      )}

      {dataLoadError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4" role="alert">
          <p>{dataLoadError}</p>
        </div>
      )}

      {/* Resource Management Section */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resource Availability</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Regular Beds */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Regular Beds</h3>
            <p className={`text-2xl font-bold ${availableBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
              {availableBeds} <span className="text-gray-400 text-sm font-normal">/ {totalBeds}</span>
            </p>
            <div className="mt-2 bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full ${availableBeds === 0 ? 'bg-red-600' : 'bg-green-600'}`}
                style={{ width: `${totalBeds > 0 ? (availableBeds / totalBeds) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* ICU Beds */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">ICU Beds</h3>
            <p className={`text-2xl font-bold ${availableICUBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
              {availableICUBeds} <span className="text-gray-400 text-sm font-normal">/ {totalICUBeds}</span>
            </p>
            <div className="mt-2 bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full ${availableICUBeds === 0 ? 'bg-red-600' : 'bg-green-600'}`}
                style={{ width: `${totalICUBeds > 0 ? (availableICUBeds / totalICUBeds) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Ventilators */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Ventilators</h3>
            <p className={`text-2xl font-bold ${availableVentilators === 0 ? 'text-red-600' : 'text-green-600'}`}>
              {availableVentilators} <span className="text-gray-400 text-sm font-normal">/ {totalVentilators}</span>
            </p>
            <div className="mt-2 bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full ${availableVentilators === 0 ? 'bg-red-600' : 'bg-green-600'}`}
                style={{ width: `${totalVentilators > 0 ? (availableVentilators / totalVentilators) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Oxygen Cylinders */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Oxygen Cylinders</h3>
            <p className={`text-2xl font-bold ${availableOxygenCylinders === 0 ? 'text-red-600' : 'text-green-600'}`}>
              {availableOxygenCylinders} <span className="text-gray-400 text-sm font-normal">/ {totalOxygenCylinders}</span>
            </p>
            <div className="mt-2 bg-gray-200 h-2 rounded-full">
              <div
                className={`h-2 rounded-full ${availableOxygenCylinders === 0 ? 'bg-red-600' : 'bg-green-600'}`}
                style={{ width: `${totalOxygenCylinders > 0 ? (availableOxygenCylinders / totalOxygenCylinders) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateResources} className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Resource Availability</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Input
                id="availableBeds"
                label="Available Regular Beds"
                value={resourceInputs.availableBeds}
                onChange={handleInputChange}
                name="availableBeds"
                placeholder={availableBeds.toString()}
                error={resourceErrors.availableBeds}
              />
            </div>

            <div>
              <Input
                id="availableICUBeds"
                label="Available ICU Beds"
                value={resourceInputs.availableICUBeds}
                onChange={handleInputChange}
                name="availableICUBeds"
                placeholder={availableICUBeds.toString()}
                error={resourceErrors.availableICUBeds}
              />
            </div>

            <div>
              <Input
                id="availableVentilators"
                label="Available Ventilators"
                value={resourceInputs.availableVentilators}
                onChange={handleInputChange}
                name="availableVentilators"
                placeholder={availableVentilators.toString()}
                error={resourceErrors.availableVentilators}
              />
            </div>

            <div>
              <Input
                id="availableOxygenCylinders"
                label="Available Oxygen Cylinders"
                value={resourceInputs.availableOxygenCylinders}
                onChange={handleInputChange}
                name="availableOxygenCylinders"
                placeholder={availableOxygenCylinders.toString()}
                error={resourceErrors.availableOxygenCylinders}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isUpdatingResources}
          >
            {isUpdatingResources ? 'Updating...' : 'Update Resources'}
          </Button>
        </form>
      </div>

      {/* Success/Error Messages */}
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

      {/* Referrals Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-800">Patient Referrals</h2>

          <div className="w-48">
            <Select
              id="statusFilter"
              label=""
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
          </div>
        </div>

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
            {referrals.length === 0 ? 'No referrals found.' : 'No referrals match your search.'}
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
                    <p className="text-sm text-gray-500 mt-0.5">
                      Referred by Dr. {referral.referringDoctor.firstName} {referral.referringDoctor.lastName} ({referral.referringDoctor.hospitalName})
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(referral.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 
                      ${referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        referral.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          referral.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'}`}
                    >
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>


                    {referral.isUpdating ? (
                      <div className="w-32 flex items-center justify-center">
                        <Spinner variant="throbber" className="text-red-600 w-5 h-5" />
                      </div>
                    ) : (
                      <Select
                        id={`status-${referral.id}`}
                        label=""
                        value={referral.status}
                        onChange={(e) => handleStatusChange(referral.id, e.target.value)}
                        options={referralStatusOptions}
                        className="w-32"
                      />
                    )}
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

                <div className="flex justify-between items-center">
                  <a
                    href={referral.prescriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 text-sm font-medium hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPrescriptionUrl(referral.prescriptionUrl);
                      setSelectedReferralId(referral.id);
                    }}
                  >
                    View Prescription
                  </a>

                  <p className="text-xs text-gray-500">
                    Doctor ID: {referral.referringDoctor.employeeCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {selectedPrescriptionUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Patient Prescription</h2>
                {selectedReferralId && (
                  <p className="text-xs font-mono text-red-600 font-semibold mt-0.5">
                    {getShortRefId(selectedReferralId)}
                  </p>
                )}
              </div>
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
                  onClick={() => {
                    setSelectedPrescriptionUrl(null);
                    setSelectedReferralId(null);
                  }}
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
              <Button
                onClick={() => {
                  setSelectedPrescriptionUrl(null);
                  setSelectedReferralId(null);
                }}
                variant="secondary"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;