export function orderConfirmation(pedido) {
  return `🎈 *¡Hola ${pedido.cliente}!*

        Tu pedido ha sido agendado correctamente.
        *Por favor verifica si los datos son correctos.*

        📅 *Fecha de entrega:* ${pedido.fecha}
        🕒 *Hora de entrega:* ${pedido.horaEntrega} hrs

        🎁 *Pedido:*
        ${pedido.tipoArreglo} ${pedido.size} rellenado con ${pedido.tipoGas},
        lleva el texto ${pedido.leyenda} y los colores ${pedido.colores}

        Articulos adicionales: ${pedido.extras}

        💰 *Total:* $${pedido.costo}
        💵 *Anticipo:* $${pedido.anticipo}
        💰 *Deben:* $${pedido.costo - pedido.anticipo}

        Cualquier duda o corrección estamos a la orden
        Gracias por confiar en *Mundo Decora*. ❤️`;
}
