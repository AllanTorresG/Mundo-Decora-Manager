export const ESTADOS = [
  { value: "Agendado", label: "Agendado" },
  { value: "Listo para recoger", label: "Listo para recoger" },
  { value: "Send", label: "En reparto" },
  { value: "Entregado", label: "Entregado" },
];

export const COLORES_ESTADO = {
  Agendado: "text-yellow-700 bg-yellow-50 border-yellow-200",
  "Listo para recoger": "text-blue-700 bg-blue-50 border-blue-200",
  Send: "text-orange-700 bg-orange-50 border-orange-200",
  Entregado: "text-green-700 bg-green-50 border-green-200",
};

export default function CampoEstado({ value, onChange }) {
  return (
    <select
      name="estado"
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 border rounded-lg outline-none transition font-medium ${
        COLORES_ESTADO[value] || "border-gray-200 text-gray-800"
      }`}
    >
      {ESTADOS.map((est) => (
        <option key={est.value} value={est.value}>
          {est.label}
        </option>
      ))}
    </select>
  );
}
