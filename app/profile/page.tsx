'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  User as UserIcon,
  Stethoscope,
  Building2,
  Shield,
  Calendar,
  BadgeCheck,
  BadgeX,
  Camera,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { Spinner } from '@/components/kibo-ui/spinner';

// Safe localStorage wrapper to prevent SSR issues
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
};

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess('');

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please select a JPG, PNG, WEBP, or HEIC image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large. Maximum size is 5MB.');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const formData = new FormData();
      formData.append('photo', file);

      await axios.put('/api/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      await refreshUser();
      setUploadSuccess('Profile photo updated successfully.');
    } catch (err: any) {
      console.error('Error uploading profile photo:', err);
      setUploadError(err.response?.data?.message || 'Failed to update profile photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner variant="throbber" className="text-red-600 w-12 h-12" />
      </div>
    );
  }

  const displayPhoto = previewUrl || user.profilePhotoUrl || '/images/default-profile.png';
  const isDoctor = user.userType === 'doctor';
  const isHospital = user.userType === 'hospital';

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-red-600 mb-1">Profile Settings</h1>
      <p className="text-gray-600 mb-6">View your account details and update your profile photo.</p>

      {/* Photo + identity card */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-red-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayPhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full">
                  <Spinner variant="throbber" className="text-white w-8 h-8" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 w-9 h-9 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors disabled:opacity-50"
              aria-label="Change profile photo"
              title="Change profile photo"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {isDoctor ? `Dr. ${user.firstName} ${user.lastName}` : user.hospitalName || `${user.firstName} ${user.lastName}`}
            </h2>
            <p className="text-sm text-gray-500 mb-2">@{user.username}</p>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              isDoctor ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
            }`}>
              {isDoctor ? <Stethoscope className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
              {isDoctor ? 'Doctor Account' : 'Hospital Account'}
            </span>

            {uploadSuccess && (
              <p className="text-xs text-green-600 mt-2">{uploadSuccess}</p>
            )}
            {uploadError && (
              <p className="text-xs text-red-600 mt-2">{uploadError}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG, WEBP, or HEIC — max 5MB. This is the only detail you can update yourself.
            </p>
          </div>
        </div>
      </div>

      {/* Contact admin notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-800">Contact Admin for changes in sensitive details</p>
          <p className="text-sm text-yellow-700 mt-0.5">
            Your name, username, employee code, hospital affiliation, and other account details cannot be edited here
            to keep referral and hospital records accurate and verifiable. If any of this information is incorrect
            or needs to change, please contact the ResQBed admin team.
          </p>
        </div>
      </div>

      {/* Account details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-red-600" />
          Personal Details
        </h3>
        <InfoRow icon={<UserIcon className="w-4 h-4" />} label="First Name" value={user.firstName} />
        <InfoRow icon={<UserIcon className="w-4 h-4" />} label="Last Name" value={user.lastName} />
        <InfoRow icon={<Lock className="w-4 h-4" />} label="Username" value={user.username} />
        <InfoRow
          icon={user.isActive ? <BadgeCheck className="w-4 h-4 text-green-600" /> : <BadgeX className="w-4 h-4 text-red-600" />}
          label="Account Status"
          value={
            <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          }
        />
        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Member Since" value={memberSince} />
      </div>

      {/* Role-specific details */}
      {isDoctor && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-red-600" />
            Professional Details
          </h3>
          <InfoRow icon={<Building2 className="w-4 h-4" />} label="Affiliated Hospital" value={user.hospitalName || 'N/A'} />
          <InfoRow icon={<Shield className="w-4 h-4" />} label="Employee Code" value={user.employeeCode || 'N/A'} />
        </div>
      )}

      {isHospital && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-600" />
            Hospital Details
          </h3>
          <InfoRow icon={<Building2 className="w-4 h-4" />} label="Hospital Name" value={user.hospitalName || 'N/A'} />
          <p className="text-xs text-gray-400 mt-3">
            Bed, ICU, ventilator, and oxygen counts are managed from your dashboard, not here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;