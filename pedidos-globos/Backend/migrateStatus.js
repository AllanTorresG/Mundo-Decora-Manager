import fs from "fs";

const DB_FILE = "./pedidos.json";

function migrate() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    const pedidos = JSON.parse(data);
    let cambios = 0;

    const migrados = pedidos.map((p) => {
      if (p.estado === "Enviado") {
        cambios++;
        return { ...p, estado: "Send" };
      }
      return p;
    });

    if (cambios > 0) {
      fs.writeFileSync(DB_FILE, JSON.stringify(migrados, null, 2));
      console.log(`Migrados ${cambios} pedidos: "Enviado" → "Send"`);
    } else {
      console.log("No se encontraron pedidos con estado 'Enviado'");
    }
  } catch (err) {
    console.error("Error en migración:", err);
  }
}

migrate();
