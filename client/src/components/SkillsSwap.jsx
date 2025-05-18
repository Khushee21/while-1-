import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const SkillSwap = () => {
  const [skillmates, setSkillmates] = useState([]);
  const [loggedInUser , setLoggedInUser] = useState(null);

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(userData);
  

  },[]);

  useEffect(() => {
    const fetchSkillmates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skillmates");
        const others = res.data.filter(
          (skillmate)=> skillmate.email !== loggedInUser?.email
        );
        setSkillmates(others);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    // console.log("loggedInUser:", loggedInUser);
    if (loggedInUser) {
      fetchSkillmates();
    }
  }, [loggedInUser]);

  const handleConnect = async (receiverEmail) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    
    try {
      // Update the POST request with the correct field names `from` and `to`
      await axios.post("http://localhost:5000/api/notifications", {
        from: loggedInUser.email,  // Sender's email (logged-in user)
        to: receiverEmail,         // Receiver's email (the skillmate you're connecting with)
      });
  
      alert("Connection request sent!");
    } catch (error) {
      console.log("Error sending notification:", error);
    }
  };
  
  
  

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-poppins p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <div className="w-full lg:w-1/2 flex justify-center">
            <img
                src="/SkillSwapBg.png"
                alt="Skill Swap Background"
                className="w-[600px] h-auto object-contain animate-float"
            />

            </div>
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillmates.map((skillmate) => (
               <div
               key={skillmate._id}
               className="bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 w-full flex flex-col justify-between overflow-hidden border border-opacity-10 border-gray-300 hover:border-opacity-30 hover:-translate-y-1 group"
                >                          
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {skillmate.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
                        {skillmate.skills.length} skills
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-2 break-words">
                      {skillmate.email.split('@')[0]}
                    </h2>
                    
                    <div className="my-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillmate.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-800 border border-purple-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                      {skillmate.description || "Passionate about sharing knowledge and learning new skills!"}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={()=> handleConnect( skillmate.email)}>
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SkillSwap;