export function orderConfirmationPorra(pedido) {
  return `  🎈 *¡Hola ${pedido.cliente}!*

        Tu pedido ha sido agendado correctamente.
        *Por favor verifica si los datos son correctos.*

        📅 *Fecha de entrega:* ${pedido.fecha}
        🕒 *Hora de entrega:* ${pedido.horaEntrega} hrs

        🎁 *Pedido:*
        ${pedido.tipoArreglo} con el texto ${pedido.leyenda}

          ${
            pedido.extra !== "Ninguno"
              ? `✨ *Articulos adicionales:* ${pedido.extra}`
              : ""
          }

        💰 *Total:* $${pedido.costo}
        💵 *Anticipo:* $${pedido.anticipo}
        💰 *Resta:* $${pedido.costo - pedido.anticipo}

        ${
          pedido.lugar === "Servicio a domicilio"
            ? `📍Te informaremos en cuanto este listo para ser enviado a ${pedido.direccion}`
            : `Te informaremos en cuanto puedas pasar a recogerlo 🤲🏼`
        }


        Cualquier duda o corrección estamos a la orden
        Gracias por confiar en *Mundo Decora*. 🥳`;
}
