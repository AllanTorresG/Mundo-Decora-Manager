import { useState, useEffect, useRef } from "react";
import PedidoForm from "../../components/Form/pedidoForm";

export default function NuevoPedido() {
  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    console.log("📄 NuevoPedido montado");
    const draft = localStorage.getItem("draftOrder");

    if (draft) {
      console.log("📝 Borrador encontrado");
      setForm(JSON.parse(draft));
    }
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    console.log("💾 Guardando borrador");

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("draftOrder", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarPedido = async (e) => {
    e.preventDefault();

    const response = await fetch("http://100.106.133.33:3001/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    await response.json();

    alert("Pedido guardado");

    setForm({
      cliente: "",
      telefono: "",
      descripcion: "",
      extra: "",
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
    });
  };
  console.log(form);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl shadow-lg mb-4">
          <span className="text-3xl">🎈</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Nuevo Pedido</h1>
        <p className="text-gray-500 mt-1">
          Registra un nuevo pedido para tu cliente
        </p>
      </div>

      {/* Card del formulario */}
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
