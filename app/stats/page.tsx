'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BedDouble, HeartPulse, Wind, Droplets, Building2, MapPin } from 'lucide-react';

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

export default function StatsPage() {
  const [totals, setTotals] = useState<Totals | null>(null);
  const [hospitals, setHospitals] = useState<HospitalStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Live Hospital Availability</h1>
        <p className="text-gray-600">
          Real-time bed, ICU, ventilator, and oxygen availability across {totals?.totalHospitals ?? 0} registered hospitals — no login required.
        </p>
      </div>

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

      {hospitals.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          No hospitals registered yet.
        </div>
      ) : (
        <div className="space-y-4">
          {hospitals.map((h) => (
            <div key={h.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{h.hospitalName}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {h.address}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-red-600 capitalize">
                  {h.hospitalType} hierarchy
                </span>
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
    </div>
  );
}