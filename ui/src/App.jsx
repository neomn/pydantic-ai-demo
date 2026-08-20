import React, { useState } from 'react';

const Sidebar = () => {
  const menuItems = ['Dashboard', 'Service Map', 'Management', 'Settings'];
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">UI</h1>
      <ul>
        {menuItems.map(item => (
          <li key={item} className="mb-4 hover:text-gray-400 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  return (
    <div className="flex bg-gray-100 text-gray-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="mt-4">Select an item from the sidebar.</p>
      </div>
    </div>
  );
}
