import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  Bell,
  Settings,
  LogOut,
  FileText,
  Lock,
  AlertTriangle,
  User,
  ExternalLink,
  Mail,
  ArrowLeft
} from "lucide-react";
import { Button } from "../components/ui/Button";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const userData = {
    email: "user@example.com",
    breachCount: 3,
    monitoredEmails: ["user@example.com", "work@example.com"],
    lastScan: "2025-02-15T14:30:00",
    riskLevel: "Medium",
  };

  const recentBreaches = [
    {
      name: "SocialConnect",
      date: "2025-01-28",
      affectedRecords: "103M",
      exposedData: ["Emails", "Usernames", "Passwords (hashed)"],
      description: "Major social media platform breach",
    },
    {
      name: "CloudStore",
      date: "2024-12-10",
      affectedRecords: "45M",
      exposedData: ["Emails", "Names", "Payment Methods"],
      description: "Cloud storage provider breach",
    }
  ];

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const handleRunScan = () => alert("Running security scan...");
  const handleViewDetails = (breachName: string) => alert(`Viewing details for: ${breachName}`);
  const handleLearnHow = () => alert("Redirecting to 2FA guide...");
  const handleUpdateNow = () => alert("Redirecting to password manager...");
  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
  };
  const handleViewAllBreaches = () => alert("Showing all breaches...");

  return (
    <div className="min-h-screen flex bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-emerald-900/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxYTFiMWMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-500/20 animate-float"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Dashboard Header */}
      <header className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-emerald-900/80 items-center justify-center p-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-500">
                CyberGuard
              </span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md ml-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for breaches..."
                  className="block w-full pl-10 pr-3 py-2 border border-emerald-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* User menu */}
            <div className="ml-4 flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white" title="Notifications">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white" title="Settings">
                <Settings className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg sticky top-8 border border-emerald-900/50">
              <nav className="space-y-1 py-4">
                <button
                  className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
                    activeTab === "overview"
                      ? "bg-gray-700/50 border-l-4 border-emerald-400"
                      : "border-l-4 border-transparent hover:bg-gray-700/30"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <Shield className={`h-5 w-5 mr-3 ${activeTab === "overview" ? "text-emerald-400" : "text-gray-400"}`} />
                  <span className={activeTab === "overview" ? "text-white" : "text-gray-300"}>
                    Overview
                  </span>
                </button>
                
                {/* Other tabs (Breaches, Monitoring, Passwords, Reports) */}
                {[
                  { tab: "breaches", icon: AlertTriangle, label: "Breaches" },
                  { tab: "monitoring", icon: Bell, label: "Monitoring" },
                  { tab: "passwords", icon: Lock, label: "Passwords" },
                  { tab: "reports", icon: FileText, label: "Reports" }
                ].map(({ tab, icon: Icon, label }) => (
                  <button
                    key={tab}
                    className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
                      activeTab === tab
                        ? "bg-gray-700/50 border-l-4 border-emerald-400"
                        : "border-l-4 border-transparent hover:bg-gray-700/30"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${activeTab === tab ? "text-emerald-400" : "text-gray-400"}`} />
                    <span className={activeTab === tab ? "text-white" : "text-gray-300"}>
                      {label}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="px-4 py-6 border-t border-gray-700">
                <button
                  className="w-full flex items-center text-gray-300 hover:text-white transition-colors mb-4"
                  onClick={() => navigate("/home")}
                >
                  <ArrowLeft className="h-5 w-5 mr-3 text-gray-400" />
                  Back to Home
                </button>
                <button
                  className="w-full flex items-center text-gray-300 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" ? (
              <div className="space-y-8">
                {/* Security Status Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-emerald-900/50 shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">Security Status</h2>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          userData.riskLevel === "Low" ? "bg-emerald-500" :
                          userData.riskLevel === "Medium" ? "bg-yellow-500" : "bg-red-500"
                        }`} />
                        <p className="text-lg text-white">{userData.riskLevel} Risk</p>
                      </div>
                    </div>
                    <Button variant="primary" size="md" onClick={handleRunScan} className="mt-4 md:mt-0">
                      Run Security Scan
                    </Button>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Monitored Emails", value: userData.monitoredEmails.length, icon: Mail },
                      { label: "Breach Alerts", value: userData.breachCount, icon: AlertTriangle },
                      { label: "Last Scan", value: new Date(userData.lastScan).toLocaleDateString(), icon: Search }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-emerald-900/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">{item.label}</p>
                            <p className="text-xl font-bold text-white mt-1">{item.value}</p>
                          </div>
                          <div className="p-2 bg-gray-800/50 rounded-lg">
                            <item.icon className="h-6 w-6 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Breaches */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-emerald-900/50 shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Breaches</h2>
                    <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />} onClick={handleViewAllBreaches}>
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentBreaches.map((breach, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-emerald-900/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-white mb-1">{breach.name}</h3>
                            <p className="text-sm text-gray-400">
                              {new Date(breach.date).toLocaleDateString()} • {breach.affectedRecords} affected records
                            </p>
                          </div>
                          <div className="bg-red-900/30 text-red-400 px-2.5 py-1 text-xs rounded-full border border-red-800/50">
                            Critical
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mt-3">{breach.description}</p>
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-2">Exposed data:</p>
                          <div className="flex flex-wrap gap-2">
                            {breach.exposedData.map((data, i) => (
                              <span key={i} className="px-2.5 py-1 bg-gray-800/50 text-xs rounded-full border border-gray-600">
                                {data}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(breach.name)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Recommendations */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-emerald-900/50 shadow-lg">
                  <h2 className="text-xl font-bold text-white mb-6">Security Recommendations</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Enable Two-Factor Authentication",
                        description: "Add an extra layer of security to your accounts by enabling 2FA wherever available.",
                        icon: Lock,
                        color: "yellow",
                        action: handleLearnHow,
                        actionText: "Learn How"
                      },
                      {
                        title: "Update Your Passwords",
                        description: "We've detected that some of your passwords may be weak or compromised.",
                        icon: Shield,
                        color: "emerald",
                        action: handleUpdateNow,
                        actionText: "Update Now"
                      }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-start gap-4 p-4 rounded-lg bg-${item.color}-900/20 border border-${item.color}-800/50`}>
                        <div className={`p-2 bg-${item.color}-900/40 rounded-full`}>
                          <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{item.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                          <Button variant="ghost" size="sm" className="mt-2" onClick={item.action}>
                            {item.actionText}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 border border-emerald-900/50 shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-400">The {activeTab} section is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(20px, 20px) rotate(180deg); opacity: 0.4; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
        }
        .animate-float { animation: float 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default DashboardPage;