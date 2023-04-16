import React, { useState } from 'react';

import CustomButton from './CustomButton';

const FilePicker = ({ readFile }) => {
  const [file, setFile] = useState('');

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col gap-2">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="text-gray-500 text-xs truncate">
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile(file, 'logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile(file, 'full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
