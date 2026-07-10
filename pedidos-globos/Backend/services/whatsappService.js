import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import pino from "pino";
import { orderConfirmation } from "./messages/orderConfirmation.js";
import { eventConfirmation } from "./messages/eventConfirmation.js";
import { readyToPickup } from "./messages/readyToPickUp.js";
import { readyToShip } from "./messages/readyToShip.js";
import { onItsWay } from "./messages/onItsWay.js";
import { delivered } from "./messages/Delivered.js";
import { orderConfirmationFoil } from "./messages/orderConfirmationFoil.js";
import { orderConfirmationPorra } from "./messages/orderConfirmationPorra.js";

let sock;

export async function iniciarWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth/whatsapp");

  sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
  });

  sock.ev.on("creds.update", saveCreds);

  console.log("✅ Servicio de WhatsApp iniciado");

  sock.ev.on("connection.update", async ({ connection, qr }) => {
    console.log("Cambio de conexión:", connection);
    if (qr) {
      console.log("📱 Escanea este QR con WhatsApp:");

      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("🟢 WhatsApp conectado");
    }

    if (connection === "close") {
      console.log("🔴 WhatsApp desconectado");
    }
  });
}

export async function sendMessage(numero, mensaje) {
  await sock.sendMessage(`521${numero}@s.whatsapp.net`, {
    text: mensaje,
  });
}

export async function sendConfirmation(pedido) {
  if (pedido.tipoPedido === "evento") {
    return sendMessage(pedido.telefono, eventConfirmation(pedido));
  }

  if (pedido.tipoArreglo === "carita para porra") {
    return sendMessage(pedido.telefono, orderConfirmationPorra(pedido));
  }

  if (pedido.tipoArreglo === "globos foil") {
    return sendMessage(pedido.telefono, orderConfirmationFoil(pedido));
  }

  return sendMessage(pedido.telefono, orderConfirmation(pedido));
}

export async function sendStateChange(pedido) {
  switch (pedido.estado) {
    case "Listo para recoger": {
      const message =
        pedido.lugar === "Servicio a domicilio"
          ? readyToShip(pedido)
          : readyToPickup(pedido);
      await sendMessage(pedido.telefono, message);
      break;
    }

    case "Send":
      await sendMessage(pedido.telefono, onItsWay(pedido));
      break;

    case "Entregado":
      await sendMessage(pedido.telefono, delivered(pedido));
      break;
  }
}
