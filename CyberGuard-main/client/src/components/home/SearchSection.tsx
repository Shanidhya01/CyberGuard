import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Mail,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/Button";

const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"email" | "keyword">("email");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [breachDetails, setBreachDetails] = useState<any>(null);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [email, setEmail] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    console.log("User searched for:", searchTerm, "Type:", searchType);

    setIsSearching(true);
    setHasSearched(false);

    try {
      // Adjust API URL and query params as needed based on searchType
      const queryParam = searchType === "email" ? `email=${searchTerm}` : `keyword=${searchTerm}`;
      const response = await fetch(`http://localhost:5000/api/search?${queryParam}`);

      if (!response.ok) {
        console.error("API response error:", response.status, response.statusText);
        setIsBreached(false);
        setBreachDetails(null);
        setIsSearching(false);
        setHasSearched(true);
        return;
      }

      const data = await response.json();

      console.log("API response data:", data);

      /*
      Expected data format from backend:
      {
        breached: boolean,
        data: {
          emails: {...},
          phone_numbers: {...},
          credit_cards: {...}
        },
        mongoHit: boolean  // OPTIONAL: backend can send this to indicate if DB query was hit
      }
      */

      // Log if query hit the DB (if backend sends this info)
      if ("mongoHit" in data) {
        console.log("MongoDB query hit status:", data.mongoHit);
      }

      setIsBreached(data.breached);
      setBreachDetails(data.data || {});
    } catch (err) {
      console.error("Fetch error:", err);
      setIsBreached(false);
      setBreachDetails(null);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Notification set up for: ${email}`);
    setShowNotificationForm(false);
  };

  const viewDetailedReport = () => {
    navigate("/report", {
      state: {
        searchTerm,
        isBreached,
        breachDetails,
        searchDate: new Date().toISOString(),
      },
    });
  };

  // Helper to render breach details from emails, phone_numbers, credit_cards
  const renderBreachSection = (title: string, dataSection: any) => {
    if (!dataSection || Object.keys(dataSection).length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="font-semibold text-white text-lg mb-3">{title}</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {Object.entries(dataSection).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="search" className="py-24 bg-gray-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 sm:px-6 mx-auto relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                Check Your Exposure
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enter your email address or keywords to scan our database of
              billions of leaked records.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg relative mb-8">
            <div className="absolute top-0 right-0 m-4">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    searchType === "email"
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setSearchType("email")}
                >
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    searchType === "keyword"
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setSearchType("keyword")}
                >
                  <Database className="w-4 h-4 inline mr-1" />
                  Keyword
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className="mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-cyan-400" />
                  </div>
                  <input
                    type={searchType === "email" ? "email" : "text"}
                    placeholder={
                      searchType === "email"
                        ? "Enter your email address"
                        : "Enter username, phone, or keyword"
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border border-green-400/30 text-white rounded-md px-4 py-2"
                  isLoading={isSearching}
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Check Now
                </Button>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 inline mr-1" />
                We value your privacy. Your search data is encrypted and never
                stored.
              </p>
            </form>
          </div>

          {hasSearched && !isSearching && (
            <div
              className={`${
                isBreached
                  ? "bg-red-900/20 border-red-800"
                  : "bg-green-900/20 border-green-800"
              } border rounded-xl p-6 md:p-8 animate-fade-in transition-all duration-500`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-full ${
                    isBreached
                      ? "bg-red-900/40 text-red-400"
                      : "bg-green-900/40 text-green-400"
                  }`}
                >
                  {isBreached ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <CheckCircle className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {isBreached
                      ? "Your information has been compromised"
                      : "Good news! No breaches found"}
                  </h3>

                  {isBreached ? (
                    <div>
                      <p className="text-gray-300 mb-4">
                        We've found your information in leaked data sets.
                      </p>

                      {renderBreachSection("Emails", breachDetails.emails)}
                      {renderBreachSection("Phone Numbers", breachDetails.phone_numbers)}
                      {renderBreachSection("Credit Cards", breachDetails.credit_cards)}

                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-3">
                          Recommended Actions:
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>
                              Change passwords for affected accounts immediately
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>
                              Enable two-factor authentication where available
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>
                              Monitor your accounts for suspicious activity
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>
                              Be cautious of phishing attempts using your leaked
                              information
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-6">
                        <Button variant="primary" onClick={viewDetailedReport}>
                          View Detailed Report
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setShowNotificationForm(true)}
                        >
                          Get Breach Notifications
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-300 mb-4">
                        We couldn't find your information in our database of
                        known data breaches. Stay protected by setting up breach
                        notifications.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => setShowNotificationForm(true)}
                      >
                        Get Breach Notifications
                      </Button>
                    </div>
                  )}

                  {showNotificationForm && (
                    <form onSubmit={handleNotificationSubmit} className="mt-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          required
                        />
                        <Button type="submit" variant="primary">
                          Subscribe
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;