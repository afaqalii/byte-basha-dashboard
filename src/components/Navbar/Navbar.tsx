'use client'
import { useAppContext } from "@/app/context/AppContext"
import { MdMenu } from "react-icons/md";
const Navbar = () => {
  const { toggleSidebar } = useAppContext()
  return (
    <nav className="shadow-xl bg-slate-50 py-6 px-3">
      <MdMenu className="text-xl" onClick={toggleSidebar} />
    </nav>
  )
}

export default Navbar