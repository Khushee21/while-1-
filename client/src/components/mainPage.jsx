import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

  const navigate=useNavigate();

  return (
    <div className="font-poppins">
      <Header />

      <div className="font-poppins min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex flex-col md:flex-row items-center justify-around px-8 py-16 gap-10">
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          src="https://i.pinimg.com/1200x/35/cc/a9/35cca9bc4d3505f1ee7ff62f7c567a3a.jpg"
          alt="Learning"
          className="rounded-xl shadow-lg w-[860px] h-[840px] object-cover"
        />

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <p className="text-lg text-gray-600 mb-6">
            Join a community where learning never ends and growth is shared.
          </p>
          <Link to={"/chat"}>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow transition"
          >
            Tap to Start Chat
          </button>
          </Link>
        </motion.div>
      </div>

      <div className="px-8 py-16">
        <h2 className="text-2xl text-center font-semibold mb-10 text-gray-700">
          Explore Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Tech Roadmaps",
              desc: "Explore detailed roadmaps for various technologies like MERN, Java, Python, and more.",
              link: "/allTech",
              image: "/roadmap.jpg",
              button: "Learn More",
            },
            {
              title: "Chat with Mentor",
              desc: "Get real-time guidance and advice from experienced mentors.",
              link: "/mentors",
              image: "/mentors.jpg",
              button: "Start Chat",
            },
            {
              title: "Skill Swap",
              desc: "Swap skills with others and enhance your learning experience.",
              link: "/Skill-Swap",
              image: "/SkillSwap1.jpg",
              button: "Start Swapping",
            },
            {
              title: "Resume Builder",
              desc: "Build Resume to get higher chance of getting job with While(1).",
              link: "/resume",
              image: "/Resume.jpg",
              button: "Click to Build",
            },
            {
              title: "Interview Prep",
              desc: "Swap skills with others and enhance your learning experience.",
              link: "/interviewPrep",
              image: "/interview.jpg",
              button: "Interview",
            },
            {
              title: "Courses",
              desc: "Browse a wide variety of courses for different technologies to boost your skills.",
              link: "/cource",
              image: "/Cources.jpg",
              button: "Explore Courses",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-xl mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.desc}</p>
              <Link to={feature.link}>
                <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                  {feature.button}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
