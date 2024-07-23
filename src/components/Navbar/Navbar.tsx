'use client'
import { useAppContext } from "@/app/context/AppContext"
import { MdMenu } from "react-icons/md";
import { Button } from "../ui/button";
const Navbar = () => {
  const { toggleSidebar } = useAppContext()
  return (
    <nav className="flex items-center justify-between shadow-xl bg-white h-[80px] px-5">
      <MdMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
      <Button>Logout</Button>
    </nav>
  )
}

export default Navbar