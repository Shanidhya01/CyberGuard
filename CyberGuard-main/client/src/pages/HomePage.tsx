import React from "react";
import { Shield, Lock, Search, AlertTriangle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import SearchSection from "../components/home/SearchSection";
import StatsSection from "../components/home/StatsSection";
import FaqSection from "../components/home/FaqSection";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-emerald-400" />,
      title: "Data Breach Detection",
      description:
        "Check if your personal information has been compromised in known data breaches.",
    },
    {
      icon: <AlertTriangle className="w-12 h-12 text-yellow-400" />,
      title: "Breach Notifications",
      description:
        "Get instant alerts when your data appears in new security breaches.",
    },
    {
      icon: <Lock className="w-12 h-12 text-purple-400" />,
      title: "Protection Recommendations",
      description:
        "Receive personalized recommendations to secure your digital presence.",
    },
    {
      icon: <Search className="w-12 h-12 text-emerald-400" />,
      title: "Detailed Analysis",
      description:
        "View comprehensive reports about how and where your data was exposed.",
    },
  ];

  const stats = [
    { value: "14.2B", label: "Records Exposed" },
    { value: "24,000+", label: "Data Breaches" },
    { value: "99.7%", label: "Detection Accuracy" },
    { value: "87%", label: "User Protection Rate" },
  ];

  const faqs = [
    {
      question: "How does the data breach checker work?",
      answer:
        "Our system compares your input against a comprehensive database of known data breaches. When you search, we scan billions of leaked records to identify if your information has been compromised.",
    },
    {
      question: "Is my search data stored?",
      answer:
        "We prioritize your privacy. Your search inputs are encrypted and only used for comparison against breach databases. We don't store your search queries or use them for any other purpose.",
    },
    {
      question: "What should I do if my data was breached?",
      answer:
        "If we detect your data in a breach, we'll provide specific recommendations based on what was exposed. This typically includes changing passwords, enabling two-factor authentication, and monitoring accounts for suspicious activity.",
    },
    {
      question: "How often is the breach database updated?",
      answer:
        "Our breach database is updated continuously as new breaches are discovered. We maintain connections with security researchers and verified sources to ensure our data is comprehensive and current.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-emerald-900/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxYTFiMWMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
        <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeatureSection features={features} />
        <SearchSection />
        <StatsSection stats={stats} />
        <FaqSection faqs={faqs} />
        <Footer />
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(
                ${Math.random() * 100 - 50}px,
                ${Math.random() * 100 - 50}px
              )
              rotate(${Math.random() * 360}deg);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
