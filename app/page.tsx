'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResQSaathi from './components/ResQSaathi';
import { Spinner } from '@/components/kibo-ui/spinner';
import {
  BedDouble,
  HeartPulse,
  Wind,
  Droplets,
  Building2,
  MapPin,
  Navigation,
  Search,
} from 'lucide-react';

interface HospitalStat {
  id: string;
  hospitalName: string;
  hospitalType: string;
  address: string;
  totalBeds: number;
  availableBeds: number;
  totalICUBeds: number;
  availableICUBeds: number;
  totalVentilators: number;
  availableVentilators: number;
  totalOxygenCylinders: number;
  availableOxygenCylinders: number;
  updatedAt: string;
}

interface Totals {
  totalHospitals: number;
  totalBeds: number;
  availableBeds: number;
  totalICUBeds: number;
  availableICUBeds: number;
  totalVentilators: number;
  availableVentilators: number;
  totalOxygenCylinders: number;
  availableOxygenCylinders: number;
}

const StatCard = ({
  icon,
  label,
  available,
  total,
}: {
  icon: React.ReactNode;
  label: string;
  available: number;
  total: number;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center gap-2 mb-2 text-red-600">
      {icon}
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    </div>
    <p className={`text-3xl font-bold ${available === 0 ? 'text-red-600' : 'text-green-600'}`}>
      {available}
      <span className="text-gray-400 text-base font-normal"> / {total}</span>
    </p>
    <div className="mt-3 bg-gray-200 h-2 rounded-full">
      <div
        className={`h-2 rounded-full ${available === 0 ? 'bg-red-600' : 'bg-green-600'}`}
        style={{ width: `${total > 0 ? (available / total) * 100 : 0}%` }}
      ></div>
    </div>
  </div>
);

export default function Home() {
  const [totals, setTotals] = useState<Totals | null>(null);
  const [hospitals, setHospitals] = useState<HospitalStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setTotals(response.data.totals);
        setHospitals(response.data.hospitals || []);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Could not load live stats right now. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Matches hospital name or full address (which typically includes the
  // pincode as part of the string) — covers name, location, and pincode search.
  const filteredHospitals = hospitals.filter((h) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      h.hospitalName.toLowerCase().includes(term) ||
      h.address.toLowerCase().includes(term)
    );
  });

  const getDirectionsUrl = (address: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <ResQSaathi />
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-3">Welcome to ResQBed</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Live bed, ICU, ventilator, and oxygen availability across all registered hospitals — no login required.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by hospital name, location, or pincode"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner variant="throbber" className="text-red-600 w-12 h-12" />
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          {totals && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                icon={<BedDouble className="w-5 h-5" />}
                label="Regular Beds"
                available={totals.availableBeds}
                total={totals.totalBeds}
              />
              <StatCard
                icon={<HeartPulse className="w-5 h-5" />}
                label="ICU Beds"
                available={totals.availableICUBeds}
                total={totals.totalICUBeds}
              />
              <StatCard
                icon={<Wind className="w-5 h-5" />}
                label="Ventilators"
                available={totals.availableVentilators}
                total={totals.totalVentilators}
              />
              <StatCard
                icon={<Droplets className="w-5 h-5" />}
                label="Oxygen Cylinders"
                available={totals.availableOxygenCylinders}
                total={totals.totalOxygenCylinders}
              />
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-600" />
            Hospital-wise Availability
          </h2>

          {filteredHospitals.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
              {hospitals.length === 0 ? 'No hospitals registered yet.' : 'No hospitals match your search.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHospitals.map((h) => (
                <div key={h.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{h.hospitalName}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {h.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600 capitalize whitespace-nowrap">
                        {h.hospitalType} hierarchy
                      </span>
                      <a
                        href={getDirectionsUrl(h.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        aria-label={`Get directions to ${h.hospitalName}`}
                        title="Get directions"
                      >
                        <Navigation className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600 block">Regular Beds:</span>
                      <span className={`font-semibold ${h.availableBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {h.availableBeds} / {h.totalBeds}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">ICU Beds:</span>
                      <span className={`font-semibold ${h.availableICUBeds === 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {h.availableICUBeds} / {h.totalICUBeds}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Ventilators:</span>
                      <span className={`font-semibold ${h.availableVentilators === 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {h.availableVentilators} / {h.totalVentilators}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Oxygen Cylinders:</span>
                      <span className={`font-semibold ${h.availableOxygenCylinders === 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {h.availableOxygenCylinders} / {h.totalOxygenCylinders}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}