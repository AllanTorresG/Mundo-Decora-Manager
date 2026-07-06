export function readyToShip(pedido) {
  return `🎈 ¡Hola ${pedido.cliente}!

📍Tu pedido ya está listo para ser enviado a ${pedido.direccion}


🕘 Lo recibiras a las ${pedido.horaEntrega} hrs.

Te informaremos cuando vaya en camino, nuestro repartidor se
pondra en contacto contigo.`;
}
