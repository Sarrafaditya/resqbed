'use client';

import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

interface PrescriptionProps {
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientDiagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  referralReason?: string;
  additionalNotes?: string;
  onDownload?: () => void;
}

const Prescription: React.FC<PrescriptionProps> = ({
  patientName,
  patientAge,
  patientGender,
  patientDiagnosis,
  medications,
  referralReason,
  additionalNotes,
  onDownload
}) => {
  const { user } = useAuth();
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  const doctorName = user ? `${user.firstName} ${user.lastName}` : 'Doctor Name';
  const employeeCode = user ? user.employeeCode || 'N/A' : 'N/A';
  const hospitalName = user?.hospitalName || 'Bihar Health Services';

  const savePrescriptionAsImage = () => {
    if (typeof window !== 'undefined' && prescriptionRef.current) {
      // This would normally use html2canvas or similar library to create a downloadable image
      console.log('Downloading prescription as image');
      if (onDownload) onDownload();

      // In a real implementation:
      // html2canvas(prescriptionRef.current).then(canvas => {
      //   const image = canvas.toDataURL('image/png');
      //   const a = document.createElement('a');
      //   a.href = image;
      //   a.download = `prescription-${patientName.replace(/\s+/g, '-').toLowerCase()}.png`;
      //   a.click();
      // });
      
      alert('Prescription downloaded (demo only)');
    }
  };

  return (
    <div className="w-full">
      <div 
        ref={prescriptionRef}
        className="border-2 border-gray-300 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto font-serif"
      >
        {/* Header */}
        <div className="border-b-2 border-red-600 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-red-600">{hospitalName}</h1>
              <p className="text-sm text-gray-600">Bihar, India</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">Date: {currentDate}</p>
              <p className="text-sm">Rx No: {Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</p>
            </div>
          </div>
        </div>

        {/* Doctor & Patient Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Patient Information</h2>
            <p className="text-sm"><span className="font-medium">Name:</span> {patientName}</p>
            <p className="text-sm"><span className="font-medium">Age:</span> {patientAge} years</p>
            <p className="text-sm"><span className="font-medium">Gender:</span> {patientGender}</p>
            <p className="text-sm"><span className="font-medium">Diagnosis:</span> {patientDiagnosis}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold mb-1">Doctor Information</h2>
            <p className="text-sm"><span className="font-medium">Dr.</span> {doctorName}</p>
            <p className="text-sm">Employee Code: {employeeCode}</p>
            <p className="text-sm">Bihar Medical Council</p>
          </div>
        </div>

        {/* Rx Symbol */}
        <div className="mb-4">
          <span className="text-2xl font-bold italic">Rx</span>
        </div>

        {/* Medications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">Medications</h2>
          <ul className="list-decimal pl-5 space-y-2">
            {medications.map((med, index) => (
              <li key={index} className="text-sm">
                <div className="font-medium">{med.name}</div>
                <div className="ml-4 text-gray-700">
                  {med.dosage}, {med.frequency}, for {med.duration}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Referral Reason (if any) */}
        {referralReason && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">Referral Reason</h2>
            <p className="text-sm text-gray-700">{referralReason}</p>
          </div>
        )}

        {/* Additional Notes (if any) */}
        {additionalNotes && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">Additional Notes</h2>
            <p className="text-sm text-gray-700">{additionalNotes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 border-t border-gray-300 pt-4 flex justify-between items-center">
          <div className="text-xs text-gray-600">
            <p>Take medicines as prescribed</p>
            <p>Keep all medications out of reach of children</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-italic mb-2">Digitally signed by</div>
            <div className="text-base font-bold text-red-600">Dr. {doctorName}</div>
            <div className="text-xs">{currentDate}</div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={savePrescriptionAsImage}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Download Prescription
        </button>
      </div>
    </div>
  );
};

export default Prescription; 