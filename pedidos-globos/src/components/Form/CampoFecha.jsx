export default function CampoFecha({ name, value, onChange }) {
  return (
    <input
      name={name}
      type="date"
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
    />
  );
}
