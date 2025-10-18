export const Input = ({ id, type = 'text', placeholder = '', defaultValue = '', ...props }) => (
  <input
    id={id}
    type={type}
    defaultValue={defaultValue}
    placeholder={placeholder}
    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);
