import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MainPage from "./components/mainPage"; 
import AllTechnologiesPage from "./components/AllTechnologiesPage";
import RoadmapPage from "./components/RoadmapPage";
import AllMentorPage from "./components/AllMentorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/allTech" element={<AllTechnologiesPage/>}/> 
        <Route path="/roadmap/:tech" element={<RoadmapPage />} />
        <Route path="/mentors" element={<AllMentorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
