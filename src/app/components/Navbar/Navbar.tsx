'use client'
import { MdMenu } from "react-icons/md";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { toggleSidebar } = useAppContext()
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    router.push('/login'); // Redirect to login page
  };
  return (
    <nav className="flex items-center justify-between shadow-xl bg-white min-h-[80px] px-5">
      <MdMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
      <Button onClick={() => handleLogout()}>Logout</Button>
    </nav>
  )
}

export default Navbar