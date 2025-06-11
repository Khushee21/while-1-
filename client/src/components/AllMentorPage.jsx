import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const AllMentorPage = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("https://while-1.onrender.com/api/mentors");
        setMentors(res.data);
      } catch (error) {
        console.error("Error Fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 font-poppins p-6">
      <div className="flex flex-col  lg:flex-row gap-10">
        <div className="lg:w-2/3 w-full">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
            Available Mentors
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all h-[250px] w-[350px] flex flex-col justify-between  overflow-hidden"
            >
            <div className="flex-grow">
             <h2 className="text-xl font-semibold text-purple-700 mb-2">
              {mentor.email}
             </h2>
             <div className="flex">
             <div>
            <img src="/mentor.jpg" alt="Mentor" className="w-14 h-14 rounded-full object-cover mb-4 mx-auto" />
            </div>
            <div className="ml-7">
              <h2 className="text-md font-medium text-gray-700">Skills:</h2>
                <ul
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[150px] overflow-auto`}
                >
               {mentor.skills.map((skill, index) => (
              <li key={index} className="list-disc ml-4">
              {skill}
            </li>
          ))}
        </ul>
        </div>
        </div>
        </div>
 
          <a
            href={`mailto:${mentor.email}?subject=Request for Mentorship&body=Hi , I would like to connect with you as a mentor .`}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition mt-4 text-center"
           >
           Send Petition
           </a>
          </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 w-full flex flex-col items-center justify-center mt-24 text-center">
          <h2 className="text-5xl sm:text-7xl font-bold text-purple-900 mb-6">
            Mentors for your bright career
          </h2>
          <p className="text-lg sm:text-xl">
            with the most intelligent mentors of the industry
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AllMentorPage;
