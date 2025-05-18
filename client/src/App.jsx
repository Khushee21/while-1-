import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./components/mainPage"; 
import AllTechnologiesPage from "./components/AllTechnologiesPage";
import RoadmapPage from "./components/RoadmapPage";
import AllMentorPage from "./components/AllMentorPage";
import SkillSwap from "./components/SkillsSwap";
import Notifications from "./components/Notification";
import ChatBox from "./components/ChatBox";
import InterviewPreparation from "./components/InterviewPrepration";
import OnlineCourses from "./components/Cources";
import ResumeBuilder from "./components/ResumeBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/allTech" element={<AllTechnologiesPage/>}/> 
        <Route path="/roadmap/:tech" element={<RoadmapPage />} />
        <Route path="/mentors" element={<AllMentorPage/>}/>
        <Route path="/Skill-Swap" element={<SkillSwap/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/chat" element={<ChatBox/>}/>
        <Route path="/interviewPrep" element={<InterviewPreparation/>}/>
        <Route path="/cource" element={<OnlineCourses/>}/>
        <Route path="/resume" element={<ResumeBuilder/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
