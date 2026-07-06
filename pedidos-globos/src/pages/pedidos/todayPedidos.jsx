import { useEffect, useState } from "react";
import ArregloTable from "../../components/Tables/ArregloTable";
import EventoTable from "../../components/Tables/EventoTable";
import DetallePedido from "../../components/DetallePedido";
import ConfirmarEstado from "../../components/ConfirmarEstado";

function calcularUrgencia(pedido, ahora) {
  if (pedido.estado !== "Agendado") return "normal";

  if (pedido.tipoPedido === "arreglo") {
    const [h, m] = (pedido.horaEntrega || "0:0").split(":").map(Number);
    const entrega = new Date(
      pedido.fecha +
        "T" +
        String(h).padStart(2, "0") +
        ":" +
        String(m).padStart(2, "0"),
    );
    const diffMs = entrega - ahora;

    if (diffMs < 0) return "critical";
    const diffHoras = diffMs / (1000 * 60 * 60);
    if (diffHoras <= 2) return "critical";
    if (diffHoras <= 4) return "warning";
    if (diffHoras <= 6) return "caution";
    return "normal";
  }

  if (pedido.tipoPedido === "evento") {
    const evento = new Date(pedido.fecha + "T00:00:00");
    const hoy = new Date(ahora.toDateString());
    const diffDias = Math.round((evento - hoy) / (1000 * 60 * 60 * 24));

    if (diffDias < 0) return "critical";
    if (diffDias === 0) return "critical";
    if (diffDias === 1) return "warning";
    if (diffDias <= 3) return "caution";
    return "normal";
  }

  return "normal";
}

