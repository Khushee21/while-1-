import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed for routing

const MainPage = () => {
  return (
    <div className="font-poppins">
      <Header />

      <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex flex-col md:flex-row items-center justify-around px-8 py-16 gap-10">
        <img
          src="https://i.pinimg.com/1200x/35/cc/a9/35cca9bc4d3505f1ee7ff62f7c567a3a.jpg"
          alt="Learning"
          className="rounded-xl shadow-lg w-[860px] h-[840px] object-cover"
        />
        <div className="max-w-xl">
          <p className="text-lg text-gray-600 mb-6">
            Join a community where learning never ends and growth is shared.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow transition">
            Join Now
          </button>
        </div>
      </div>

      {/* Cards Section for Functionality */}
      <div className="px-8 py-16">
        <h2 className="text-2xl text-center font-semibold mb-10 text-gray-700">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Roadmap of Technologies */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Tech Roadmap"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Tech Roadmaps</h3>
            <p className="text-gray-600 mb-4">Explore detailed roadmaps for various technologies like MERN, Java, Python, and more.</p>
            <Link to="/allTech">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                Learn More
              </button>
            </Link>
          </div>

          {/* Chat with Mentor */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Chat with Mentor"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Chat with Mentor</h3>
            <p className="text-gray-600 mb-4">Get real-time guidance and advice from experienced mentors.</p>
            <Link to="/mentors">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                Start Chat
              </button>
            </Link>
          </div>

          {/* Skill Swap */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Skill Swap"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Skill Swap</h3>
            <p className="text-gray-600 mb-4">Swap skills with others and enhance your learning experience.</p>
            <Link to="/skill-swap">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                Start Swapping
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Skill Swap"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Skill Swap</h3>
            <p className="text-gray-600 mb-4">Swap skills with others and enhance your learning experience.</p>
            <Link to="/skill-swap">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                Resume Builder
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Skill Swap"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Skill Swap</h3>
            <p className="text-gray-600 mb-4">Swap skills with others and enhance your learning experience.</p>
            <Link to="/skill-swap">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
               Interview
              </button>
            </Link>
          </div>

          {/* Courses */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Courses"
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Courses</h3>
            <p className="text-gray-600 mb-4">Browse a wide variety of courses for different technologies to boost your skills.</p>
            <Link to="/courses">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
