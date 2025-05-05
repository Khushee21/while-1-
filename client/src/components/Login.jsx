import React, { useState } from "react";
import axios from "axios";
import { BG } from "./constant";
//import mainPage from "./mainPage";
import { useNavigate } from "react-router-dom"; 
import ReviewSlider from "./ReviewSlider";
import LoginFooter from "./Loginfooter";
import FloatingContactButtons from "./FlootingContactBtn";
import CookieConsent from "./CookieConsent";
function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const navigate = useNavigate();


  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skill.trim()) {
      e.preventDefault();
      if (!skills.includes(skill.trim())) {
        setSkills([...skills, skill.trim()]);
      }
      setSkill('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = isSignInForm
        ? { email, password }
        : { email, password, skillLevel, skills };

      const endpoint = isSignInForm
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const response = await axios.post(endpoint, payload);

      alert("Success ");
      console.log("Response:", response.data);
      navigate("/mainPage");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login/Register failed:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Something went wrong");
    }

  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={BG}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 -z-10"
      />

      <div className="relative z-10 flex mt-40 mr-1 w-full">
        <div className="relative">
        <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 ml-7 leading-tight text-white">
            while(1): <br />
            infinite learning, <br />
            teaching, growing 🚀
          </h1>
        </div>
        <FloatingContactButtons/>
        <CookieConsent/>
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-opacity-10 p-6 rounded-lg shadow-lg w-80 mx-auto mr-15 mt-24 font-poppins opacity-90"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            {isSignInForm ? "Sign In" : "Sign up"}
          </h1>

          <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {!isSignInForm && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="skillLevel">
                Skill Level
              </label>
              <select
                id="skillLevel"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select your skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="mentor">Mentor</option>
              </select>

              <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="skill">
                Skills
              </label>
              <input
                id="skill"
                type="text"
                placeholder="Enter your skills"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={handleAddSkill}
              />

              <div className="flex flex-wrap gap-2">
                {skills.map((sk, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {sk}
                    <button
                      className="ml-2 text-blue-500 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        removeSkill(index);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <h1
            className="font-bold mr-1 p-1 font-poppins text-sm cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New explorer? Sign up now!"
              : "Already registered? Sign in Now"}
          </h1>
        </form>
      </div>

      <div className="z-10 ml-20 mt-2 py-4 px-3 mr-12 text-white text-3xl font-bold font-medium font-poppins">
        At <span className="font-bold text-pink-300">SkillSwaper</span>, we match learners and mentors based on real skill needs. <br />
        Get <span className="font-bold text-blue-300">AI-powered roadmaps</span>, swap sessions, share tips, and grow your tech career — <br />
        one swap at a time.
      </div>
      <ReviewSlider/>
      <LoginFooter/>
    </div>
  );
}

export default Login;
