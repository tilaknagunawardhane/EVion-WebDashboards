import React, { useState } from 'react';

export const Select = ({ children, defaultValue = '', onChange }) => {
  const [value, setValue] = useState(defaultValue);
  return React.cloneElement(children[0], {
    value,
    setValue: (val) => {
      setValue(val);
      onChange?.(val);
    },
    children: children.slice(1),
  });
};

export const SelectTrigger = ({ children, value, setValue }) => (
  <div className="relative">
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {children}
    </select>
  </div>
);

export const SelectValue = ({ placeholder }) => (
  <option value="" disabled hidden>
    {placeholder}
  </option>
);

export const SelectContent = ({ children }) => <>{children}</>;

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
