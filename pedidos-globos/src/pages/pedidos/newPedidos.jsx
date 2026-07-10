import { useState, useEffect, useRef } from "react";
import PedidoForm from "../../components/Form/pedidoForm";
import { createOrder } from "../../services/ordersApi";

const INITIAL_FORM = {
  cliente: "",
  telefono: "",
  descripcion: "",
  extra: "Ninguno",
  tipoArreglo: "",
  size: "",
  tipoGas: "",
  leyenda: "",
  colores: "",
  fecha: "",
  costo: "",
  anticipo: "",
  direccion: "",
  comentarios: "",
  tipoPedido: "",
  servicioDomicilio: "",
  horaEntrega: "",
  horaEntrada: "",
  horaInicio: "",
  lugar: "",
  estado: "Agendado",
};

export default function NuevoPedido() {
  const [form, setForm] = useState(INITIAL_FORM);

  const firstRender = useRef(true);

  // Cargar borrador al abrir la página
  useEffect(() => {
    const draft = localStorage.getItem("draftOrder");

    if (draft) {
      setForm(JSON.parse(draft));
    }
  }, []);

  // Guardar o eliminar borrador automáticamente
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const formularioVacio = Object.entries(form).every(([key, value]) => {
      if (key === "extra") return value === "Ninguno";
      if (key === "estado") return value === "Agendado";

      return value === "";
    });

    if (formularioVacio) {
      localStorage.removeItem("draftOrder");
      return;
    }

    localStorage.setItem("draftOrder", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const guardarPedido = async (e) => {
    e.preventDefault();

    try {
      const order = {
        ...form,
        id: crypto.randomUUID(),
      };
      await createOrder(order);

      alert("Pedido guardado");

      setForm(INITIAL_FORM);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl shadow-lg mb-4">
          <span className="text-3xl">🎈</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Nuevo Pedido</h1>

        <p className="text-gray-500 mt-1">
          Registra un nuevo pedido para tu cliente
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 border border-gray-100 p-6 md:p-8">
        <PedidoForm
          form={form}
          handleChange={handleChange}
          guardarPedido={guardarPedido}
        />
      </div>
    </div>
  );
}
