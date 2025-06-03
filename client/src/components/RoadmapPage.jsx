import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";

const RoadmapPage = () => {
  const { tech } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/roadmap/${tech}`)
      .then((res) => setRoadmap(res.data))
      .catch(() => setError("Roadmap not found"));
  }, [tech]);

  if (error)
    return (
      <h2 className="text-center text-red-600 text-xl mt-10">{error}</h2>
    );

  return (
    roadmap && (
      <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-10 font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-purple-800 mb-16 tracking-wide"
        >
          🚀 {roadmap.title}
        </motion.h1>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-dotted border-purple-300 z-0" />

          {roadmap.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`mb-14 flex items-center gap-6 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } relative z-10`}
            >
              <div className="w-1/2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-purple-400 transition-all duration-300"
                >
                  <h3 className="text-purple-700 font-bold text-lg mb-2">
                    Step {index + 1}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <motion.span
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-tr from-purple-500 to-pink-500 border-4 border-white rounded-full z-20 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      </>
    )
  );
};

export default RoadmapPage;
