import React, { useState } from 'react';

const Header = ({ userProfile, onOpenEditModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-emerald-600 text-white shadow-md px-4 py-3 flex justify-between items-center relative z-40">
      
      {/* LEFT COMPONENT: HAMBURGER MENU BUTTON & INDEX LOGO */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => alert("Index Menu Sidebar Triggered!")} 
          className="p-2 hover:bg-emerald-700 rounded-lg transition focus:outline-none"
          title="Open Menu"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xl">🌿</span>
          <span className="font-bold tracking-wide text-lg hidden sm:inline-block">Eco-Health Portal</span>
        </div>
      </div>

      {/* RIGHT COMPONENT: INTEGRATED PROFILE DROPDOWN */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 transition px-3 py-1.5 rounded-lg font-medium shadow-inner focus:outline-none text-sm"
        >
          <span>👤</span>
          <span>{userProfile.name}</span>
          <span className={`text-[10px] transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
            {/* Quick Status Title */}
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Active Health Vitals</p>
            </div>

            {/* Dynamic Core Grid layout */}
            <div className="p-3 grid grid-cols-2 gap-2 bg-white text-xs">
              <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Calculated Age</span>
                <span className="font-semibold text-gray-800">{userProfile.age || 'N/A'} Yrs</span>
              </div>
              <div className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Blood Group</span>
                <span className="font-semibold text-gray-800">{userProfile.bloodGroup || 'N/A'}</span>
              </div>
              <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Height (Stature)</span>
                <span className="font-semibold text-gray-800">{userProfile.height ? `${userProfile.height} cm` : 'N/A'}</span>
              </div>
              <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Body Weight</span>
                <span className="font-semibold text-gray-800">{userProfile.weight ? `${userProfile.weight} kg` : 'N/A'}</span>
              </div>
            </div>

            {/* Modal Trigger Trigger Button */}
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onOpenEditModal();
              }}
              className="w-full text-left px-4 py-2.5 bg-gray-50 hover:bg-emerald-50 text-emerald-600 font-semibold text-xs transition border-t border-gray-100 flex items-center space-x-2"
            >
              <span>⚙️</span>
              <span>Edit Health Settings</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
