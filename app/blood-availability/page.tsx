'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Droplet, Building2, MapPin, Pencil, Save, X, Search, ArrowUpDown } from 'lucide-react';
import { Spinner } from '@/components/kibo-ui/spinner';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
type BloodGroup = (typeof BLOOD_GROUPS)[number];

interface HospitalBlood {
  hospitalId: string;
  hospitalName: string;
  hospitalType: string;
  address: string;
  bloodUnits: Record<BloodGroup, number>;
  updatedAt: string | null;
}

// Safe localStorage wrapper to prevent SSR issues
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
};

const unitColor = (units: number) => {
  if (units === 0) return 'text-red-600';
  if (units < 5) return 'text-yellow-600';
  return 'text-green-600';
};

export default function BloodAvailabilityPage() {
  const { user, isAuthenticated } = useAuth();
  const [hospitals, setHospitals] = useState<HospitalBlood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editValues, setEditValues] = useState<Record<BloodGroup, string>>(
    Object.fromEntries(BLOOD_GROUPS.map((g) => [g, ''])) as Record<BloodGroup, string>
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/blood-availability');
      setHospitals(response.data.hospitals || []);
    } catch (err) {
      console.error('Error fetching blood availability:', err);
      setError('Could not load blood availability right now. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isHospitalUser = isAuthenticated && user?.userType === 'hospital';
  const ownRecord = hospitals.find((h) => h.hospitalId === user?.id);

  const displayedHospitals = hospitals
    .filter((h) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;

      const matchedGroup = BLOOD_GROUPS.find((g) => g.toLowerCase() === term);
      if (matchedGroup) {
        return h.bloodUnits[matchedGroup] > 0;
      }

      return (
        h.hospitalName.toLowerCase().includes(term) ||
        h.address.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'name-asc') return a.hospitalName.localeCompare(b.hospitalName);
      if (sortOption === 'name-desc') return b.hospitalName.localeCompare(a.hospitalName);
      if (sortOption === 'city-asc') return a.address.localeCompare(b.address);
      if (sortOption === 'city-desc') return b.address.localeCompare(a.address);
      // Blood group sort options are formatted as "group:<BloodGroup>"
      if (sortOption.startsWith('group:')) {
        const group = sortOption.replace('group:', '') as BloodGroup;
        return b.bloodUnits[group] - a.bloodUnits[group];
      }
      return 0;
    });

  const startEditing = () => {
    if (!ownRecord) return;
    setEditValues(
      Object.fromEntries(BLOOD_GROUPS.map((g) => [g, String(ownRecord.bloodUnits[g] ?? 0)])) as Record<BloodGroup, string>
    );
    setSaveError('');
    setSaveSuccess('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaveError('');
    setSaveSuccess('');

    const bloodUnits: Record<string, number> = {};
    for (const g of BLOOD_GROUPS) {
      const num = Number(editValues[g]);
      if (isNaN(num) || num < 0) {
        setSaveError(`Enter a valid non-negative number for ${g}.`);
        return;
      }
      bloodUnits[g] = num;
    }

    setIsSaving(true);
    try {
      await axios.put(
        '/api/blood-availability',
        { bloodUnits },
        { headers: { Authorization: `Bearer ${storage.getItem('token')}` } }
      );
      setSaveSuccess('Blood inventory updated successfully.');
      setIsEditing(false);
      await fetchData();
    } catch (err: any) {
      console.error('Error updating blood inventory:', err);
      setSaveError(err.response?.data?.message || 'Failed to update. Please try again.');
    } finally {
      setIsSaving(false);
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
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
          <Droplet className="w-7 h-7" />
          Live Blood Availability
        </h1>
        <p className="text-gray-600">
          Blood group-wise unit availability across {hospitals.length} registered hospitals.
        </p>
      </div>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>{saveSuccess}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            placeholder="Search by hospital name, city, or blood group (e.g. O+)"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
          />
        </div>
        <div className="relative sm:w-64">
          <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm appearance-none bg-white"
          >
            <option value="name-asc">Hospital Name (A-Z)</option>
            <option value="name-desc">Hospital Name (Z-A)</option>
            <option value="city-asc">City / Location (A-Z)</option>
            <option value="city-desc">City / Location (Z-A)</option>
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={`group:${g}`}>
                {g} Availability (High to Low)
              </option>
            ))}
          </select>
        </div>
      </div>

      {hospitals.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          No hospitals registered yet.
        </div>
      ) : displayedHospitals.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          No hospitals match your search.
        </div>
      ) : (
        <div className="space-y-4">
          {displayedHospitals.map((h) => {
            const isOwn = isHospitalUser && h.hospitalId === user?.id;
            const editingThis = isOwn && isEditing;

            return (
              <div
                key={h.hospitalId}
                className={`bg-white p-6 rounded-lg border shadow-sm ${isOwn ? 'border-red-300' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-red-600" />
                      {h.hospitalName}
                      {isOwn && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                          Your Hospital
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {h.address}
                    </p>
                  </div>

                  {isOwn && !editingThis && (
                    <button
                      onClick={startEditing}
                      className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 flex-shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                      Update
                    </button>
                  )}
                  {editingThis && (
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md disabled:opacity-50"
                      >
                        {isSaving ? (
                          <Spinner variant="throbber" className="text-white w-4 h-4" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </button>
                    </div>
                  )}
                </div>

                {saveError && editingThis && (
                  <p className="text-sm text-red-600 mb-3">{saveError}</p>
                )}

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {BLOOD_GROUPS.map((group) => (
                    <div key={group} className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-gray-500 mb-1">{group}</p>
                      {editingThis ? (
                        <input
                          type="number"
                          min={0}
                          autoComplete="off"
                          value={editValues[group]}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, [group]: e.target.value }))
                          }
                          className="w-full text-center text-sm font-bold border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        />
                      ) : (
                        <p className={`text-lg font-bold ${unitColor(h.bloodUnits[group])}`}>
                          {h.bloodUnits[group]}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-0.5">units</p>
                    </div>
                  ))}
                </div>

                {h.updatedAt && (
                  <p className="text-xs text-gray-400 mt-3">
                    Last updated: {new Date(h.updatedAt).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}