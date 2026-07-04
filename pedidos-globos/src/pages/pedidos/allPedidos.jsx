import { useEffect, useState } from "react";

import DetallePedido from "../../components/DetallePedido";
import ConfirmarEstado from "../../components/ConfirmarEstado";
import EditarPedido from "../../components/EditarPedido";
import ArregloTable from "../../components/Tables/ArregloTable";
import EventoTable from "../../components/Tables/EventoTable";

export default function TodosLosPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [vistaActiva, setVistaActiva] = useState("arreglos");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [confirmacionEstado, setConfirmacionEstado] = useState(null);

  const cambiarEstado = async (id, estado) => {
    if (estado === "Listo para recoger") {
      const pedido = pedidos.find((p) => p.id === id);
      if (pedido) {
        setConfirmacionEstado({ pedido, estado });
        return;
      }
    }
    await fetch(`http://100.106.133.33:3001/pedidos/${id}/estado/${estado}`, {
      method: "PUT",
    });

    const response = await fetch(`http://100.106.133.33:3001/pedidos`);

    const data = await response.json();

    setPedidos(data);
  };

  const confirmarCambioEstado = async (id, estado) => {
    await fetch(`http://100.106.133.33:3001/pedidos/${id}/estado/${estado}`, {
      method: "PUT",
    });
    setConfirmacionEstado(null);
    const response = await fetch(`http://100.106.133.33:3001/pedidos`);
    const data = await response.json();
    setPedidos(data);
  };

  useEffect(() => {
    fetch("http://100.106.133.33:3001/pedidos")
      .then((r) => r.json())
      .then(setPedidos);
  }, []);

  const pedidosFiltrados = filtroFecha
    ? pedidos.filter((p) => p.fecha === filtroFecha)
    : pedidos;

  const arreglos = pedidosFiltrados.filter((p) => p.tipoPedido === "arreglo");

  const eventos = pedidosFiltrados.filter((p) => p.tipoPedido === "evento");

  const eliminarPedido = async (id) => {
    await fetch(`http://100.106.133.33:3001/pedidos/${id}`, {
      method: "DELETE",
    });

    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  const guardarPedido = async (data) => {
    await fetch(`http://100.106.133.33:3001/pedidos/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setPedidoEditando(null);

    const response = await fetch("http://100.106.133.33:3001/pedidos");
    const nuevos = await response.json();
    setPedidos(nuevos);
  };

  arreglos.sort((a, b) => {
    const fechaHoraA = new Date(`${a.fecha}T${a.horaEntrega || "00:00"}`);
    const fechaHoraB = new Date(`${b.fecha}T${b.horaEntrada || "00:00"}`);

    return fechaHoraA - fechaHoraB;
  });

  eventos.sort((a, b) => {
    const fechaHoraA = new Date(`${a.fecha}`);
    const fechaHoraB = new Date(`${b.fecha}`);

    return fechaHoraA - fechaHoraB;
  });

  return (
    <div className="space-y-8">
      {/* Mobile filter button */}
      <div className="block md:hidden mb-10">
        <button
          onClick={() => setFiltroAbierto(!filtroAbierto)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-gray-700 cursor-pointer"
        >
          <span>🔽 Filtrar</span>
          {filtroFecha && (
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">1 activo</span>
          )}
        </button>
        {filtroAbierto && (
          <div className="mt-2 bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
            {filtroFecha && (
              <button
                onClick={() => { setFiltroFecha(""); setFiltroAbierto(false); }}
                className="text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop filter bar */}
      <div className="hidden md:inline-flex bg-white rounded-xl border border-gray-200 shadow-sm p-3 items-center gap-2 mb-12">
        <span className="text-sm font-medium text-gray-700">📅 Filtrar por fecha</span>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none"
        />
        {filtroFecha && (
          <button
            onClick={() => setFiltroFecha("")}
            className="text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            ✕ Limpiar
          </button>
        )}
      </div>

      {/* Mobile tabs */}
      <div className="block md:hidden">
        <div className="flex gap-2 mb-4 mt-4 md:mt-0">
          <button
            onClick={() => setVistaActiva("arreglos")}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              vistaActiva === "arreglos"
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🎈 Arreglos
          </button>
          <button
            onClick={() => setVistaActiva("eventos")}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              vistaActiva === "eventos"
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🎉 Eventos
          </button>
        </div>
        {vistaActiva === "arreglos" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">Arreglos</h2>
              <p className="text-sm text-gray-500">{arreglos.length} pedido(s)</p>
            </div>
            <ArregloTable
              pedidos={arreglos}
              eliminarPedido={eliminarPedido}
              editarPedido={setPedidoEditando}
              cambiarEstado={cambiarEstado}
              onVerDetalle={setPedidoDetalle}
            />
          </div>
        )}
        {vistaActiva === "eventos" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">Eventos</h2>
              <p className="text-sm text-gray-500">{eventos.length} pedido(s)</p>
            </div>
            <EventoTable
              pedidos={eventos}
              eliminarPedido={eliminarPedido}
              editarPedido={setPedidoEditando}
              onVerDetalle={setPedidoDetalle}
            />
          </div>
        )}
      </div>

      {/* Desktop: ambas secciones visibles */}
      <div className="hidden md:block space-y-8">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">🎈 Arreglos</h2>
            <p className="text-sm text-gray-500">{arreglos.length} pedido(s)</p>
          </div>

          <ArregloTable
            pedidos={arreglos}
            eliminarPedido={eliminarPedido}
            editarPedido={setPedidoEditando}
            cambiarEstado={cambiarEstado}
          />
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">🎉 Eventos</h2>
            <p className="text-sm text-gray-500">{eventos.length} pedido(s)</p>
          </div>

          <EventoTable
            pedidos={eventos}
            eliminarPedido={eliminarPedido}
            editarPedido={setPedidoEditando}
          />
        </div>
      </div>

      {confirmacionEstado && (
        <ConfirmarEstado
          pedido={confirmacionEstado.pedido}
          onConfirmar={confirmarCambioEstado}
          onCancelar={() => setConfirmacionEstado(null)}
        />
      )}

      {pedidoDetalle && (
        <DetallePedido
          pedido={pedidoDetalle}
          cerrar={() => setPedidoDetalle(null)}
          editarPedido={setPedidoEditando}
          cambiarEstado={cambiarEstado}
        />
      )}

      {pedidoEditando && (
        <EditarPedido
          pedido={pedidoEditando}
          cerrar={() => setPedidoEditando(null)}
          guardarPedido={guardarPedido}
        />
      )}
    </div>
  );
}
