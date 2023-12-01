import { Outlet } from "react-router-dom";
import "./App.css";

//import logo from './assets/logo.png'
import Logo from "./components/Logo";
function App() {
  return (
    <main className="relative w-full pb-14 ">
      <div className=" flex items-center bg-[#14243B] w-full h-52 mb-5">
        <Logo />
      </div>

      <Outlet />
    </main>
  );
}

export default App;
