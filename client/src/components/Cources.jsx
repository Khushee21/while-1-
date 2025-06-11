import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState , useEffect } from "react";
import Header from "./Header";

const stats = [
  { value: 500, suffix: "+", label: "Courses Available" },
  { value: 250000, suffix: "+", label: "Students Enrolled" },
  { value: 100, suffix: "+", label: "Expert Instructors" },
  { value: 4.8, suffix: "★", label: "Average Rating" },
];

const OnlineCourses = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayValues, setDisplayValues] = useState(stats.map(() => 0));
  const motionValues = stats.map(() => useMotionValue(0));
  const roundedValues = motionValues.map((motionVal) =>
   useTransform(motionVal, (latest) =>
     latest % 1 === 0 ? Math.floor(latest) : latest.toFixed(1)
    )
  );


  useEffect(() => {
  const controls = motionValues.map((motionVal, index) =>
    animate(motionVal, stats[index].value, {
      duration: 2,
      ease: "easeOut",
      delay: index * 0.2,
    })
  );

  const unsubscribes = roundedValues.map((rounded, index) =>
    rounded.on("change", (v) => {
      setDisplayValues((prev) => {
        const newValues = [...prev];
        newValues[index] = v;
        return newValues;
      });
    })
  );

  return () => {
    controls.forEach((control) => control.stop());
    unsubscribes.forEach((unsubscribe) => unsubscribe());
  };
}, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "development", name: "Development" },
    { id: "design", name: "Design" },
    { id: "business", name: "Business" },
    { id: "marketing", name: "Marketing" },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete React Developer 2024",
      instructor: "Maximilian Schwarzmüller",
      instructorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      students: 12543,
      price: 129.99,
      discountedPrice: 89.99,
      category: "development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Master React, Redux, React Router, and more by building modern web applications",
      duration: "32 hours",
      lessons: 245,
      isFeatured: true,
      isNew: false,
    },
    {
      id: 2,
      title: "UX/UI Design Fundamentals",
      instructor: "Sarah Johnson",
      instructorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.7,
      students: 8742,
      price: 99.99,
      discountedPrice: 69.99,
      category: "design",
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Learn the principles of user experience and interface design from scratch",
      duration: "24 hours",
      lessons: 180,
      isFeatured: false,
      isNew: true,
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      instructor: "Alex Wong",
      instructorImage: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.6,
      students: 15632,
      price: 149.99,
      discountedPrice: 99.99,
      category: "marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "SEO, Social Media, Content Marketing, and Google Ads all in one course",
      duration: "40 hours",
      lessons: 320,
      isFeatured: true,
      isNew: false,
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Jose Portilla",
      instructorImage: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4.9,
      students: 23456,
      price: 119.99,
      discountedPrice: 79.99,
      category: "development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Learn Python, NumPy, Pandas, Matplotlib, and Machine Learning",
      duration: "28 hours",
      lessons: 210,
      isFeatured: false,
      isNew: false,
    },
    {
      id: 5,
      title: "Financial Analysis Fundamentals",
      instructor: "Chris Haroun",
      instructorImage: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 4.5,
      students: 7654,
      price: 109.99,
      discountedPrice: 59.99,
      category: "business",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Learn financial statements, ratios, and valuation techniques",
      duration: "18 hours",
      lessons: 135,
      isFeatured: false,
      isNew: true,
    },
    {
      id: 6,
      title: "Advanced JavaScript Concepts",
      instructor: "Andrei Neagoie",
      instructorImage: "https://randomuser.me/api/portraits/men/72.jpg",
      rating: 4.8,
      students: 9876,
      price: 99.99,
      discountedPrice: 74.99,
      category: "development",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Master closures, prototypes, async/await, and modern JS patterns",
      duration: "22 hours",
      lessons: 165,
      isFeatured: true,
      isNew: false,
    },
    {
      id: 7,
      title: "Figma UI Design: From Zero to Hero",
      instructor: "Meng To",
      instructorImage: "https://randomuser.me/api/portraits/men/28.jpg",
      rating: 4.7,
      students: 6543,
      price: 89.99,
      discountedPrice: 49.99,
      category: "design",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Complete guide to designing modern interfaces with Figma",
      duration: "15 hours",
      lessons: 120,
      isFeatured: false,
      isNew: false,
    },
    {
      id: 8,
      title: "Startup Entrepreneurship",
      instructor: "Steve Blank",
      instructorImage: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4.6,
      students: 5432,
      price: 139.99,
      discountedPrice: 89.99,
      category: "business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Learn how to build and scale successful startups",
      duration: "30 hours",
      lessons: 225,
      isFeatured: false,
      isNew: true,
    },
  ];

  const filteredCourses = activeCategory === "all"
    ? courses
    : courses.filter((course) => course.category === activeCategory);

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
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 text-center mb-12"
          variants={itemVariants}
        >
          Explore Our Online Courses
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={itemVariants}
            >
              <p className="text-3xl font-bold text-puple-600">
                {displayValues[index]}
                {stat.suffix}
              </p>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="relative"
              onHoverStart={() => setHoveredCard(course.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Course Card */}
              <motion.div 
                className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10 }}
                animate={{
                  scale: hoveredCard === course.id ? 1.03 : 1,
                  boxShadow: hoveredCard === course.id 
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Course Image */}
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                  />
                  {course.isFeatured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  {course.isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      New
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-gray-600 text-sm ml-1">
                        {course.rating} ({course.students.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center mt-auto mb-4">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      {course.instructor}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {course.lessons}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="px-5 pb-5">
                  <div className="flex justify-between items-center">
                    <div>
                      {course.discountedPrice && (
                        <span className="text-gray-500 line-through text-sm mr-2">
                          ${course.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        ${course.discountedPrice ? course.discountedPrice.toFixed(2) : course.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 hover:bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Floating Info (appears on hover) */}
              {hoveredCard === course.id && (
                <motion.div 
                  className="absolute -bottom-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold text-sm mb-2">What you'll learn:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Comprehensive curriculum covering all key concepts</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Hands-on projects and exercises</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Learning Today</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students advancing their careers with our courses
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Browse All Courses
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                Get Learning Recommendations
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
};

export default OnlineCourses;