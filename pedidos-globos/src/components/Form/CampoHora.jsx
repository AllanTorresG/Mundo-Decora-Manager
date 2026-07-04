export default function CampoHora({ required, name, label, value, onChange }) {
  const horarios = [
    "6:30", "7:00", "7:30", "8:00", "8:30",
    "9:00", "9:30", "10:00", "10:30", "11:00",
    "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30",
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
      >
        <option value="">Seleccionar hora</option>
        {horarios.map((hora) => (
          <option key={hora} value={hora}>{hora}</option>
        ))}
      </select>
    </div>
  );
}
