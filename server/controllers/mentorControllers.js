import User from "../models/userModel.js";
export const getAllMentors = async (req, res) => {
    try 
    {
      const mentors = await User.find({ skillLevel: "mentor" }).select("-password");
      res.status(200).json(mentors);
    } 
    catch (error) 
    {
      console.log("Error fetching data:", error.message);
      res.status(500).json({ message: "Error fetching data" });
    }
  };
  