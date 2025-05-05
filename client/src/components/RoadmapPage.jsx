import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-opacity-10 p-8 font-poppins">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-16">
          {roadmap.title}
        </h1>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-dotted border-purple-400 z-0" />

          {roadmap.steps.map((step, index) => (
            <div
              key={index}
              className={`mb-12 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } relative z-10`}
            >
              <div className="w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-300">
                  <h3 className="text-purple-700 font-semibold mb-2">
                    Step {index + 1}
                  </h3>
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>

              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-purple-500 border-4 border-white rounded-full z-20 shadow-md" />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RoadmapPage;