export default function PedidosDeHoy() {
  const [arreglos, setArreglos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [vistaActiva, setVistaActiva] = useState("arreglos");
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [confirmacionEstado, setConfirmacionEstado] = useState(null);

  const hoy = new Date();
  const fechaHoy = hoy.toISOString().split("T")[0];

  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);
  const fechaMañana = mañana.toISOString().split("T")[0];

  const semana = new Date();
  semana.setDate(semana.getDate() + 7);
  const fechaSemana = semana.toISOString().split("T")[0];

  const horaAMinutos = (hora) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  const cargarPedidos = () => {
    fetch("http://100.106.133.33:3001/pedidos")
      .then((r) => r.json())
      .then((data) => {
        const ahora = new Date();

        const arreglosUrgentes = data
          .filter((pedido) => {
            if (pedido.tipoPedido === "arreglo" && pedido.fecha === fechaHoy) {
              return true;
            }

            if (
              pedido.tipoPedido === "arreglo" &&
              pedido.fecha === fechaMañana &&
              pedido.horaEntrega &&
              horaAMinutos(pedido.horaEntrega) < horaAMinutos("12:00")
            ) {
              return true;
            }

            return false;
          })
          .map((p) => ({ ...p, urgencia: calcularUrgencia(p, ahora) }));

        const eventosSemana = data
          .filter((pedido) => {
            return (
              pedido.tipoPedido === "evento" &&
              pedido.fecha >= fechaHoy &&
              pedido.fecha <= fechaSemana
            );
          })
          .map((p) => ({ ...p, urgencia: calcularUrgencia(p, ahora) }));

        arreglosUrgentes.sort((a, b) => {
          const fechaHoraA = new Date(`${a.fecha}T${a.horaEntrega || "00:00"}`);
          const fechaHoraB = new Date(`${b.fecha}T${b.horaEntrega || "00:00"}`);
          return fechaHoraA - fechaHoraB;
        });

        eventosSemana.sort((a, b) => {
          const fechaHoraA = new Date(`${a.fecha}T${a.horaEntrada || "00:00"}`);
          const fechaHoraB = new Date(`${b.fecha}T${b.horaEntrada || "00:00"}`);
          return fechaHoraA - fechaHoraB;
        });

        setArreglos(arreglosUrgentes);
        setEventos(eventosSemana);
      });
  };

  const cambiarEstado = async (id, estado) => {
    if (estado === "Listo para recoger") {
      const pedido = arreglos.find((p) => p.id === id);
      if (pedido) {
        setConfirmacionEstado({ pedido, estado });
        return;
      }
    }
    await fetch(`http://100.106.133.33:3001/pedidos/${id}/estado/${estado}`, {
      method: "PUT",
    });
    cargarPedidos();
  };

  const confirmarCambioEstado = async (id, estado) => {
    await fetch(`http://100.106.133.33:3001/pedidos/${id}/estado/${estado}`, {
      method: "PUT",
    });
    setConfirmacionEstado(null);
    cargarPedidos();
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 15000);
    return () => clearInterval(intervalo);
  }, []);

  const resumenUrgencia = (tipo) => {
    const items = tipo === "arreglo" ? arreglos : eventos;
    const counts = { critical: 0, warning: 0, caution: 0, normal: 0 };
    items.forEach((p) => {
      if (counts[p.urgencia] !== undefined) counts[p.urgencia]++;
    });
    return counts;
  };

  const countsA = resumenUrgencia("arreglo");
  const countsE = resumenUrgencia("evento");

  return (
    <div className="space-y-8">
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
              <h2 className="text-lg font-bold text-gray-800">
                Arreglos urgentes
              </h2>
              <div className="flex gap-1.5 text-xs flex-wrap">
                {countsA.critical > 0 && (
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                    {countsA.critical} críticos
                  </span>
                )}
                {countsA.warning > 0 && (
                  <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                    {countsA.warning} próximos
                  </span>
                )}
                {countsA.caution > 0 && (
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    {countsA.caution} pendientes
                  </span>
                )}
              </div>
            </div>
            <ArregloTable
              pedidos={arreglos}
              onVerDetalle={setPedidoDetalle}
              cambiarEstado={cambiarEstado}
            />
          </div>
        )}
        {vistaActiva === "eventos" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                Eventos de la semana
              </h2>
              <div className="flex gap-1.5 text-xs flex-wrap">
                {countsE.critical > 0 && (
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                    {countsE.critical} hoy
                  </span>
                )}
                {countsE.warning > 0 && (
                  <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                    {countsE.warning} mañana
                  </span>
                )}
              </div>
            </div>
            <EventoTable pedidos={eventos} onVerDetalle={setPedidoDetalle} />
          </div>
        )}
      </div>

      {/* Desktop: ambas secciones visibles */}
      <div className="hidden md:block space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                🎈 Arreglos urgentes
              </h2>
              <p className="text-sm text-gray-500">
                Hoy y mañana antes de las 12 PM
              </p>
            </div>
            <div className="flex gap-2 text-xs flex-wrap">
              {countsA.critical > 0 && (
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                  {countsA.critical} críticos
                </span>
              )}
              {countsA.warning > 0 && (
                <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                  {countsA.warning} próximos
                </span>
              )}
              {countsA.caution > 0 && (
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  {countsA.caution} pendientes
                </span>
              )}
            </div>
          </div>
          <ArregloTable pedidos={arreglos} cambiarEstado={cambiarEstado} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                🎉 Eventos de la semana
              </h2>
              <p className="text-sm text-gray-500">
                Del {fechaHoy} al {fechaSemana}
              </p>
            </div>
            <div className="flex gap-2 text-xs flex-wrap">
              {countsE.critical > 0 && (
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                  {countsE.critical} hoy
                </span>
              )}
              {countsE.warning > 0 && (
                <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                  {countsE.warning} mañana
                </span>
              )}
            </div>
          </div>
          <EventoTable pedidos={eventos} />
        </div>
      </div>

      {confirmacionEstado && (
        <ConfirmarEstado
          pedido={confirmacionEstado.pedido}
          onConfirmar={confirmarCambioEstado}
          onCancelar={() => setConfirmacionEstado(null)}
        />
      )}

      {/* Modal detalle */}
      {pedidoDetalle && (
        <DetallePedido
          pedido={pedidoDetalle}
          cerrar={() => setPedidoDetalle(null)}
          cambiarEstado={cambiarEstado}
        />
      )}
    </div>
  );
}
