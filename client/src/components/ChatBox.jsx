import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiChevronLeft, FiSend, FiPaperclip, FiPhone, FiVideo } from 'react-icons/fi';
import axios from 'axios';
import Header from './Header';
import { io } from 'socket.io-client';

const ChatBox = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({}); // { email: [msg1, msg2, ...] }
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState('');  

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const receiverEmail = selectedUser?.email;

  useEffect(() => {
    // Initialize Socket.io connection
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
        console.log("Socket connected:", socketRef.current.id);
    socketRef.current.emit("register-user", userEmail); 
    });

    socketRef.current.emit('send-message', {
  senderEmail: userEmail,
  recipientEmail: selectedUser.email,
  message,
  timestamp: newMessage.timestamp,
});

    useEffect(() => {
  const emailFromStorage = localStorage.getItem('loggedInUserEmail');
  if (emailFromStorage) {
    setUserEmail(emailFromStorage);
  }
}, []);

    // Listen for incoming messages
    socketRef.current.on('private-message', (data) => {
      const { senderEmail, message, timestamp } = data;
      console.log("*****************************************************************",senderEmail);
      setMessages((prev) => ({
        ...prev,
        [senderEmail]: [
          ...(prev[senderEmail] || []),
          {
            id: Date.now(),
            text: message,
            sender: 'other',
            timestamp,
          },
        ],
      }));
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.off('connect');
      socketRef.current.off('receive-message');
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch chat users from API
    const fetchChatUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/notifications/chat-list', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Add a static user to the list (can be removed if not needed)
        const staticUser = {
          _id: 'static-1',
          name: 'Static user',
          email: 'Staticuser@example.com',
          unread: 0,
          lastMessage: 'Hello! I am static',
          role: 'Tester',
        };

        setUsers([staticUser, ...res.data]);
      } catch (error) {
        console.error('Error fetching chat users:', error);
      }
    };

    fetchChatUsers();
  }, []);

  useEffect(() => {
    // Scroll chat to bottom when messages or selected user change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);
 console.log('Messages for selectedUser:', messages[selectedUser?.email]);
 

  // Filter users by search term (search by email)
  const filteredUsers = users.filter((user) =>
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending message to socket and updating UI
  const handleSendMessage = () => {
    if (message.trim() && selectedUser && socketRef.current) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedUser.email]: [...(prev[selectedUser.email] || []), newMessage],
      }));

      socketRef.current.emit('send-message', {
        recipientEmail: selectedUser.email,
        message,
        timestamp: newMessage.timestamp,
      });

      setMessage('');
    }
  };

  // Initialize sample messages for a new conversation
  const initializeMessages = (userEmail) => {
    if (!messages[userEmail]) {
      const sampleMessages = [
        {
          id: 1,
          text: userEmail === 'user1@example.com' ? 'Hi there! How are you?' : 'About the project deadline...',
          sender: 'other',
          timestamp: '10:30 AM',
        },
        {
          id: 2,
          text: userEmail === 'user1@example.com' ? 'I was wondering about the project status' : 'The designs are almost ready',
          sender: 'other',
          timestamp: '10:32 AM',
        },
        {
          id: 3,
          text: 'Everything is on track!',
          sender: 'me',
          timestamp: '10:35 AM',
        },
      ];
      setMessages((prev) => ({ ...prev, [userEmail]: sampleMessages }));
    }
  };

  // When user is selected from sidebar
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    initializeMessages(user.email);
  };

 useEffect(() => {
  console.log('Messages for selectedUser:', messages[selectedUser?.email]);
  console.log('Messages for receiver:', messages[receiverEmail]);
}, [messages, selectedUser]);

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-poppins">
        {/* Sidebar */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: selectedUser ? '-100%' : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`absolute md:relative z-10 w-full md:w-80 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-poppins border-r border-gray-200 h-full flex flex-col ${selectedUser ? '-translate-x-full' : 'translate-x-0'}`}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
            <div className="relative mt-3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search people..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.email}
                whileHover={{ backgroundColor: '#f9fafb' }}
                whileTap={{ backgroundColor: '#f3f4f6' }}
                className={`flex items-center p-4 border-b border-gray-100 cursor-pointer ${selectedUser?.email === user.email ? 'bg-purple-50' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-purple-600">
                    <FiUser size={18} />
                  </div>
                  {user.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {user.unread}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{user.email}</h3>
                    {/* You can replace hardcoded time with actual last message timestamp */}
                    <span className="text-xs text-gray-500">10:30 AM</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage || 'Start a new chat...'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Area */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex-1 flex flex-col bg-white h-full"
            >
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Back to user list"
                >
                  <FiChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <FiUser size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
                  <p className="text-xs text-gray-500">{selectedUser.role || 'User'}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-purple-600" aria-label="Call">
                    <FiPhone size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-purple-600" aria-label="Video call">
                    <FiVideo size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <AnimatePresence>
                  {messages[selectedUser.email]?.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex mb-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-purple-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-purple-100' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-center">
                  <button className="p-2 text-gray-500 hover:text-purple-500" aria-label="Attach file">
                    <FiPaperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 mx-2 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-purple-600 hover:text-purple-800"
                    aria-label="Send message"
                  >
                    <FiSend size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatBox;
