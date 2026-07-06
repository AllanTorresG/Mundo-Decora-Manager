export function eventConfirmation(pedido) {
  return `🎈 *¡Hola ${pedido.cliente}!*

        Tu evento ha sido agendado correctamente.
        *Por favor verifica si los datos son correctos.*

        📅 *Fecha de evento:* ${pedido.fecha}
        🕒 *Hora de entrada a montar:* ${pedido.horaEntrada} hrs
        🕒 *Hora de inicio de evento:* ${pedido.horaInicio} hrs
        📍 *Ubicación:* ${pedido.direccion}
        🎁 *Descripción:*
        ${pedido.descripcion}

        💰 *Total:* $${pedido.costo}
        💵 *Anticipo:* $${pedido.anticipo}
        💰 *Resta:* $${pedido.costo - pedido.anticipo}


        Gracias por confiar en *Mundo Decora*. ❤️`;
}
