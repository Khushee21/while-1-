import React from 'react';
import { Mail, Phone, User, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const ContactUsPage = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200  font-poppins p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2">
        {/* Contact Form */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">About the developer</h2>
          <form className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="text-purple-500" />
              <input type="text" placeholder="Your Full Name" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-purple-500" />
              <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-purple-500" />
              <input type="tel" placeholder="Contact Number" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex items-start gap-2">
              <MessageCircle className="text-purple-500 mt-1" />
              <textarea placeholder="Your Message..." className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Profile and Info */}
        <div className="p-6 bg-purple-100 flex flex-col items-center justify-center text-center">
          <img
            src="/bg1.jpeg"
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-md mb-4"
          />
          <h3 className="text-xl font-semibold text-purple-700">Khushi Rathore</h3>
          <p className="text-sm text-gray-600 mb-2"> MERN Stack Developer</p>
          <p className="text-sm text-gray-700">📧 khushirathore649@gmail.com</p>
          <p className="text-sm text-gray-700">📱 +91 98765 43210</p>
          <p className="text-sm text-gray-700 mt-4">
            I love building modern web apps with great UI. Feel free to reach out for internships, collaboration or tech chats!
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUsPage;