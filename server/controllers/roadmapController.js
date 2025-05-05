import roadmapData from "../utils/RoadmapData.js";

const getRoadmapByTech = (req , res) =>{
    const { tech }=req.params;
    const roadmap=roadmapData.find(r => r.tech.toLowerCase() === tech.toLowerCase());

    if(!roadmap)
    {
        return res.status(404).json({ message: " Roadmap not found "});
    }
    res.status(200).json(roadmap);
};

export default getRoadmapByTech;