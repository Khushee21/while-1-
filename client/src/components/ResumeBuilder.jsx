import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactToPdf from 'react-to-pdf';
import { useRef } from 'react';
import { a, div, p } from 'framer-motion/client';
import Header from './Header';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const ResumeBuilder = () => {
  
  const pdfRef = useRef();
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      photo: null,
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: ''
    },
    objective: '',
    education: [{
      degree: '',
      institution: '',
      year: '',
      grade: ''
    }],
    skills: {
      technical: [],
      soft: []
    },
    projects: [{
      title: '',
      description: '',
      techStack: [],
      link: ''
    }],
    experience: [{
      role: '',
      company: '',
      duration: '',
      description: ''
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: ''
    }],
    achievements: [''],
    languages: [{
      language: '',
      proficiency: ''
    }],
    hobbies: ['']
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedArray = [...resumeData[section]];
      updatedArray[index] = { ...updatedArray[index], [name]: value };
      setResumeData({ ...resumeData, [section]: updatedArray });
    } else {
      setResumeData({ 
        ...resumeData, 
        [section]: { ...resumeData[section], [name]: value } 
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ 
          ...resumeData, 
          personal: { ...resumeData.personal, photo: event.target.result } 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section, template = {}) => {
    setResumeData({ 
      ...resumeData, 
      [section]: [...resumeData[section], template] 
    });
  };

  const removeItem = (section, index) => {
    const updatedArray = resumeData[section].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [section]: updatedArray });
  };

  const addSkill = (type) => {
    const skill = type === 'technical' ? newTechSkill : newSoftSkill;
    if (skill.trim()) {
      setResumeData({
        ...resumeData,
        skills: {
          ...resumeData.skills,
          [type]: [...resumeData.skills[type], skill.trim()]
        }
      });
      type === 'technical' ? setNewTechSkill('') : setNewSoftSkill('');
    }
  };

  const removeSkill = (type, index) => {
    const updatedSkills = [...resumeData.skills[type]];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [type]: updatedSkills
      }
    });
  };

  const handleDownload = () => {
    pdfRef.current.save();
  };

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'objective', label: 'Objective' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'languages', label: 'Languages' },
    { id: 'hobbies', label: 'Hobbies' }
  ];

  return (
    <>
    <Header/>
    <div className="w-full bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 font-poppins min-h-screen py-8 px-4 sm:px-6 lg:px-8 ">
     <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full sm:max-w-6xl mx-auto px-2"
        >
        <motion.h1 
          variants={slideIn}
          className="text-4xl font-bold text-center text-gray-800 mb-2"
        >
          Professional Resume Builder
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
                    activeTab === tab.id ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Personal Details */}
            {activeTab === 'personal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <label className="block text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={resumeData.personal.name}
                      onChange={(e) => handleChange(e, 'personal')}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mb-2 overflow-hidden border-2 border-gray-300">
                      {resumeData.personal.photo ? (
                        <img 
                          src={resumeData.personal.photo} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Photo
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={resumeData.personal.email}
                      onChange={(e) => handleChange(e, 'personal')}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={resumeData.personal.phone}
                      onChange={(e) => handleChange(e, 'personal')}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={resumeData.personal.address}
                    onChange={(e) => handleChange(e, 'personal')}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={resumeData.personal.linkedin}
                      onChange={(e) => handleChange(e, 'personal')}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      name="github"
                      value={resumeData.personal.github}
                      onChange={(e) => handleChange(e, 'personal')}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://github.com/yourname"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Career Objective */}
            {activeTab === 'objective' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label className="block text-gray-700 mb-1">Career Objective/Summary*</label>
                <textarea
                  name="objective"
                  value={resumeData.objective}
                  onChange={(e) => setResumeData({ ...resumeData, objective: e.target.value })}
                  rows="6"
                  className="w-full p-2 border rounded-lg"
                  placeholder="A passionate software developer with 3+ years of experience..."
                  required
                />
              </motion.div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Education #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Degree*</label>
                        <input
                          type="text"
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Bachelor of Technology"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Institution*</label>
                        <input
                          type="text"
                          name="institution"
                          value={edu.institution}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="University Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Year*</label>
                        <input
                          type="text"
                          name="year"
                          value={edu.year}
                          onChange={ (e) =>   handleChange(e, 'education', index)}
                          
                          className="w-full p-2 border rounded-lg"
                          placeholder="2018-2022"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Grade/CGPA</label>
                        <input
                          type="text"
                          name="grade"
                          value={edu.grade}
                          onChange={(e) => handleChange(e, 'education', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="8.5 CGPA"
                        />
                      </div>
                    </div>
                    {resumeData.education.length > 1 && (
                      <button
                        onClick={() => removeItem('education', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                  
                ))}
                <button
                  onClick={() => addItem('education', { degree: '', institution: '', year: '', grade: '' })}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Education
                </button>
              </motion.div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Technical Skills*</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.technical.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill('technical', index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newTechSkill}
                      onChange={(e) => setNewTechSkill(e.target.value)}
                      placeholder="JavaScript, React, Python..."
                      className="flex-1 p-2 border rounded-l-lg"
                      onKeyDown={(e) => e.key === 'Enter' && addSkill('technical')}
                    />
                    <button
                      onClick={() => addSkill('technical')}
                      className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.soft.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center bg-green-100 px-3 py-1 rounded-full"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill('soft', index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newSoftSkill}
                      onChange={(e) => setNewSoftSkill(e.target.value)}
                      placeholder="Communication, Leadership..."
                      className="flex-1 p-2 border rounded-l-lg"
                      onKeyDown={(e) => e.key === 'Enter' && addSkill('soft')}
                    />
                    <button
                      onClick={() => addSkill('soft')}
                      className="px-4 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Projects */}
            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Project #{index + 1}</h3>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Project Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={project.title}
                        onChange={(e) => handleChange(e, 'projects', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="E-commerce Website"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Description*</label>
                      <textarea
                        name="description"
                        value={project.description}
                        onChange={(e) => handleChange(e, 'projects', index)}
                        rows="3"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Developed a full-stack e-commerce platform with..."
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Tech Stack</label>
                      <input
                        type="text"
                        name="techStack"
                        value={project.techStack.join(', ')}
                        onChange={(e) => {
                          const updatedProjects = [...resumeData.projects];
                          updatedProjects[index].techStack = e.target.value.split(',').map(t => t.trim());
                          setResumeData({ ...resumeData, projects: updatedProjects });
                        }}
                        className="w-full p-2 border rounded-lg"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Project Link</label>
                      <input
                        type="url"
                        name="link"
                        value={project.link}
                        onChange={(e) => handleChange(e, 'projects', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="https://github.com/yourname/project"
                      />
                    </div>
                    {resumeData.projects.length > 1 && (
                      <button
                        onClick={() => removeItem('projects', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('projects', { title: '', description: '', techStack: [], link: '' })}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Project
                </button>
              </motion.div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Experience #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Role*</label>
                        <input
                          type="text"
                          name="role"
                          value={exp.role}
                          onChange={(e) => handleChange(e, 'experience', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Software Developer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Company*</label>
                        <input
                          type="text"
                          name="company"
                          value={exp.company}
                          onChange={(e) => handleChange(e, 'experience', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Google Inc."
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Duration*</label>
                      <input
                        type="text"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="June 2020 - Present"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Description*</label>
                      <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        rows="3"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Developed and maintained web applications using..."
                        required
                      />
                    </div>
                    {resumeData.experience.length > 1 && (
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('experience', { role: '', company: '', duration: '', description: '' })}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Experience
                </button>
              </motion.div>
            )}

            {/* Certifications */}
            {activeTab === 'certifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Certification #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={cert.name}
                          onChange={(e) => handleChange(e, 'certifications', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="AWS Certified Developer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Issuer*</label>
                        <input
                          type="text"
                          name="issuer"
                          value={cert.issuer}
                          onChange={(e) => handleChange(e, 'certifications', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Amazon Web Services"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Date Earned</label>
                      <input
                        type="text"
                        name="date"
                        value={cert.date}
                        onChange={(e) => handleChange(e, 'certifications', index)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="June 2022"
                      />
                    </div>
                    {resumeData.certifications.length > 1 && (
                      <button
                        onClick={() => removeItem('certifications', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Certification
                </button>
              </motion.div>
            )}

            {/* Achievements */}
            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.achievements.map((achievement, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Achievement #{index + 1}</h3>
                    <div>
                      <label className="block text-gray-700 mb-1">Description*</label>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => {
                          const updatedAchievements = [...resumeData.achievements];
                          updatedAchievements[index] = e.target.value;
                          setResumeData({ ...resumeData, achievements: updatedAchievements });
                        }}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Won 1st prize in Hackathon 2021"
                        required
                      />
                    </div>
                    {resumeData.achievements.length > 1 && (
                      <button
                        onClick={() => removeItem('achievements', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('achievements', '')}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Achievement
                </button>
              </motion.div>
            )}

            {/* Languages */}
            {activeTab === 'languages' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.languages.map((lang, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Language #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Language*</label>
                        <input
                          type="text"
                          name="language"
                          value={lang.language}
                          onChange={(e) => handleChange(e, 'languages', index)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="English"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Proficiency*</label>
                        <select
                          name="proficiency"
                          value={lang.proficiency}
                          onChange={(e) => handleChange(e, 'languages', index)}
                          className="w-full p-2 border rounded-lg"
                          required
                        >
                          <option value="">Select</option>
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Basic">Basic</option>
                        </select>
                      </div>
                    </div>
                    {resumeData.languages.length > 1 && (
                      <button
                        onClick={() => removeItem('languages', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('languages', { language: '', proficiency: '' })}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Language
                </button>
              </motion.div>
            )}

            {/* Hobbies */}
            {activeTab === 'hobbies' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {resumeData.hobbies.map((hobby, index) => (
                  <div key={index} className="border p-4 rounded-lg relative">
                    <h3 className="font-medium text-gray-700 mb-3">Hobby/Interest #{index + 1}</h3>
                    <div>
                      <label className="block text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={hobby}
                        onChange={(e) => {
                          const updatedHobbies = [...resumeData.hobbies];
                          updatedHobbies[index] = e.target.value;
                          setResumeData({ ...resumeData, hobbies: updatedHobbies });
                        }}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Photography, Chess, Hiking"
                      />
                    </div>
                    {resumeData.hobbies.length > 1 && (
                      <button
                        onClick={() => removeItem('hobbies', index)}
                        className="mt-2 text-red-500 text-sm absolute top-2 right-2"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addItem('hobbies', '')}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Hobby/Interest
                </button>
              </motion.div>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
            >
              <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
              <div className="border-2 border-gray-200 rounded-lg p-4 min-h-[500px]">
                {/* Personal Info */}
                <div className="text-center mb-6">
                  {resumeData.personal.photo && (
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gray-300">
                      <img 
                        src={resumeData.personal.photo} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">
                    {resumeData.personal.name || 'Your Name'}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-x-4 text-gray-600 text-sm mt-1">
                    {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                    {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                  </div>
                  <div className="flex justify-center gap-x-4 mt-2">
                    {resumeData.personal.linkedin && (
                      <a href={resumeData.personal.linkedin} className="text-blue-500 hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {resumeData.personal.github && (
                      <a href={resumeData.personal.github} className="text-gray-700 hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                    {/*Address*/}
                {resumeData.personal.address && (
                  <div>
                     <div className="mb-6">
                      <h4 className="font-semibold border-b border-gray-200 pb-1">Address</h4>
                       <p className="text-gray-700 mt-2 text-sm">
                          {resumeData.personal.address}
                        </p>
                     </div>
                  </div>
                )}

                {/* Objective */}
                {resumeData.objective && (
                  <div className="mb-6">
                  <h4 className="font-semibold border-b border-gray-200 pb-1">Objective</h4>
                   <p className="text-gray-700 mt-2 text-sm">
                  {resumeData.objective}
                  </p>
                  </div>  
                )}
                {/* Education */}
                {resumeData.education.some(edu => edu.degree) && (
                <div className="mb-6">
                   <h4 className="font-semibold  border-gray-200 pb-1 mb-2">Education</h4>
                   <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    edu.degree && (
                    <div key={index} className="p-4 border rounded-lg ">
                    <p className="font-medium text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <div className="text-sm text-gray-600 mt-1">
                   <span>{edu.year}</span>{' '}
                   {edu.grade && <span> • Grade: {edu.grade}</span>}
                  </div>
                 </div>
                  )
              ))}
              {/*skills*/}
              {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
                <div className="mb-6">
                <h4 className="font-semibold border-b border-gray-200 pb-1 mb-2">Skills</h4>
                {resumeData.skills.technical.length > 0 && (
                   <div className="mb-4">
                     <h5 className="font-medium text-gray-700 mb-1">Technical Skills</h5>
                       <ul className="flex flex-wrap gap-2 text-sm text-blue-800">
                        {resumeData.skills.technical.map((skill, index) => (
                        <li
                         key={index}
                          className=" px-3 py-1 rounded-full"
                        >
                        {skill}
                        </li>
                      ))}
                    </ul>
                    </div>
                )}
               {resumeData.skills.soft.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Soft Skills</h5>
                  <ul className="flex flex-wrap gap-2 text-sm text-green-800">
                    {resumeData.skills.soft.map((skill, index) => (
                  <li
                     key={index}
                      className=" px-3 py-1 rounded-full"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
          )}
              {resumeData.projects.length >0 && (
                <div className="mb-6">
                   <h4 className="font-semibold border-b border-gray-200 pb-1 mb-4">Projects</h4>
                   <div className="space-y-4">
                    {resumeData.projects.map((project , index)=>(
                       <div key={index} className="bg-gray-50 border p-4 rounded-lg">
                        <h5 className="text-lg font-semibold text-gray-800 mb-1">{project.title || `Project #${index + 1}`}</h5>
                        {project.techStack.length >0 &&(
                         <p className="text-sm text-gray-600 mb-1 italic">
                            <span className="font-medium text-gray-700">Tech Stack:</span> {project.techStack.join(', ')}
                         </p>
                        )}
                        {project.link && (
                          <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                           className="text-blue-600 text-sm underline hover:text-blue-800">
                            Link
                          </a>
                        )}
                      </div>
                    ))}
                   </div>
                </div>
              )}
             </div>
            </div>
            )}

            </div>
            </motion.div>
            </div>
        </div>
        </motion.div>
        <button
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 ml-52 mr-52 mt-10"
                onClick={handleDownload}
        >
            Download
            </button>

        </div>
        </>
      
    )
    };

    export default ResumeBuilder;