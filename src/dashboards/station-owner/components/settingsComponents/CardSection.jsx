const CardSection = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default CardSection;
