import React, { useState } from "react";
import { Menu } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate=useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut=()=>{
    localStorage.removeItem("token");
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
     navigate("/");
  }

  return (
    <div className="flex items-center justify-between px-6 h-36 shadow-md bg-white">

      <div className="flex items-center">
        <img src="/3.jpeg" alt="Logo" className="h-32 w-32  w-auto object-contain" 
        onClick={()=>navigate('/mainPage')}/>
      </div>

      <div className="flex items-center space-x-4 relative">
 
        <button
        onClick={handleLogOut}
         className="bg-gradient-to-r from-blue-400  mr-10 via-purple-300 to-pink-300 text-black h-12 w-30 text-md font-semibold font-poppins px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          Logout
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-800 hover:text-purple-600 transition mr-5"
          >
            <Menu size={28} />
          </button>

          {open && (
            <div className="absolute right-0  mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden animate-scaleIn z-50">
              <ul className="flex flex-col text-[15px] font-nunito text-gray-800">
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-purple-50 transition cursor-pointer">
                   Home
                </li>
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-purple-50 transition cursor-pointer">
                   Roadmap
                </li>
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-purple-50 transition cursor-pointer">
                   Skill Swap
                </li>
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-purple-50 transition cursor-pointer">
                   Mentors
                </li>
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-purple-50 transition cursor-pointer">
                   Contact Us
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
