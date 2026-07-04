export default function CampoDinero({
  required,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
      <input
        name={name}
        type="number"
        step="0.01"
        min="0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400 bg-white"
      />
    </div>
  );
}
