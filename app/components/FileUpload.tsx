import React, { useState } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  error?: string;
  className?: string;
  onChange: (file: File | null) => void;
}

const FileUpload = ({
  id,
  label,
  accept = '.pdf',
  required = false,
  error,
  className = '',
  onChange,
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange(files[0]);
    } else {
      setFileName('');
      onChange(null);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center">
        <label
          htmlFor={id}
          className="cursor-pointer bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Choose File
        </label>
        <span className="ml-3 text-gray-600 text-sm">{fileName || 'No file chosen'}</span>
        <input
          type="file"
          id={id}
          accept={accept}
          required={required}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload; 