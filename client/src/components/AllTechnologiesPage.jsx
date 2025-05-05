import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const categories = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Redux", "Vue", "Angular"],
  Backend: ["Node.js", "Express", "Java", "Spring", "Python", "Django"],
  Database: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
  OS: ["Linux", "Windows", "MacOS"],
  Networking: ["HTTP", "DNS", "Load Balancing", "Firewalls"],
  AIML: ["Python", "Pandas", "NumPy", "TensorFlow", "Scikit-learn" , "machinelearning"],
  ARVR: ["Unity", "Unreal Engine", "Blender", "ARKit", "ARCore"],
};

const AllTechnologiesPage = () => {
  const navigate = useNavigate();

  const handleClick = (tech) => {
    navigate(`/roadmap/${tech.toLowerCase()}`);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-10 font-poppins">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">Explore</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: All buttons */}
        <div className="lg:w-2/3 w-full">
          {Object.entries(categories).map(([category, techs]) => (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">{category}</h2>
              <div className="flex flex-wrap gap-4">
                {techs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleClick(tech)}
                    className="bg-white hover:bg-purple-100 text-purple-700 font-medium px-5 py-2 rounded-lg shadow-md transition"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 w-full flex flex-col items-center justify-center">
          <h2 className="text-8xl font-bold text-purple-900 mb-14 text-center">Technology Roadmaps</h2>
          <p className="text-2xl font-poppins">enhance and learn most demanding technologies from the roadmap</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AllTechnologiesPage;
