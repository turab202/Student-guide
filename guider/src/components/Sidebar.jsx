import { useState, useEffect } from 'react';
import {
  FiHome,
  FiBook,
  FiCalendar,
  FiFileText,
  FiHelpCircle,
  FiAward,
  FiUsers,
  FiClock,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiBookmark,
  FiPieChart,
  FiLayers
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext'; // ✅ import AuthContext

const Sidebar = ({ darkMode = true, toggleDarkMode, setActiveComponent }) => {
  const { user } = useAuth(); // ✅ get user from context
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('FlashcardApp');

  const menuItems = [
    { name: 'StudyTracker', label: 'Study Tracker', icon: <FiPieChart size={20} className="text-purple-500" /> },
    { name: 'StudyHub', label: 'StudyHub', icon: <FiFileText size={20} className="text-blue-500" /> },
    { name: 'QuizMaker', label: 'Quiz Maker', icon: <FiHelpCircle size={20} className="text-green-500" /> },
    { name: 'DiscussionForum', label: 'Peer Study', icon: <FiUsers size={20} className="text-orange-500" /> },
    { name: 'ReadingTrainer', label: 'Reading Comprehension', icon: <FiLayers size={20} className="text-red-500" /> },
    { name: 'ExamCountdown', label: 'Exam Countdown', icon: <FiClock size={20} className="text-yellow-500" /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (name) => {
    setActiveItem(name);
    setActiveComponent(name);
    if (isMobile) setIsCollapsed(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Navbar - Menu Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`fixed top-4 left-4 p-2 cursor-pointer z-20 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          style={{ borderRadius: '4px' }}
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16 md:w-20' : 'w-64'
        } ${isMobile ? 'fixed top-0 h-full z-10' : 'relative'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          {!isMobile && (
            <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-between p-4'}`}>
              {!isCollapsed && <h1 className="text-xl font-bold">Student Learning</h1>}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`p-2 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                style={{ borderRadius: '4px' }}
              >
                {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
              </button>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleItemClick(item.name)}
                    className={`flex cursor-pointer items-center w-full p-3 rounded-lg transition-colors ${
                      activeItem === item.name
                        ? darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-700'
                        : darkMode
                        ? 'hover:bg-gray-700 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className={`${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer - User Info */}
          {!isCollapsed && (
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-2 font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span>{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 cursor-pointer rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className={`min-h-full p-4 ${isMobile ? 'pt-14' : ''} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
          {/* Your main content would be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
