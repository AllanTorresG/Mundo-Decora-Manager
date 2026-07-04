import { useState } from "react";
import CampoTexto from "./Form/CampoTexto";
import CampoFecha from "./Form/CampoFecha";
import CampoDinero from "./Form/CampoDinero";
import CampoComentario from "./Form/CampoComentario";
import CampoHora from "./Form/CampoHora";

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
              <CampoTexto name="telefono" value={form.telefono} onChange={handleChange} placeholder="10 dígitos" required />
            </div>
          </div>

          {/* Indicador de tipo */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {form.tipoPedido === "arreglo" ? "🎈 Arreglo de globos" : "🎉 Evento"}
          </div>

          {/* Sección Arreglo */}
          {form.tipoPedido === "arreglo" && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Detalles del arreglo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha de entrega</label>
                  <CampoFecha name="fecha" value={form.fecha} onChange={handleChange} />
                </div>
                <CampoHora name="horaEntrega" label="Hora de entrega" value={form.horaEntrega} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de arreglo</label>
                <select name="tipoArreglo" value={form.tipoArreglo} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 bg-white">
                  <option value="">Seleccionar</option>
                  <option value="Globo burbuja">Globo burbuja</option>
                  <option value="Bouquet">Bouquet</option>
                  <option value="Arreglo con regalo">Arreglo con regalo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de gas</label>
                <select name="tipoGas" value={form.tipoGas} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 bg-white">
                  <option value="">Seleccionar</option>
                  <option value="Aire">Aire</option>
                  <option value="Helio">Helio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Leyenda</label>
                <CampoTexto name="leyenda" value={form.leyenda} onChange={handleChange} placeholder="Texto de la leyenda..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Colores</label>
                <CampoTexto name="colores" value={form.colores} onChange={handleChange} placeholder="Colores del arreglo..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                <CampoComentario name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Colores, tamaño..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Servicio a domicilio</label>
                <select name="lugar" value={form.lugar} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 bg-white">
                  <option value="">Seleccionar</option>
                  <option value="Recoge en local">Recoge en local</option>
                  <option value="Servicio a domicilio">Servicio a domicilio</option>
                </select>
              </div>
              {form.lugar === "Servicio a domicilio" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                  <CampoTexto name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle, número..." />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Costo total</label>
                  <CampoDinero name="costo" value={form.costo} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Anticipo</label>
                  <CampoDinero name="anticipo" value={form.anticipo} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Comentarios</label>
                <CampoComentario name="comentarios" value={form.comentarios} onChange={handleChange} placeholder="Notas..." />
              </div>
            </div>
          )}

          {/* Sección Evento */}
          {form.tipoPedido === "evento" && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">Detalles del evento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha del evento</label>
                  <CampoFecha name="fecha" value={form.fecha} onChange={handleChange} />
                </div>
                <CampoHora name="horaEntrada" label="Hora de montaje" value={form.horaEntrada} onChange={handleChange} />
                <CampoHora name="horaInicio" label="Hora de inicio" value={form.horaInicio} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                <CampoComentario name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe el evento..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Costo total</label>
                  <CampoDinero name="costo" value={form.costo} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Anticipo</label>
                  <CampoDinero name="anticipo" value={form.anticipo} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                <CampoTexto name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle, número..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Comentarios</label>
                <CampoComentario name="comentarios" value={form.comentarios} onChange={handleChange} placeholder="Notas..." />
              </div>
            </div>
          )}

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 bg-white">
              <option value="Agendado">Agendado</option>
              <option value="Listo para recoger">Listo para recoger</option>
              <option value="Entregado">Entregado</option>
            </select>
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
