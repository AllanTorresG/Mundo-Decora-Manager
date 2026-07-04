export default function CampoEstado({ value, onChange }) {
  const colores = {
    Agendado: "text-yellow-700 bg-yellow-50 border-yellow-200",
    "Listo para recoger": "text-blue-700 bg-blue-50 border-blue-200",
    Entregado: "text-green-700 bg-green-50 border-green-200",
  };

  return (
    <select
      name="estado"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 border rounded-lg outline-none transition font-medium ${
        colores[value] || "border-gray-200 text-gray-800"
      }`}
    >
      <option value="Agendado">Agendado</option>
      <option value="Listo para recoger">Listo para recoger</option>
      <option value="Entregado">Entregado</option>
    </select>
  );
}
