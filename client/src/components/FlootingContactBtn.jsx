import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-19 right-6 flex flex-col gap-3 z-50">
      <div className="group relative">
        <div className="absolute w-44 h-30 right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-pink-300 text-black shadow px-3 py-1 rounded-full text-sm">
          +91-9876543210
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg">
          <FaPhoneAlt />
        </button>
      </div>
      
      <div className="group relative">
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-blue-300 text-black shadow px-3 py-1 rounded-full text-sm">
          connect@While(1).com
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg">
          <FaEnvelope />
        </button>
      </div>
    </div>
  );
};

export default FloatingContactButtons;
