import { useState } from "react";
import CampoTexto from "./Form/CampoTexto";
import PhoneInput from "./Form/PhoneInput";
import FormularioArreglo from "./Form/formularioArreglo";
import FormularioEvento from "./Form/FormularioEvento";
import CampoEstado from "./Form/CampoEstado";

export default function EditarPedido({ pedido, cerrar, guardarPedido }) {
  const [form, setForm] = useState(pedido);
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await guardarPedido(form);
    setGuardando(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Editar Pedido</h2>
          <button
            onClick={cerrar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cliente y teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre del cliente</label>
              <CampoTexto name="cliente" value={form.cliente} onChange={handleChange} placeholder="Nombre completo" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
              <PhoneInput name="telefono" value={form.telefono} onChange={handleChange} required />
            </div>
          </div>

          {/* Indicador de tipo */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {form.tipoPedido === "arreglo" ? "🎈 Arreglo de globos" : "🎉 Evento"}
          </div>

          {/* Sección Arreglo */}
          {form.tipoPedido === "arreglo" && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <FormularioArreglo form={form} handleChange={handleChange} />
            </div>
          )}

          {/* Sección Evento */}
          {form.tipoPedido === "evento" && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <FormularioEvento form={form} handleChange={handleChange} />
            </div>
          )}

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
            <CampoEstado value={form.estado} onChange={handleChange} />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={guardando}
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-xl shadow-md hover:from-yellow-500 hover:to-amber-600 transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={cerrar}
              className="py-3.5 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
