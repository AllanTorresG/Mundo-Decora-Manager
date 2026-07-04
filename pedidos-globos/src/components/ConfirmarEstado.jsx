import { useState } from "react";

const fields = [
  { key: "tipoArreglo", label: "Tipo de arreglo", render: (v) => v },
  { key: "tipoGas", label: "Tipo de gas", render: (v) => v },
  { key: "leyenda", label: "Leyenda", render: (v) => v },
  { key: "colores", label: "Colores", render: (v) => v },
  { key: "descripcion", label: "Descripción", render: (v) => v },
];

export default function ConfirmarEstado({ pedido, onConfirmar, onCancelar }) {
  const [checks, setChecks] = useState(
    Object.fromEntries(fields.map((f) => [f.key, false]))
  );

  const toggle = (key) => setChecks({ ...checks, [key]: !checks[key] });

  const allChecked = fields.every((f) => checks[f.key]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔔</span>
          <h2 className="text-lg font-bold text-gray-800">Cambiar estado</h2>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Se cambiará a <strong>"Listo para recoger"</strong>.
          Confirma que cada dato del producto es correcto:
        </p>

        <div className="space-y-3 mb-6">
          {fields.map(({ key, label, render }) => (
            <label
              key={key}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checks[key]}
                onChange={() => toggle(key)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-medium text-gray-500 mb-0.5">{label}</span>
                <span className="block text-sm text-gray-800 break-words">
                  {render(pedido[key]) || "—"}
                </span>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={!allChecked}
            onClick={() => onConfirmar(pedido.id, "Listo para recoger")}
            className={`flex-1 py-2.5 px-4 font-semibold rounded-xl transition-all cursor-pointer ${
              allChecked
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md hover:from-yellow-500 hover:to-amber-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
