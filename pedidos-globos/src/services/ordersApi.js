const API_URL = "http://100.106.133.33:3001/pedidos";
const CACHE_KEY = "orders";
const PENDING_KEY = "pendingOrders";
let syncing = false;

function getPendingOrders() {
  const pending = localStorage.getItem(PENDING_KEY);

  return pending ? JSON.parse(pending) : [];
}

function savePendingOrders(orders) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(orders));
}

export async function getOrders() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("No se pudo obtener los pedidos.");
    }

    const pedidos = await response.json();

    localStorage.setItem(CACHE_KEY, JSON.stringify(pedidos));

    return pedidos;
  } catch (error) {
    console.warn("⚠️ Sin conexión. Cargando pedidos desde la caché.");

    const cache = localStorage.getItem(CACHE_KEY);

    return cache ? JSON.parse(cache) : [];
  }
}

export async function createOrder(order) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar el pedido.");
    }

    const newOrder = await response.json();

    // Actualizar caché local
    const orders = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
    orders.push(newOrder);
    localStorage.setItem(CACHE_KEY, JSON.stringify(orders));

    return newOrder;
  } catch (error) {
    console.warn("⚠️ Servidor no disponible. Guardando pedido localmente.");

    // Guardar en pedidos pendientes
    const pending = getPendingOrders();
    pending.push(order);
    savePendingOrders(pending);

    // También mostrarlo en la aplicación
    const orders = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
    orders.push(order);
    localStorage.setItem(CACHE_KEY, JSON.stringify(orders));

    return order;
  }
}

export async function syncPendingOrders() {
  console.time("sync");
  if (syncing) {
    console.log("⏳ Ya hay una sincronización en progreso.");
    return;
  }

  const pending = getPendingOrders();

  if (pending.length === 0) {
    return;
  }

  syncing = true;

  console.log(`🔄 Sincronizando ${pending.length} pedido(s)...`);

  // Vaciamos inmediatamente la cola para que otra sincronización
  // no vuelva a tomar los mismos pedidos.
  savePendingOrders([]);

  const remaining = [];

  try {
    for (const order of pending) {
      try {
        console.log("📤 Enviando", order.id);
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        console.log("📥 Respuesta recibida", order.id);

        if (!response.ok) {
          throw new Error();
        }

        console.log(`✅ Pedido ${order.id} sincronizado`);
      } catch (error) {
        console.warn(`⚠️ No se pudo sincronizar ${order.id}`);
        remaining.push(order);
      }
    }

    savePendingOrders(remaining);

    await getOrders();
  } finally {
    syncing = false;
  }
  console.timeEnd("sync");
}

export async function checkServer() {
  try {
    const response = await fetch("http://100.106.133.33:3001/health", {
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}
