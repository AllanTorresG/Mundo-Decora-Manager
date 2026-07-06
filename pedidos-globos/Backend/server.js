import express from "express";
import cors from "cors";
import fs from "fs";
import {
  iniciarWhatsApp,
  sendConfirmation,
} from "./services/whatsappService.js";

const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = "./pedidos.json";

function leerPedidos() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function guardarPedidos(pedidos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(pedidos, null, 2));
}

app.get("/pedidos", (req, res) => {
  res.json(leerPedidos());
});

app.post("/pedidos", async (req, res) => {
  const pedidos = leerPedidos();

  const nuevoPedido = {
    id: Date.now(),
    ...req.body,
  };

  pedidos.push(nuevoPedido);

  guardarPedidos(pedidos);

  try {
    console.log("📤 Enviando confirmación...");
    await sendConfirmation(nuevoPedido);
    console.log("✅ Confirmación enviada");
  } catch (error) {
    console.error("❌ Error enviando confirmación:");
    console.error(error);
  }

  res.json(nuevoPedido);
});

app.delete("/pedidos/:id", (req, res) => {
  const pedidos = leerPedidos();

  const nuevosPedidos = pedidos.filter((p) => String(p.id) !== req.params.id);

  guardarPedidos(nuevosPedidos);

  res.json({ ok: true });
});

app.put("/pedidos/:id", (req, res) => {
  const pedidos = leerPedidos();
  const idx = pedidos.findIndex((p) => String(p.id) === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  pedidos[idx] = { ...pedidos[idx], ...req.body };
  guardarPedidos(pedidos);
  res.json(pedidos[idx]);
});

app.put("/pedidos/:id/estado/:estado", (req, res) => {
  const pedidos = leerPedidos();

  const pedido = pedidos.find((p) => String(p.id) === req.params.id);

  if (!pedido) {
    return res.status(404).json({
      error: "Pedido no encontrado",
    });
  }

  pedido.estado = req.params.estado;

  guardarPedidos(pedidos);

  res.json(pedido);
});

await iniciarWhatsApp();

app.listen(3001, "0.0.0.0", () => {
  console.log("Servidor iniciado en puerto 3001");
});
