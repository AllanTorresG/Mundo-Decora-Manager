import { useEffect, useRef } from "react";
import { syncPendingOrders, checkServer } from "../services/ordersApi";

export default function SyncManager() {
  const serverWasOnline = useRef(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    const heartbeat = async () => {
      const isOnline = await checkServer();

      if (isOnline && !serverWasOnline.current) {
        console.log("🟢 Servidor recuperado. Sincronizando...");
        await syncPendingOrders();
      }

      if (!isOnline && serverWasOnline.current) {
        console.log("🔴 Servidor desconectado.");
      }

      serverWasOnline.current = isOnline;

      // Próxima revisión
      timeoutId.current = setTimeout(heartbeat, isOnline ? 30000 : 5000);
    };

    heartbeat();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return null;
}
