import { useState } from "react";
import CampoTexto from "./CampoTexto";
import FormularioArreglo from "./formularioArreglo";
import FormularioEvento from "./FormularioEvento";

const tipos = [
  { value: "arreglo", label: "Arreglo de globos", icon: "🎈" },
  { value: "evento", label: "Evento", icon: "🎉" },
];

export default function PedidoForm({ form, handleChange, guardarPedido }) {
  const [tipoAbierto, setTipoAbierto] = useState(false);

  return (
    <form onSubmit={guardarPedido} className="space-y-6">
      {/* Cliente y teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del cliente</label>
          <CampoTexto
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de teléfono</label>
          <CampoTexto
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="10 dígitos"
            required
          />
        </div>
      </div>

      {/* Tipo de pedido */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de pedido</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tipos.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => {
                handleChange({
                  target: { name: "tipoPedido", value: t.value },
                });
                setTipoAbierto(true);
              }}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                form.tipoPedido === t.value
                  ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50/50"
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Campos condicionales según tipo */}
      {tipoAbierto && form.tipoPedido === "arreglo" && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <FormularioArreglo form={form} handleChange={handleChange} />
        </div>
      )}

      {tipoAbierto && form.tipoPedido === "evento" && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <FormularioEvento form={form} handleChange={handleChange} />
        </div>
      )}

      {/* Botón submit */}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-xl shadow-md hover:from-yellow-500 hover:to-amber-600 transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
      >
        Guardar pedido
      </button>
    </form>
  );
}
