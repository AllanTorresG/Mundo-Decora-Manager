import { useState } from "react";
import CampoEstado from "../Form/CampoEstado";

const URGENCIA_COLORS = {
  critical: "border-l-red-500 bg-red-50/40",
  warning: "border-l-orange-400 bg-orange-50/40",
  caution: "border-l-yellow-400 bg-yellow-50/40",
  normal: "border-l-green-400",
};

const URGENCIA_CARD_COLORS = {
  critical: "border-l-red-500",
  warning: "border-l-orange-400",
  caution: "border-l-yellow-400",
  normal: "border-l-green-400",
};

export default function ArregloTable({
  pedidos,
  eliminarPedido,
  editarPedido,
  cambiarEstado,
  onVerDetalle,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "horaEntrega",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = [...pedidos].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "restante") {
      aVal = Number(a.costo) - Number(a.anticipo);
      bVal = Number(b.costo) - Number(b.anticipo);
    }
    if (sortConfig.key === "costo" || sortConfig.key === "anticipo") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";

    const cmp =
      typeof aVal === "string" ? aVal.localeCompare(bVal) : aVal - bVal;
    return sortConfig.direction === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ colKey }) => {
    if (sortConfig.key !== colKey)
      return <span className="ml-1 text-white/40">↕</span>;
    return (
      <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
    );
  };

  const renderEstado = (pedido) => {
    if (cambiarEstado) {
      return (
        <CampoEstado
          value={pedido.estado}
          onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
        />
      );
    }
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
        ${pedido.estado === "Agendado" ? "bg-yellow-100 text-yellow-800" : ""}
        ${pedido.estado === "Listo para recoger" ? "bg-blue-100 text-blue-800" : ""}
        ${pedido.estado === "Entregado" ? "bg-green-100 text-green-700" : ""}
      `}
      >
        {pedido.estado}
      </span>
    );
  };

  return (
    <>
      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {sorted.map((pedido, idx) => {
          const urgClass = URGENCIA_CARD_COLORS[pedido.urgencia] || "";

          return (
            <div
              key={pedido.id}
              onClick={() => onVerDetalle?.(pedido)}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm border-l-4 ${urgClass} p-4 cursor-pointer active:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">
                  {pedido.cliente}
                </span>
                {cambiarEstado ? (
                  <select
                    value={pedido.estado}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                    className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                  >
                    <option value="Agendado">Agendado</option>
                    <option value="Listo para recoger">
                      Listo para recoger
                    </option>
                    <option value="Entregado">Entregado</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                    ${pedido.estado === "Agendado" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${pedido.estado === "Listo para recoger" ? "bg-blue-100 text-blue-800" : ""}
                    ${pedido.estado === "Entregado" ? "bg-green-100 text-green-700" : ""}
                  `}
                  >
                    {pedido.estado}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 space-y-0.5">
                <div>
                  {pedido.fecha} {pedido.horaEntrega}
                </div>
                <div className="text-gray-500 truncate">
                  {pedido.descripcion}
                </div>
                <div className="text-xs text-gray-400">
                  {pedido.tipoArreglo} · {pedido.tipoGas}
                </div>
                <div className="text-xs text-gray-400">
                  {pedido.leyenda && <span>Leyenda: {pedido.leyenda}</span>}
                </div>
                <div className="text-xs text-gray-400">
                  {pedido.colores && <span>Colores: {pedido.colores}</span>}
                </div>
              </div>
            </div>
          );
        })}
        {sorted.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No hay arreglos pendientes
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
              <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider">
                #
              </th>
              <th
                onClick={() => handleSort("cliente")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[160px]"
              >
                Cliente
                <SortIcon colKey="cliente" />
              </th>
              <th
                onClick={() => handleSort("telefono")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[130px]"
              >
                Teléfono
                <SortIcon colKey="telefono" />
              </th>
              <th
                onClick={() => handleSort("fecha")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[110px]"
              >
                Fecha
                <SortIcon colKey="fecha" />
              </th>
              <th
                onClick={() => handleSort("horaEntrega")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[120px]"
              >
                Hora entrega
                <SortIcon colKey="horaEntrega" />
              </th>
              <th
                onClick={() => handleSort("descripcion")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[220px]"
              >
                Articulos Extra
                <SortIcon colKey="extra" />
              </th>
              <th
                onClick={() => handleSort("tipoArreglo")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[150px]"
              >
                Tipo arreglo
                <SortIcon colKey="tipoArreglo" />
              </th>
              <th
                onClick={() => handleSort("tipoArreglo")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[150px]"
              >
                Tamaño
                <SortIcon colKey="size" />
              </th>
              <th
                onClick={() => handleSort("tipoGas")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[80px]"
              >
                Gas
                <SortIcon colKey="tipoGas" />
              </th>
              <th
                onClick={() => handleSort("leyenda")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[180px]"
              >
                Leyenda
                <SortIcon colKey="leyenda" />
              </th>
              <th
                onClick={() => handleSort("colores")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[150px]"
              >
                Colores
                <SortIcon colKey="colores" />
              </th>
              <th
                onClick={() => handleSort("lugar")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[140px]"
              >
                Lugar
                <SortIcon colKey="lugar" />
              </th>
              <th
                onClick={() => handleSort("direccion")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[200px]"
              >
                Dirección
                <SortIcon colKey="direccion" />
              </th>
              <th
                onClick={() => handleSort("costo")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[90px]"
              >
                Costo
                <SortIcon colKey="costo" />
              </th>
              <th
                onClick={() => handleSort("anticipo")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[90px]"
              >
                Anticipo
                <SortIcon colKey="anticipo" />
              </th>
              <th
                onClick={() => handleSort("restante")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[90px]"
              >
                Restante
                <SortIcon colKey="restante" />
              </th>
              <th
                onClick={() => handleSort("comentarios")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[160px]"
              >
                Comentarios
                <SortIcon colKey="comentarios" />
              </th>
              <th
                onClick={() => handleSort("estado")}
                className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap min-w-[120px]"
              >
                Estado
                <SortIcon colKey="estado" />
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap min-w-[130px]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sorted.map((pedido, idx) => {
              const restante = (
                Number(pedido.costo) - Number(pedido.anticipo)
              ).toFixed(2);
              const urgClass = URGENCIA_COLORS[pedido.urgencia] || "";

              return (
                <tr
                  key={pedido.id}
                  className={`border-l-4 ${urgClass} even:bg-gray-100/60 hover:bg-purple-100/60 transition-colors`}
                >
                  <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">
                    {idx + 1}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">
                    {pedido.cliente}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    <a
                      href={`http://wa.me/${pedido.telefono}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 hover:text-green-600 transition-colors group"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 group-hover:text-green-600 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{pedido.telefono}</span>
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">
                    {pedido.fecha}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">
                    {pedido.horaEntrega}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-normal min-w-[220px]">
                    {pedido.extra}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {pedido.tipoArreglo || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {pedido.size || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {pedido.tipoGas || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-normal min-w-[180px]">
                    {pedido.leyenda || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-normal min-w-[150px]">
                    {pedido.colores || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {pedido.lugar}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-normal min-w-[200px]">
                    {pedido.direccion}
                  </td>
                  <td className="px-5 py-3.5 text-gray-800 font-mono whitespace-nowrap">
                    ${Number(pedido.costo).toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-gray-800 font-mono whitespace-nowrap">
                    ${Number(pedido.anticipo).toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono whitespace-nowrap font-semibold text-gray-800">
                    ${restante}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-normal min-w-[160px]">
                    {pedido.comentarios}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {renderEstado(pedido)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex gap-2">
                      {editarPedido && (
                        <button
                          onClick={() => editarPedido(pedido)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          Editar
                        </button>
                      )}
                      {eliminarPedido && (
                        <button
                          onClick={() => eliminarPedido(pedido.id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={18}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No hay arreglos pendientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
