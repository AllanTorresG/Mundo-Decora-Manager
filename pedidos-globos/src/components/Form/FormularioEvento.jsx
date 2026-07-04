import CampoFecha from "./CampoFecha";
import CampoTexto from "./CampoTexto";
import CampoDinero from "./CampoDinero";
import CampoComentario from "./CampoComentario";
import CampoHora from "./CampoHora";

export default function FormularioEvento({ form, handleChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
        Detalles del evento
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del evento</label>
          <CampoFecha
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />
        </div>

        <div>
          <CampoHora
            name="horaEntrada"
            label="Hora de montaje"
            value={form.horaEntrada}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <CampoHora
            name="horaInicio"
            label="Hora de inicio"
            value={form.horaInicio}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <CampoComentario
          name="descripcion"
          value={form.descripcion}
          placeholder="Describe el evento..."
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Costo total</label>
          <CampoDinero
            name="costo"
            value={form.costo}
            placeholder="0.00"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Anticipo</label>
          <CampoDinero
            name="anticipo"
            value={form.anticipo}
            placeholder="0.00"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección del evento</label>
        <CampoTexto
          name="direccion"
          value={form.direccion}
          placeholder="Calle, número, colonia..."
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
        <CampoComentario
          name="comentarios"
          value={form.comentarios}
          placeholder="Notas adicionales..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
