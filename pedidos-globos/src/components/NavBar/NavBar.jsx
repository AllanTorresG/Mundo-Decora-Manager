import { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import List from "./List/List";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="NavBarContainer">
        <button className="icon-bars" onClick={toggleMenu} aria-label="Menú de navegación">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </button>
        <Link to="/" onClick={closeMenu}>
          <img src="/public/Logo.png" alt="Logo" className="logo" />
        </Link>
        <List isOpen={isOpen} closeMenu={closeMenu} />
      </nav>
    </>
  );
}
