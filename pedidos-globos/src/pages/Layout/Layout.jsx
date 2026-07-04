import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-yellow-300 text-center text-sm py-2 px-4 text-gray-800 font-medium">
        Tel: 962 223 06 21 ó 962 101 35 19 / Ubicación: Tapachula, Chiapas
      </div>
      <NavBar />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[1600px] px-6 md:px-12 lg:px-20 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
