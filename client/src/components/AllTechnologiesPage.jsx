import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const categories = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Redux", "Vue", "Angular"],
  Backend: ["Node.js", "Express", "Java", "Spring", "Python", "Django"],
  Database: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
  OS: ["Linux", "Windows", "MacOS"],
  Networking: ["HTTP", "DNS", "Load Balancing", "Firewalls"],
  AIML: ["Python", "Pandas", "NumPy", "TensorFlow", "Scikit-learn", "machinelearning"],
  ARVR: ["Unity", "Unreal Engine", "Blender", "ARKit", "ARCore"],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.1, boxShadow: "0 0 8px rgba(139, 92, 246, 0.6)" },
  tap: { scale: 0.95 },
};

const headingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

const AllTechnologiesPage = () => {
  const navigate = useNavigate();

  const handleClick = (tech) => {
    navigate(`/roadmap/${tech.toLowerCase()}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-10 font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-purple-800 mb-10"
        >
          Explore
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Categories */}
          <motion.div
            className="lg:w-2/3 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(categories).map(([category, techs]) => (
              <motion.div
                key={category}
                className="mb-10"
                variants={categoryVariants}
              >
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                  {category}
                </h2>
                <motion.div className="flex flex-wrap gap-4">
                  {techs.map((tech) => (
                    <motion.button
                      key={tech}
                      onClick={() => handleClick(tech)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-white text-purple-700 font-medium px-5 py-2 rounded-lg shadow-md transition"
                    >
                      {tech}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Panel */}
          <motion.div
            className="lg:w-1/3 w-full flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={headingVariants}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
          >
            <h2 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-purple-900 mb-14 text-center">
              Technology Roadmaps
            </h2>
            <p className="text-2xl font-poppins text-center max-w-xs">
              Enhance and learn the most demanding technologies from the roadmap
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllTechnologiesPage;
