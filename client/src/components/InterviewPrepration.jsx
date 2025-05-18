import { motion } from "framer-motion";
import { useState } from "react";
import Header from "./Header";

const InterviewPreparation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userInput , setUserInput] = useState("");
  const [aiResponse , setAiResponse] = useState("");
  const [loading , setLoading]=useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const commonQuestions = [
    {
      question: "Tell me about yourself",
      answer: "Focus on your professional journey. Example: 'I'm a software engineer with 3 years of experience specializing in React and Node.js. I've led two major projects that improved system performance by 40%. Currently, I'm looking to bring my problem-solving skills to a more challenging environment.' Keep it concise (60-90 seconds).",
      tips: [
        "Start with current position",
        "Highlight key achievements",
        "Connect to the role you're applying for",
        "Avoid personal details"
      ]
    },
    {
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness you're improving. Example: 'I used to struggle with public speaking, so I joined Toastmasters and now lead weekly team presentations.' The formula is: weakness + concrete steps you're taking to improve.",
      tips: [
        "Be authentic but strategic",
        "Show self-awareness",
        "Demonstrate improvement",
        "Avoid clichés or strengths disguised as weaknesses"
      ]
    },
    {
      question: "Why should we hire you?",
      answer: "Match your skills to their needs. Example: 'With my 5 years in digital marketing and proven track record of increasing engagement by 35%, I can immediately contribute to your growth goals. My expertise in SEO and data analysis aligns perfectly with the requirements for this role.'",
      tips: [
        "Research the company first",
        "Connect your skills to their challenges",
        "Use quantifiable achievements",
        "Show enthusiasm for the role"
      ]
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition aligned with the company. Example: 'In five years, I hope to be in a leadership position where I can mentor others while still contributing technically. I'm particularly excited about your company's AI initiatives and would love to grow my expertise in that area.'",
      tips: [
        "Show career progression",
        "Demonstrate commitment to the field",
        "Align with company trajectory",
        "Avoid being too specific about job titles"
      ]
    },
    {
      question: "Why do you want to work here?",
      answer: "Example: 'I admire your commitment to sustainable practices—your recent carbon-neutral initiative impressed me. As someone passionate about environmental responsibility, I'd love to contribute my supply chain expertise to help further these goals while growing my skills in green logistics.'",
      tips: [
        "Mention specific company initiatives",
        "Connect to your values",
        "Show you've done research",
        "Link to your career goals"
      ]
    }
  ];

  const videoResources = [
    {
      title: "How to Ace Behavioral Interviews",
      channel: "Vinh Giang",
      url: "https://www.youtube.com/watch?v=0siE31sqz0Q",
      description: "Covers the STAR method for answering behavioral questions"
    },
    {
      title: "Technical Interview Preparation Guide",
      channel: "Allena Rais Live",
      url: "https://www.youtube.com/watch?v=0JUN9aDxVmI",
      description: "Walkthrough of solving coding problems under pressure"
    },
    {
      title: "HR Interview Questions and Answers",
      channel: "College Wallah",
      url: "https://www.youtube.com/watch?v=HlCVG1nk_m4",
      description: "Common HR questions with strong response strategies"
    },
    {
      title: "System Design Interview Prep",
      channel: "Intellipath",
      url: "https://www.youtube.com/watch?v=V5M925ZQEJU",
      description: "Approaching complex system design problems"
    }
  ];

  return (
    <>
    <Header/>
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-poppins py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Interview Preparation Hub
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your comprehensive guide to acing every interview round
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={itemVariants} className="mb-8">
          <nav className="flex flex-wrap justify-center gap-4">
            {["overview", "technical", "hr", "questions", "resources" , "Try with Ai"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-br from-blue-1=500 via-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          {activeTab === "Try with Ai" && (
  <div className="p-6 bg-white rounded-md shadow-md mt-4 w-full max-w-xl mx-auto">
    <h2 className="text-xl font-semibold mb-4 text-center">Ask AI for Interview Help</h2>

    <textarea
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Ask your interview question..."
      className="w-full border border-gray-300 rounded-md p-3 mb-4"
      rows={4}
    />

    <button
      onClick={async () => {
        setLoading(true);
        setAiResponse("");

        try {
          const res = await fetch("http://localhost:5000/api/ai/ask-ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput }),
          });

          const data = await res.json();
          setAiResponse(data.response || "No response from AI.");
        } catch (err) {
          setAiResponse("Something went wrong.");
        }

        setLoading(false);
      }}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
    >
      {loading ? "Thinking..." : "Ask AI"}
    </button>

    {aiResponse && (
      <div className="mt-4 bg-gray-100 border-l-4 border-blue-500 p-4">
        <p className="text-gray-800 whitespace-pre-line">{aiResponse}</p>
      </div>
    )}
  </div>
)}

        </motion.div>

        {/* Content Area */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Overview Section */}
          {activeTab === "overview" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Interview Process Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Technical Round</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Focus:</span> Assessing technical skills, problem-solving ability, and coding proficiency
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Duration:</span> 45-90 minutes
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Preparation:</span> Practice coding problems, review CS fundamentals, prepare for system design
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Key Insight:</span> Interviewers care more about your thought process than perfect solutions
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">HR Round</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Focus:</span> Evaluating cultural fit, communication skills, and behavioral competencies
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Duration:</span> 30-60 minutes
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Preparation:</span> Research company values, prepare STAR stories, anticipate common questions
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Key Insight:</span> HR assesses whether you'll thrive in their work environment long-term
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Key Differences</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Aspect</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Technical Round</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">HR Round</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Primary Goal</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Assess technical capability</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Evaluate cultural fit</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Question Types</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Coding problems, system design</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Behavioral, situational</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Evaluation Criteria</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Problem-solving, technical knowledge</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Communication, values alignment</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Preparation Focus</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Practice coding, review CS fundamentals</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Research company, prepare stories</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Technical Round Section */}
          {activeTab === "technical" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Interview Mastery</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Coding Challenges:</span> Algorithmic problems on platforms like HackerRank or whiteboarding
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">System Design:</span> For senior roles, designing scalable systems (prepare for tradeoffs)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Technical Knowledge:</span> Language-specific questions, CS fundamentals (OS, DB, networks)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Problem-Solving Approach:</span> They evaluate how you think more than just the solution
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Preparation Strategy</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Daily Practice:</span> Solve 2-3 problems daily on LeetCode/HackerRank (focus on patterns)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Mock Interviews:</span> Use Pramp or Interviewing.io for realistic practice
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Time Management:</span> Learn to break problems into smaller parts within time constraints
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Verbalize Thinking:</span> Practice explaining your thought process out loud while coding
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Common Technical Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-purple-700">1. "Reverse a linked list"</h4>
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">Approach:</span> Explain iterative and recursive methods. Discuss time/space complexity (O(n) time, O(1) space for iterative).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700">2. "Design Twitter"</h4>
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">Approach:</span> Start with requirements clarification, then discuss data models, API design, scaling considerations, and database choices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700">3. "Explain polymorphism"</h4>
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">Approach:</span> Define it (same interface, different implementations), give examples (method overriding), and relate to OOP principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HR Round Section */}
          {activeTab === "hr" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">HR Interview Success</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Behavioral Interview Insights</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">STAR Method:</span> Situation, Task, Action, Result - structure all behavioral answers
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Core Competencies:</span> They assess leadership, teamwork, problem-solving through your stories
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Cultural Fit:</span> Your values and work style should align with company culture (research this!)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Red Flags:</span> Negative talk about past employers is a major red flag for HR
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Preparation Techniques</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Story Bank:</span> Prepare 8-10 stories covering various competencies (conflict, failure, success)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Company Research:</span> Understand mission, values, recent news to tailor responses
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Question Anticipation:</span> Prepare for "Tell me about yourself" to "Why should we hire you?"
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">•</div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Body Language:</span> Practice confident posture, eye contact, and active listening
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">STAR Method Examples</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-purple-700">"Tell me about a time you faced conflict at work"</h4>
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">Situation:</span> Two team members disagreed on project approach during a tight deadline.<br />
                      <span className="font-medium">Task:</span> As project lead, I needed to resolve this without delaying delivery.<br />
                      <span className="font-medium">Action:</span> Facilitated a meeting to understand both perspectives, proposed a hybrid solution.<br />
                      <span className="font-medium">Result:</span> Implemented solution delivered on time with positive feedback from both members.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700">"Describe a time you failed"</h4>
                    <p className="mt-1 text-gray-700">
                      <span className="font-medium">Situation:</span> First time managing a client project, underestimated complexity.<br />
                      <span className="font-medium">Task:</span> Needed to deliver quality work despite initial missteps.<br />
                      <span className="font-medium">Action:</span> Owned the mistake, renegotiated timeline, brought in senior help.<br />
                      <span className="font-medium">Result:</span> Project completed successfully, client retained, I learned better scoping techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Questions Section */}
          {activeTab === "questions" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Interview Questions</h2>
              <p className="text-lg text-gray-600 mb-8">
                Master these frequently asked questions with our detailed response guides
              </p>

              <div className="space-y-8">
                {commonQuestions.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                      <div className="bg-purple-50 p-4 rounded-md mb-4">
                        <h4 className="font-medium text-purple-800 mb-2">Strong Answer:</h4>
                        <p className="text-gray-800">{item.answer}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Key Tips:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {item.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Section */}
          {activeTab === "resources" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Interview Preparation Resources</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {videoResources.map((video, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-gray-600 mb-4">{video.channel}</p>
                      <p className="text-gray-700 mb-4">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Watch Video
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Additional Resources</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-lg mb-2">LeetCode</h4>
                    <p className="text-gray-600 mb-3">Practice coding challenges</p>
                    <a href="https://leetcode.com/" className="text-purple-600 hover:underline">leetcode.com</a>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-lg mb-2">Glassdoor</h4>
                    <p className="text-gray-600 mb-3">Company-specific interview questions</p>
                    <a href="https://www.glassdoor.com/" className="text-purple-600 hover:underline">glassdoor.com</a>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-lg mb-2">Pramp</h4>
                    <p className="text-gray-600 mb-3">Free mock technical interviews</p>
                    <a href="https://www.pramp.com/" className="text-purple-600 hover:underline">pramp.com</a>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Final Tips */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Final Interview Tips</h2>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <h3 className="font-semibold mb-2">Before Interview</h3>
                <ul className="space-y-1 text-purple-100">
                  <li>Research company thoroughly</li>
                  <li>Prepare 3-5 questions to ask</li>
                  <li>Test your tech setup if virtual</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">During Interview</h3>
                <ul className="space-y-1 text-purple-100">
                  <li>Listen carefully before answering</li>
                  <li>Ask for clarification if needed</li>
                  <li>Take a moment to think when necessary</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">After Interview</h3>
                <ul className="space-y-1 text-purple-100">
                  <li>Send thank you email within 24 hours</li>
                  <li>Reflect on what went well/could improve</li>
                  <li>Follow up if you don't hear back</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
};

export default InterviewPreparation;