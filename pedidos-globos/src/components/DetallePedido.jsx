const ESTADO_COLORS = {
  Agendado: "bg-yellow-100 text-yellow-800",
  "Listo para recoger": "bg-blue-100 text-blue-800",
  Entregado: "bg-green-100 text-green-700",
};

export default function DetallePedido({ pedido, cerrar, editarPedido, cambiarEstado }) {
  const restante = (Number(pedido.costo) - Number(pedido.anticipo)).toFixed(2);
  const esArreglo = pedido.tipoPedido === "arreglo";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Detalle del pedido</h2>
          <button
            onClick={cerrar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Cliente y teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Nombre del cliente</span>
              <span className="block text-gray-800 font-medium">{pedido.cliente}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Teléfono</span>
              <span className="block text-gray-800">
                <a
                  href={`http://wa.me/${pedido.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-green-600 transition-colors group"
                >
                  <svg className="w-4 h-4 text-green-500 group-hover:text-green-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {pedido.telefono}
                </a>
              </span>
            </div>
          </div>

          {/* Tipo */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {esArreglo ? "🎈 Arreglo de globos" : "🎉 Evento"}
          </div>

          {/* Sección Arreglo */}
          {esArreglo && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
              <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">Detalles del arreglo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Fecha de entrega</span>
                  <span className="block text-gray-800">{pedido.fecha || "—"}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Hora de entrega</span>
                  <span className="block text-gray-800">{pedido.horaEntrega || "—"}</span>
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Tipo de arreglo</span>
                <span className="block text-gray-800">{pedido.tipoArreglo || "—"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Tipo de gas</span>
                <span className="block text-gray-800">{pedido.tipoGas || "—"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Leyenda</span>
                <span className="block text-gray-800">{pedido.leyenda || "—"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Colores</span>
                <span className="block text-gray-800">{pedido.colores || "—"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Descripción</span>
                <span className="block text-gray-800">{pedido.descripcion || "—"}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Servicio</span>
                <span className="block text-gray-800">{pedido.lugar || "—"}</span>
              </div>
              {pedido.direccion && (
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Dirección</span>
                  <span className="block text-gray-800">{pedido.direccion}</span>
                </div>
              )}
            </div>
          )}

          {/* Sección Evento */}
          {!esArreglo && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
              <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">Detalles del evento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Fecha del evento</span>
                  <span className="block text-gray-800">{pedido.fecha || "—"}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Hora de montaje</span>
                  <span className="block text-gray-800">{pedido.horaEntrada || "—"}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Hora de inicio</span>
                  <span className="block text-gray-800">{pedido.horaInicio || "—"}</span>
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Descripción</span>
                <span className="block text-gray-800">{pedido.descripcion || "—"}</span>
              </div>
              {pedido.direccion && (
                <div>
                  <span className="block text-sm font-medium text-gray-500 mb-1">Dirección</span>
                  <span className="block text-gray-800">{pedido.direccion}</span>
                </div>
              )}
            </div>
          )}

          {/* Costos */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="block text-xs font-medium text-gray-500 mb-1">Costo</span>
              <span className="block text-lg font-bold text-gray-800">${Number(pedido.costo).toFixed(2)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="block text-xs font-medium text-gray-500 mb-1">Anticipo</span>
              <span className="block text-lg font-bold text-gray-800">${Number(pedido.anticipo).toFixed(2)}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="block text-xs font-medium text-gray-500 mb-1">Restante</span>
              <span className="block text-lg font-bold text-gray-800">${restante}</span>
            </div>
          </div>

          {/* Comentarios */}
          {pedido.comentarios && (
            <div>
              <span className="block text-sm font-medium text-gray-500 mb-1">Comentarios</span>
              <span className="block text-gray-800">{pedido.comentarios}</span>
            </div>
          )}

          {/* Estado — solo para arreglos */}
          {esArreglo && (
          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">Estado</span>
            {cambiarEstado ? (
              <select
                value={pedido.estado}
                onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-800 bg-white"
              >
                <option value="Agendado">Agendado</option>
                <option value="Listo para recoger">Listo para recoger</option>
                <option value="Entregado">Entregado</option>
              </select>
            ) : (
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${ESTADO_COLORS[pedido.estado] || "bg-gray-100 text-gray-700"}`}>
                {pedido.estado}
              </span>
            )}
          </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            {editarPedido && (
              <button
                onClick={() => { cerrar(); editarPedido(pedido); }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-xl shadow-md hover:from-yellow-500 hover:to-amber-600 transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                Editar pedido
              </button>
            )}
            <button
              onClick={cerrar}
              className={`${editarPedido ? "flex-1" : "w-full"} py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors cursor-pointer`}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
