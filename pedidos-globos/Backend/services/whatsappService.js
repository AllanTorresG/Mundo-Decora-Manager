import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import pino from "pino";
import { orderConfirmation } from "./messages/orderConfirmation.js";
import { eventConfirmation } from "./messages/eventConfirmation.js";

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
  const mensaje =
    pedido.tipoPedido === "arreglo"
      ? orderConfirmation(pedido)
      : eventConfirmation(pedido);

  await sendMessage(pedido.telefono, mensaje);
}
