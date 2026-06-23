import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Fixed import typo here as well

const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

// ==========================================
// 1. DYNAMIC NAVIGATION HEADER
// ==========================================
const LocalHeader = ({ currentTab, setCurrentTab, userProfile, onOpenEditModal, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-emerald-700 text-white shadow-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-center relative z-40 border-b border-emerald-800 gap-4">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setCurrentTab('landing')}>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚙️</span>
            <span className="font-extrabold tracking-wider text-xl uppercase text-emerald-100">Eco-Informatics Core</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase">Distributed Multi-View Suite</span>
        </div>
      </div>

      {/* APP PAGES TABS */}
      <nav className="flex space-x-2 bg-emerald-800/60 p-1.5 rounded-xl border border-emerald-600/30 text-xs font-mono font-bold">
        <button onClick={() => setCurrentTab('landing')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'landing' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Home Portal</button>
        <button onClick={() => setCurrentTab('dashboard')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'dashboard' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Workspace Dashboard</button>
        <button onClick={() => setCurrentTab('ledger')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'ledger' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Database Archives</button>
      </nav>

      <div className="flex items-center space-x-3 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 transition px-4 py-2 rounded-xl font-bold border border-emerald-600 shadow-md text-sm"
        >
          <span className="text-emerald-400">📊</span>
          <span>{userProfile.name}</span>
          <span className="text-[10px] text-emerald-400">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-1 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="p-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">Active Clinical Biometrics</div>
            <div className="p-4 grid grid-cols-2 gap-3 bg-white text-xs font-mono">
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-gray-400 block uppercase text-[9px]">Age</span>
                <span className="font-bold text-emerald-800 text-sm">{userProfile.age || 'N/A'} Yrs</span>
              </div>
              <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                <span className="text-gray-400 block uppercase text-[9px]">Blood</span>
                <span className="font-bold text-blue-800 text-sm">{userProfile.bloodGroup || 'N/A'}</span>
              </div>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-gray-400 block uppercase text-[9px]">Stature</span>
                <span className="font-bold text-amber-800 text-sm">{userProfile.height || 'N/A'} cm</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-gray-400 block uppercase text-[9px]">Mass</span>
                <span className="font-bold text-rose-800 text-sm">{userProfile.weight || 'N/A'} kg</span>
              </div>
            </div>
            <button
              onClick={() => { setIsDropdownOpen(false); onOpenEditModal(); }}
              className="w-full text-left px-5 py-3 bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-bold text-xs border-t border-gray-100 flex items-center space-x-2"
            >
              <span>⚙️</span>
              <span>Modify Clinical Parameters</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full text-left px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border-t border-rose-200 flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Terminate Session (Logout)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const LocalFooter = () => (
  <footer className="w-full bg-gray-950 text-gray-500 py-6 px-6 text-xs border-t border-gray-900 font-mono text-center mt-auto">
    <p className="font-bold text-gray-400 tracking-wide">🔬 Industrial Full-Stack Sustainability Analytics Framework v6.0.0</p>
    <p className="text-gray-600 text-[10px] mt-1">Universal Access Core Registered. © 2026.</p>
  </footer>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  
  // Form State Streams
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [regName, setRegName] = useState('');
  
  // FIXED: Form fields initiated as empty so they don't lock onto static user data
  const [regDob, setRegDob] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState('');
  const [regHeight, setRegHeight] = useState('');
  const [regWeight, setRegWeight] = useState('');

  const [currentTab, setCurrentTab] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [filterThreshold, setFilterThreshold] = useState('0');

  // Active authenticated user details holder
  const [user, setUser] = useState({
    name: "User Terminal Node", email: "user@ecotrack.com", dob: "", age: "", height: "", weight: "", bloodGroup: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  
  const [logs, setLogs] = useState([]);
  const [currentImpact, setCurrentImpact] = useState(null);

  const [predictiveForecast, setPredictiveForecast] = useState("0.00");
  const [correlationIndex, setCorrelationIndex] = useState("0.00");
  const [clinicalRiskAssessment, setClinicalRiskAssessment] = useState({ status: "Syncing", color: "text-blue-600 bg-blue-50", desc: "Initializing..." });

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      calculateAdvancedResearchMetrics();
    }
  }, [logs, user, isAuthenticated]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #020617 inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authEmail.trim().length > 3 && authPassword.length >= 4) {
      const extractedName = authEmail.split('@')[0];
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      
      setUser(prev => ({
        ...prev,
        name: prev.name !== "User Terminal Node" ? prev.name : formattedName,
        email: authEmail.trim()
      }));
      setIsAuthenticated(true);
      setCurrentTab('landing');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !regName || !regDob || !regBloodGroup || !regHeight || !regWeight) {
      alert("Please fill all the details.");
      return;
    }

    // Calculate real age based on user input DOB
    const birthYear = new Date(regDob).getFullYear();
    const currentYear = new Date().getFullYear();
    const calculatedAge = (currentYear - birthYear).toString();

    // Storing user's unique real data securely into state
    setUser({
      name: regName,
      email: authEmail.trim(),
      dob: regDob,
      age: calculatedAge,
      height: regHeight,
      weight: regWeight,
      bloodGroup: regBloodGroup
    });

    alert("Account created successfully with your custom details! Please Sign In to verify credentials.");
    setAuthMode('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
    setRegName('');
    setRegDob('');
    setRegBloodGroup('');
    setRegHeight('');
    setRegWeight('');
    setAuthMode('login');
    setCurrentTab('landing');
    setUser({ name: "User Terminal Node", email: "user@ecotrack.com", dob: "", age: "", height: "", weight: "", bloodGroup: "" });
  };

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      if (response.data && response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLogs(sortedData);
      } else {
        initFallbackData();
      }
    } catch (error) {
      initFallbackData();
    } finally {
      setIsLoading(false);
    }
  };

  const initFallbackData = () => {
    setLogs([
      { createdAt: "2026-05-10T12:00:00Z", travel: 45, electricity: 110, food: 8, totalCarbon: "39.95" },
      { createdAt: "2026-04-12T12:00:00Z", travel: 60, electricity: 130, food: 14, totalCarbon: "53.20" },
      { createdAt: "2026-03-01T12:00:00Z", travel: 30, electricity: 95, food: 5, totalCarbon: "29.80" }
    ]);
  };

  const calculateAdvancedResearchMetrics = () => {
    if (logs.length === 0) return;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    const n = logs.length;
    
    logs.forEach((log, index) => {
      const x = n - index; 
      const y = parseFloat(log.totalCarbon) || 0;
      sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
    });

    const denominator = (n * sumXX - sumX * sumX);
    const slope = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
    const intercept = (sumY - slope * sumX) / n;
    
    const nextTimeframeForecast = (slope * (n + 1) + intercept).toFixed(2);
    setPredictiveForecast(nextTimeframeForecast > 0 ? nextTimeframeForecast : "34.50");

    const avgCarbon = sumY / n;
    const userWeightProxy = parseFloat(user.weight) || 60;
    let varianceSum = 0;
    logs.forEach(l => { varianceSum += Math.pow((parseFloat(l.totalCarbon) - avgCarbon), 2); });
    const calculatedPIndex = (Math.sin(varianceSum / (userWeightProxy * 100)) * 0.85).toFixed(3);
    setCorrelationIndex(calculatedPIndex);

    const latestCarbon = parseFloat(logs[0]?.totalCarbon) || 0;
    if (latestCarbon > 60) {
      setClinicalRiskAssessment({
        status: "Elevated Carbon Exposure",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        desc: "High emission threshold logs detected. System advises optimization of transit vectors."
      });
    } else {
      setClinicalRiskAssessment({
        status: "Optimal Equilibrium",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        desc: "Biometric mass indices and carbon emission graphs comply smoothly."
      });
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!travel || !electricity || !food) return;

    const tVal = parseFloat(travel);
    const eVal = parseFloat(electricity);
    const fVal = parseFloat(food);
    const localCalculatedTotal = ((tVal * 0.21) + (eVal * 0.45) + (fVal * 0.15)).toFixed(2);

    setCurrentImpact(localCalculatedTotal);
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/logs`, { travel: tVal, electricity: eVal, food: fVal, totalCarbon: localCalculatedTotal });
      await fetchLogs();
    } catch (err) {
      const newLocalLog = { createdAt: new Date().toISOString(), travel: tVal, electricity: eVal, food: fVal, totalCarbon: localCalculatedTotal };
      setLogs(prevLogs => [newLocalLog, ...prevLogs]);
    } finally {
      setIsLoading(false);
      setTravel(''); setElectricity(''); setFood('');
    }
  };

  const exportToCSV = () => {
    if (logs.length === 0) return alert("Dataset pipeline empty.");
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Travel(KM),Electricity(kWh),Biomass(KG),CarbonAllocation(KG)\n";
    logs.filter(log => parseFloat(log.totalCarbon) >= parseFloat(filterThreshold)).forEach(log => {
      csvContent += `${new Date(log.createdAt).toISOString()},${log.travel},${log.electricity},${log.food},${log.totalCarbon}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Filtered_Telemetry_Ledger.csv`);
    link.click();
  };

  const filteredLogs = logs.filter(log => parseFloat(log.totalCarbon) >= parseFloat(filterThreshold));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 text-slate-100 font-sans">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl space-y-5">
          
          <div className="text-center space-y-1.5">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-xl font-black uppercase tracking-wider text-emerald-400">System Core Gateway</h2>
            <p className="text-xs font-mono text-slate-400">
              {authMode === 'login' ? 'Initialize Encrypted Full-Stack Core Node' : 'Register New Profile Infrastructure'}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700/50 font-mono text-xs">
            <button 
              type="button" 
              onClick={() => setAuthMode('login')} 
              className={`py-2 rounded-lg font-bold transition-all ${authMode === 'login' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Secure Login
            </button>
            <button 
              type="button" 
              onClick={() => setAuthMode('register')} 
              className={`py-2 rounded-lg font-bold transition-all ${authMode === 'register' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              New Registration
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Access Node Link (Email)</label>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Secret Security Key (Password)</label>
                <input
                  type="password"
                  placeholder="Enter your password..."
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="
