import axios from 'axios';

const PostAiForInterview = async (req, res) => {
  const { userInput } = req.body;

  // Place URL and key directly here
  const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: userInput },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const aiResponse = response.data?.[0]?.generated_text || "No response from AI.";

    res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error("AI API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong with the AI response." });
  }
  console.log(HUGGINGFACE_API_URL);
  console.log(HUGGINGFACE_API_KEY);
};

export default PostAiForInterview;
