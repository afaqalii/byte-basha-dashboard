'use client'
import { useAppContext } from "@/app/context/AppContext";
import { MenuItems } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import logo from "../../../public/logo.jpg"

const Sidebar = () => {
  const { uiState, toggleSidebar } = useAppContext();
  const pathname = usePathname()
  return (
    <aside className={`hidden text-white bg-black md:block absolute top-0 min-h-screen h-full md:relative transition-all duration-300 ${uiState.isSidebarOpen ? 'left-0 w-full md:min-w-[300px] max-w-[300px]' : '-left-full max-w-0'} shadow-xl`}>
      <RxCross1 onClick={toggleSidebar} className="md:hidden" />
      <div className="flex items-center w-full bg-white">
        <Image src={logo} width="80" height="80" alt="Byte Basha Logo" />
        <h1 className="text-black font-bold text-2xl">Byte Basha</h1>
      </div>
      <ul className="mt-10 px-5">
        {MenuItems.map((item) => (
          <Link href={item.href}>
            <li className={`flex items-center gap-3 rounded-md text-xl py-3 pl-5 mb-2 ${pathname === item.href ? 'bg-white text-black font-bold' : ''}`}>
              {<item.icon className="text-2xl" />}
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar