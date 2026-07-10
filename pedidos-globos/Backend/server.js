import express from "express";
import cors from "cors";
import fs from "fs";
import {
  iniciarWhatsApp,
  sendConfirmation,
  sendStateChange,
} from "./services/whatsappService.js";

import crypto from "crypto";

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

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: Date.now(),
  });
});

app.post("/pedidos", async (req, res) => {
  const pedidos = leerPedidos();

  const nuevoPedido = {
    id: req.body.id ?? crypto.randomUUID(),
    ...req.body,
  };

  pedidos.push(nuevoPedido);

  guardarPedidos(pedidos);

  res.json(nuevoPedido);
  sendConfirmation(nuevoPedido).catch((error) => {
    console.error("Error enviando WhatsApp:", error);
  });
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

app.put("/pedidos/:id/estado/:estado", async (req, res) => {
  const pedidos = leerPedidos();

  const pedido = pedidos.find((p) => String(p.id) === req.params.id);

  if (!pedido) {
    return res.status(404).json({
      error: "Pedido no encontrado",
    });
  }

  pedido.estado = req.params.estado;

  guardarPedidos(pedidos);

  await sendStateChange(pedido);

  res.json(pedido);
});

await iniciarWhatsApp();

app.listen(3001, "0.0.0.0", () => {
  console.log("Servidor iniciado en puerto 3001");
});
