import React, { useState } from "react";
import { Menu } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {

  const navigate=useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut=()=>{
    localStorage.removeItem("token");
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
     navigate("/");
  }

  const navItems= [
     { label: "Home", path: "/mainPage" },
    { label: "Roadmap", path: "/roadmap" },
   { label: "Skill Swap", path: "/skill-swap" },
   { label: "Mentors", path: "/mentors" },
   { label: "Resume Builder", path: "/resume" },
   { label: "Interview Preparation", path: "/interviewPrep" },
   { label: "Chat Section" , path: "/chat"},
   { label: "Contact Us", path: "/contact" },
  ]
  return (
    <div className=" flex items-center justify-between px-6 h-36 shadow-md bg-white">

      <div className="flex items-center">
        <img src="/3.jpeg" alt="Logo" className="h-32 w-32  w-auto object-contain" 
        onClick={()=>navigate('/mainPage')}/>
      </div>
      
      <div className="flex items-center space-x-4 relative">
      <Link to="/notifications" className="relative text-purple-700 hover:text-pink-700">
      <Bell className="w-8 h-8" />
    </Link>
        <button
        onClick={handleLogOut}
         className="bg-gradient-to-r from-blue-500  mr-10 via-purple-500 to-pink-500 text-white h-12 w-30 text-md font-semibold font-poppins px-6 py-2 rounded-lg shadow hover:scale-105 transition">
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
        <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-50"
      >
      <ul className="flex flex-col text-[15px] font-poppins text-gray-800">
        {navItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <motion.li
            key={index}
            whileHover={{ scale: 1.07, backgroundColor: "#F3E8FF" }}
            className="flex items-center gap-2 px-5 py-3 transition cursor-pointer"
            > 
          {item.label}
          </motion.li>
          </Link>
           ))}
        </ul>
        </motion.div>
        )}

        </div>
      </div>
    </div>
  );
}

export default Header;
