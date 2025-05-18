import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Shield,
  BarChart2,
  Clock,
  Activity,
  Link,
  Hash,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const ReportPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, isBreached, breachDetails, searchDate } =
    location.state || {};

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Report Data Found</h2>
          <p className="text-gray-400 mb-6">
            Please perform a search first to view detailed reports.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              leftIcon={<ChevronLeft className="w-5 h-5" />}
              className="mb-6"
            >
              Back to Results
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Detailed Security Report
              </span>
            </h1>
            <p className="text-gray-400">
              Comprehensive analysis for:{" "}
              <span className="text-white font-medium">{searchTerm}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Report generated: {new Date(searchDate).toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div
                  className={`p-4 rounded-lg ${
                    isBreached
                      ? "bg-red-900/30 border-red-800"
                      : "bg-green-900/30 border-green-800"
                  } border`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-full ${
                        isBreached
                          ? "bg-red-900/40 text-red-400"
                          : "bg-green-900/40 text-green-400"
                      }`}
                    >
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold">
                      {isBreached ? "Compromised" : "Secure"}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Risk Level</p>
                        <p
                          className={`font-semibold ${
                            breachDetails?.riskLevel === "High"
                              ? "text-red-400"
                              : breachDetails?.riskLevel === "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {breachDetails?.riskLevel || "Low"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BarChart2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Risk Score</p>
                        <p className="font-semibold">
                          {breachDetails?.riskScore || "0"}/100
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Total Breaches</p>
                        <p className="font-semibold">
                          {breachDetails?.breachCount || "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Breach Timeline
                </h3>

                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">First Seen</span>
                    </div>
                    <span className="font-medium">
                      {breachDetails?.firstSeen || "No data"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Last Seen</span>
                    </div>
                    <span className="font-medium">
                      {breachDetails?.lastSeen || "No data"}
                    </span>
                  </div>

                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden my-4">
                    <div
                      className={`h-full ${
                        breachDetails?.riskLevel === "High"
                          ? "bg-gradient-to-r from-red-500 to-yellow-500"
                          : breachDetails?.riskLevel === "Medium"
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                          : "bg-gradient-to-r from-green-500 to-teal-400"
                      }`}
                      style={{ width: `${breachDetails?.riskScore || 0}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Link className="w-5 h-5 text-cyan-400" />
                  Related Breaches
                </h3>

                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  {breachDetails?.relatedBreaches ? (
                    <ul className="space-y-2">
                      {breachDetails.relatedBreaches.map(
                        (breach: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-gray-400">{index + 1}.</span>
                            <span>{breach}</span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No related breaches found</p>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Dark Web Activity
                </h3>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400">Mentions Found</span>
                    <span className="font-medium">
                      {breachDetails?.darkWebMentions || "0"}
                    </span>
                  </div>
                  <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-2">
                        {breachDetails?.darkWebMentions || "0"}
                      </p>
                      <p className="text-sm">Dark Web Mentions</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Last 12 months
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Detailed Breach Information
            </h3>

            {breachDetails?.breaches?.map((breach: any, index: number) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <h4 className="font-semibold text-lg text-white mb-3">
                    {breach.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        Date Detected
                      </p>
                      <p className="font-medium">{breach.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        Affected Accounts
                      </p>
                      <p className="font-medium">{breach.affectedAccounts}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-400 mb-1">
                        Compromised Data
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {breach.dataTypes.map((type: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-600/50 rounded-full text-sm"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!breachDetails?.breaches && (
              <p className="text-gray-400">
                No detailed breach information available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
