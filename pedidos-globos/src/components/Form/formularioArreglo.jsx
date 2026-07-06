import CampoHora from "./CampoHora";
import CampoFecha from "./CampoFecha";
import CampoTexto from "./CampoTexto";
import CampoDinero from "./CampoDinero";
import CampoComentario from "./CampoComentario";

export default function FormularioArreglo({ form, handleChange }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
        Detalles del arreglo
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de entrega
          </label>
          <CampoFecha
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <CampoHora
            name="horaEntrega"
            label="Hora de entrega"
            value={form.horaEntrega}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de arreglo
        </label>
        <select
          name="tipoArreglo"
          value={form.tipoArreglo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
        >
          <option value="">Seleccionar</option>
          <option value="Globo burbuja">Globo burbuja</option>
          <option value="Bouquet">Bouquet</option>
          <option value="Arreglo con regalo">Arreglo con regalo</option>
        </select>
      </div>

      {form.tipoArreglo === "Globo burbuja" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamaño del globo burbuja
          </label>

          <select
            name="size"
            value={form.size}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
          >
            <option value="">Seleccionar</option>
            <option value="Mini">Mini</option>
            <option value="Chico">Chico</option>
            <option value="Base mediana globo chico">
              Base mediana (globo chico)
            </option>
            <option value="Mediano">Mediano</option>
            <option value="Base grande globo mediano">
              Base grande (globo mediano)
            </option>
            <option value="Grande">Grande</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de gas
        </label>
        <select
          name="tipoGas"
          value={form.tipoGas}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
        >
          <option value="">Seleccionar</option>
          <option value="Aire">Aire</option>
          <option value="Helio">Helio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Leyenda
        </label>
        <CampoTexto
          name="leyenda"
          value={form.leyenda}
          placeholder="Texto de la leyenda..."
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Colores
        </label>
        <CampoTexto
          name="colores"
          value={form.colores}
          placeholder="Colores del arreglo..."
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Extras
        </label>
        <CampoComentario
          name="descripcion"
          value={form.descripcion}
          placeholder="Colores, tamaño, tipo de globos..."
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Servicio a domicilio
        </label>
        <select
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 bg-white"
        >
          <option value="">Seleccionar</option>
          <option value="Recoge en local">Recoge en local</option>
          <option value="Servicio a domicilio">Servicio a domicilio</option>
        </select>
      </div>

      {form.lugar === "Servicio a domicilio" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección de entrega
          </label>
          <CampoTexto
            name="direccion"
            value={form.direccion}
            placeholder="Calle, número, colonia..."
            onChange={handleChange}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Costo total
          </label>
          <CampoDinero
            name="costo"
            value={form.costo}
            placeholder="0.00"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anticipo
          </label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comentarios
        </label>
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
