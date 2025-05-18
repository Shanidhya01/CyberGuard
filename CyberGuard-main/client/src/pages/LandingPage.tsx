import React, { useState } from "react";
import { Shield, ArrowRight, Code, Lock, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { updateProfile } from "firebase/auth";

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        await authService.signin(email, password);
      } else {
        // Sign up
        const userCredential = await authService.signup(email, password);

        if (name.trim() && userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: name.trim(),
          });
        }
      }

      // On successful login/signup, redirect
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Hacker/Cybersecurity Design Side - Green Theme */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-green-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Matrix-like animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 5 + 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>

        <div className="text-white max-w-md z-10">
          <div className="flex items-center mb-6">
            <Shield className="h-10 w-10 text-green-400" />
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
              Cyber<span className="font-mono">Guard</span>
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 font-mono tracking-tight">
            <span className="text-green-400">DATA</span> PROTECTION
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Advanced security solutions to safeguard your digital identity and
            assets.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <Lock className="h-5 w-5 text-green-400" />
              </div>
              <span>Military-grade encryption</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <Code className="h-5 w-5 text-green-400" />
              </div>
              <span>Real-time threat detection</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <EyeOff className="h-5 w-5 text-green-400" />
              </div>
              <span>Privacy-first approach</span>
            </div>
          </div>

          {/* Hacker-style terminal animation */}
          <div className="mt-12 bg-black/50 border border-green-400/30 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400">$ security_scan --init</div>
            <div className="text-green-300">
              {" "}
              Scanning for vulnerabilities...
            </div>
            <div className="text-green-300"> Encrypting data channels ✓</div>
            <div className="text-green-300 blink"> Protection active_</div>
          </div>
        </div>
      </div>

      {/* Login/Signup Side with greenish background */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-green-900/30">
        <div className="w-full max-w-md bg-gray-800/70 rounded-xl shadow-2xl border border-green-400/20 p-8 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="bg-green-900/50 p-3 rounded-full border border-green-400/30">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            {isLogin ? "Secure Login" : "Create Secure Account"}
          </h2>
          <p className="text-gray-300 text-center mb-8">
            {isLogin
              ? "Access your protected dashboard"
              : "Join our security network"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="Your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-green-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border border-green-400/30"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Authenticate"
                : "Register"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          <div className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? (
              <>
                New to CyberGuard?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-400 hover:underline"
                  disabled={loading}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already secured?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-400 hover:underline"
                  disabled={loading}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS for the matrix animation */}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
