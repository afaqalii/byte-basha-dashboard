import { dashboardSections } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dashboardSections.map((btn, index) => (
            <Link className="block w-full px-6 py-12 bg-black text-white text-center font-semibold rounded-lg shadow-md hover:bg-black transition duration-200" key={index} href={btn.route}>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-4">{<btn.icon />}</div>
                <div className="text-lg">{btn.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

