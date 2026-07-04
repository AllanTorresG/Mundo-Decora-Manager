import { Link } from "react-router-dom";
import "./List.css";

const pages = [
  { name: "Proximas entregas", route: "/pedido/hoy" },
  { name: "Nuevo pedido", route: "/pedido/nuevo" },
  { name: "Todos los pedidos", route: "/pedido/todos" },
];

export default function List({ isOpen, closeMenu }) {
  return (
    <ul className={`list ${isOpen ? "open" : "closed"}`}>
      {pages.map((element) => (
        <li key={element.name}>
          <Link to={element.route} onClick={closeMenu}>
            {element.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
