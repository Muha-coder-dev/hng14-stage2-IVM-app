import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. IMPORT THE IMAGE HERE
import myAvatar from '../assets/Image.png';
import myLogo from '../assets/Oval.png';

const Sidebar = () => {
  // 1. Check the user's system to see if they already prefer dark mode!
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // When the app loads, check if 'dark' is already set
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  // 2. The switch mechanism
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="fixed z-50 flex md:flex-col justify-between items-center bg-[#373B53] w-full h-20 md:h-screen md:w-24 md:rounded-r-[1.5rem] overflow-hidden transition-colors">
      
 {/* Top Logo */}
      <Link to="/" className="w-20 md:w-full h-full md:h-24 bg-brand flex items-center justify-center rounded-r-2xl relative overflow-hidden">
        {/* The lighter purple curve on the bottom half of the background */}
        <div className="absolute top-1/2 left-0 w-full h-full bg-brand-light rounded-tl-2xl"></div>
        
        {/* Your New Uploaded Logo */}
        <img 
          src={myLogo} 
          alt="App Logo" 
          className="z-10 w-8 h-8 md:w-10 md:h-10 object-contain" 
        />
      </Link>

      {/* Bottom Controls (Theme & Avatar) */}
      <div className="flex md:flex-col items-center justify-between h-full md:h-auto w-auto md:w-full px-6 md:px-0">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="text-[#858BB2] hover:text-white transition-colors md:mb-8 mr-6 md:mr-0"
        >
          {isDarkMode ? (
            /* Sun Icon (Shows when in Dark Mode) */
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.8 20c-5.412 0-9.8-4.388-9.8-9.8 0-5.412 4.388-9.8 9.8-9.8 5.412 0 9.8 4.388 9.8 9.8 0 5.412-4.388 9.8-9.8 9.8zm0-17.653c-4.33 0-7.853 3.523-7.853 7.853 0 4.33 3.523 7.853 7.853 7.853 4.33 0 7.853-3.523 7.853-7.853 0-4.33-3.523-7.853-7.853-7.853z" fill="currentColor" fillRule="nonzero"/></svg>
          ) : (
            /* Moon Icon (Shows when in Light Mode) */
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.583.46A7.516 7.516 0 016.6 5.8 7.209 7.209 0 017.062 3.22.704.704 0 006.74 2.253a.703.703 0 00-.731.05 9.146 9.146 0 00-3.328 4.417A8.835 8.835 0 002.32 10.94a9.048 9.048 0 008.958 9.06 8.922 8.922 0 005.404-1.8 9.248 9.248 0 003.11-4.734.703.703 0 00-.29-1.124z" fill="currentColor" fillRule="nonzero"/></svg>
          )}
        </button>

        {/* Divider Line */}
        <div className="w-[1px] h-full md:w-full md:h-[1px] bg-[#494E6E]"></div>

        {/* User Avatar */}
        <div className="md:py-6 pl-6 md:pl-0">
          {/* 2. INJECT THE VARIABLE INTO THE SRC */}
          <img 
            src={myAvatar} 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full border-2 border-transparent hover:border-brand transition-colors cursor-pointer object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Sidebar;