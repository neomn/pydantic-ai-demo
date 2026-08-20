import React, { useState, useEffect, useRef } from 'react';

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const DataGenerator = () => {
  const [activeTab, setActiveTab] = useState('logs');
  const [data, setData] = useState({ logs: [], metrics: [], traces: [] });
  const [configs, setConfigs] = useState({ 
    logs: { enabled: false, rate: 1 }, 
    metrics: { enabled: false, rate: 1 }, 
    traces: { enabled: false, rate: 1 } 
  });
  
  const intervals = useRef({});

  useEffect(() => {
    tabs.forEach(tab => {
      if (configs[tab].enabled) {
        intervals.current[tab] = setInterval(() => {
          const newItem = tab === 'logs' 
            ? `Log: Event ${Math.floor(Math.random() * 1000)} at ${new Date().toLocaleTimeString()}`
            : tab === 'metrics'
            ? `Metric: CPU ${Math.floor(Math.random() * 100)}% at ${new Date().toLocaleTimeString()}`
            : `Trace: ID ${Math.random().toString(36).substr(2, 9)} duration ${Math.floor(Math.random() * 500)}ms at ${new Date().toLocaleTimeString()}`;
          
          setData(prev => ({ ...prev, [tab]: [newItem, ...prev[tab]].slice(0, 50) }));
        }, 1000 / configs[tab].rate);
      } else {
        clearInterval(intervals.current[tab]);
      }
    });
    return () => Object.values(intervals.current).forEach(clearInterval);
  }, [configs]);

  const toggleRunning = (tab) => {
    setConfigs(prev => ({ ...prev, [tab]: { ...prev[tab], enabled: !prev[tab].enabled } }));
  };

  const updateRate = (tab, rate) => {
    setConfigs(prev => ({ ...prev, [tab]: { ...prev[tab], rate } }));
  };

  const startAll = () => {
    setConfigs(prev => {
      const next = { ...prev };
      tabs.forEach(tab => next[tab].enabled = true);
      return next;
    });
  };

  const tabs = ['logs', 'metrics', 'traces'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Generator</h2>
        <button 
          onClick={startAll}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Start All
        </button>
      </div>
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize pb-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl capitalize mb-4">{activeTab} Generation Settings</h3>
        <div className="space-y-4">
          <button
            onClick={() => toggleRunning(activeTab)}
            className={`px-4 py-2 rounded ${configs[activeTab].enabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {configs[activeTab].enabled ? 'Stop' : 'Start'}
          </button>
          <div>
            <label className="block text-sm mb-2">Rate: {configs[activeTab].rate} req/s</label>
            <input
              type="range"
              min="1"
              max="20"
              value={configs[activeTab].rate}
              onChange={(e) => updateRate(activeTab, Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-4 bg-gray-900 p-4 h-64 overflow-y-auto font-mono text-sm border border-gray-700">
          <h4 className="font-bold mb-2 text-blue-400">Live {activeTab} stream:</h4>
          {data[activeTab].map((item, i) => <div key={i}>{item}</div>)}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'data-generator': return <DataGenerator />;
      default: return <div className="p-10"><h1 className="text-3xl font-bold capitalize">{currentPage.replace('-', ' ')}</h1></div>;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'} flex`}>
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">UI</h1>
          <ul>
            <li className="mb-4 hover:text-gray-400 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>Dashboard</li>
            <li className="mb-4 hover:text-gray-400 cursor-pointer" onClick={() => setCurrentPage('service-map')}>Service Map</li>
            <li className="mb-4 hover:text-gray-400 cursor-pointer">
              <span onClick={() => setCurrentPage('data-generator')}>Management</span>
              <ul className="ml-4 mt-2">
                <li className="text-sm hover:text-gray-400 cursor-pointer" onClick={() => setCurrentPage('data-generator')}>- Data Generator</li>
              </ul>
            </li>
            <li className="mb-4 hover:text-gray-400 cursor-pointer" onClick={() => setCurrentPage('anomaly-explorer')}>Anomaly Explorer</li>
          </ul>
        </div>
        <div className="cursor-pointer hover:text-gray-400" onClick={() => setCurrentPage('settings')}>Settings</div>
      </div>

      <div className="flex-1">
        <header className="p-5 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize">{currentPage.replace('-', ' ')}</h2>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
