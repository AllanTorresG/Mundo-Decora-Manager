export function eventConfirmation(pedido) {
  return `🎈 *¡Hola ${pedido.cliente}!*

        Tu pedido ha sido agendado correctamente.
        *Por favor verifica si los datos son correctos.*

        📅 *Fecha de evento:* ${pedido.fecha}
        🕒 *Hora de entrada a montar:* ${pedido.horaEntrada} hrs
        🕒 *Hora de entrada inicio de evento:* ${pedido.horaInicio} hrs
        📍 *Ubicación:* ${pedido.direccion}
        🎁 *Pedido:*
        ${pedido.descripcion}

        💰 *Total:* $${pedido.costo}
        💵 *Anticipo:* $${pedido.anticipo}


        Gracias por confiar en *Mundo Decora*. ❤️`;
}
