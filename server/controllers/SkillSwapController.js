import User from "../models/userModel.js";


export const getAllSkillMates= async (req , res) =>{
    try{
        const skillmates=await User.find({skillLevel: "intermediate"}).select("-password");
        res.status(200).json(skillmates);
    }
    catch(error){
        console.log("Error fetching data:", error.message);
        res.status(500).json({ message: "Error fetching data"
        });
    }
}

