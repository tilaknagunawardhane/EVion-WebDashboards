import React, { useState } from 'react';

export const Switch = ({ id, defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => {
        setChecked(!checked);
        onChange?.(!checked);
      }}
      className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        checked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );
};
