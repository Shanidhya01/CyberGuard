import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  CreditCard,
  Shield,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/Button";

const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [breachDetails, setBreachDetails] = useState<any>(null);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [searchType, setSearchType] = useState<"email" | "phone" | "creditCard">("email");
  const [showSearchTypeDropdown, setShowSearchTypeDropdown] = useState(false);

  const searchTypeOptions = [
    { value: "email", label: "Email Address", icon: <Mail className="w-4 h-4" /> },
    { value: "phone", label: "Phone Number", icon: <Phone className="w-4 h-4" /> },
    { value: "creditCard", label: "Credit Card", icon: <CreditCard className="w-4 h-4" /> },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      (searchType === "email" && !email) ||
      (searchType === "phone" && !phone) ||
      (searchType === "creditCard" && !creditCard)
    ) {
      alert(`Please enter a ${searchType === "email" ? "email address" : searchType === "phone" ? "phone number" : "credit card number"}`);
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    try {
      const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (phone) params.append("phone", phone);
      if (creditCard) params.append("creditCard", creditCard);

      const response = await fetch(`http://localhost:5000/api/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      setIsBreached(data.breached);
      
      if (data.breached) {
        setBreachDetails({
          emails: data.matches.email ? data.results.flatMap((r: any) => r.emails) : [],
          phone_numbers: data.matches.phone ? data.results.flatMap((r: any) => r.phone_numbers) : [],
          credit_cards: data.matches.creditCard ? data.results.flatMap((r: any) => r.credit_cards) : [],
          sources: [...new Set(data.results.map((r: any) => r.source))],
          severities: [...new Set(data.results.map((r: any) => r.severity))],
          firstDetected: data.results[0]?.date
        });
      } else {
        setBreachDetails(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setIsBreached(false);
      setBreachDetails(null);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Notification set up for: ${notificationEmail}`);
    setShowNotificationForm(false);
  };

  const viewDetailedReport = () => {
    navigate("/report", {
      state: {
        searchTerms: { email, phone, creditCard },
        isBreached,
        breachDetails,
        searchDate: new Date().toISOString(),
      },
    });
  };

  const renderBreachData = (title: string, data: string[]) => {
    if (!data || data.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-white mb-2">{title}</h4>
        <div className="bg-gray-800/50 rounded-lg p-4 max-h-40 overflow-y-auto">
          <ul className="space-y-1">
            {data.map((item, index) => (
              <li key={index} className="text-gray-300 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderBreachMetadata = () => {
    if (!breachDetails) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-semibold text-white mb-2">Sources</h4>
          <div className="bg-gray-800/50 rounded-lg p-4">
            {breachDetails.sources.map((source: string, index: number) => (
              <span 
                key={index} 
                className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Severity Levels</h4>
          <div className="bg-gray-800/50 rounded-lg p-4">
            {breachDetails.severities.map((severity: string, index: number) => (
              <span 
                key={index}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
                  severity === 'critical' ? 'bg-red-900 text-red-100' :
                  severity === 'high' ? 'bg-orange-900 text-orange-100' :
                  severity === 'medium' ? 'bg-yellow-900 text-yellow-100' :
                  'bg-gray-700 text-gray-300'
                }`}
              >
                {severity}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getCurrentSearchIcon = () => {
    switch(searchType) {
      case "email": return <Mail className="w-5 h-5 text-cyan-400" />;
      case "phone": return <Phone className="w-5 h-5 text-cyan-400" />;
      case "creditCard": return <CreditCard className="w-5 h-5 text-cyan-400" />;
      default: return <Mail className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getCurrentPlaceholder = () => {
    switch(searchType) {
      case "email": return "Enter your email address";
      case "phone": return "Enter your phone number (with country code)";
      case "creditCard": return "Enter credit card number";
      default: return "Enter your email address";
    }
  };

  const getCurrentValue = () => {
    switch(searchType) {
      case "email": return email;
      case "phone": return phone;
      case "creditCard": return creditCard;
      default: return email;
    }
  };

  const handleInputChange = (value: string) => {
    switch(searchType) {
      case "email": setEmail(value); break;
      case "phone": setPhone(value); break;
      case "creditCard": setCreditCard(value); break;
    }
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
              Check if your information has been exposed in data breaches
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg relative mb-8">
            <form onSubmit={handleSearch} className="mt-4">
              <div className="space-y-4">
                {/* Search Type Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onClick={() => setShowSearchTypeDropdown(!showSearchTypeDropdown)}
                  >
                    <div className="flex items-center">
                      {getCurrentSearchIcon()}
                      <span className="ml-3">
                        {searchTypeOptions.find(opt => opt.value === searchType)?.label}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showSearchTypeDropdown ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {showSearchTypeDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                      {searchTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-600 ${searchType === option.value ? 'bg-gray-600' : ''}`}
                          onClick={() => {
                            setSearchType(option.value as "email" | "phone" | "creditCard");
                            setShowSearchTypeDropdown(false);
                          }}
                        >
                          <span className="mr-3">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dynamic Input Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCurrentSearchIcon()}
                  </div>
                  <input
                    type={searchType === "creditCard" ? "text" : searchType === "email" ? "email" : "tel"}
                    placeholder={getCurrentPlaceholder()}
                    value={getCurrentValue()}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border border-green-400/30 text-white rounded-md px-4 py-3"
                    isLoading={isSearching}
                    rightIcon={<ChevronRight className="w-5 h-5" />}
                  >
                    Check Now
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 inline mr-1" />
                We value your privacy. Your search data is encrypted and never stored.
              </p>
            </form>
          </div>

          {/* Rest of the component remains the same */}
          {hasSearched && !isSearching && (
            <div
              className={`${
                isBreached
                  ? "bg-red-900/20 border-red-800"
                  : "bg-green-900/20 border-green-800"
              } border rounded-xl p-6 md:p-8 animate-fade-in transition-all duration-500`}
            >
              {/* ... existing results display code ... */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;