import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout/Layout";
import PedidosDeHoy from "./pages/pedidos/todayPedidos";
import NuevoPedido from "./pages/pedidos/newPedidos";
import TodosLosPedidos from "./pages/pedidos/allPedidos";
import Pedidos from "./pages/pedidos/pedidos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pedido" element={<Pedidos />}>
            <Route path="hoy" element={<PedidosDeHoy />} />
            <Route path="nuevo" element={<NuevoPedido />} />
            <Route path="todos" element={<TodosLosPedidos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
