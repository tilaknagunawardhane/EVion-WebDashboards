// components/ui/card.jsx
export const Card = ({ children, className = '' }) => (
  <div className={`bg-white p-6 rounded-xl shadow ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);
