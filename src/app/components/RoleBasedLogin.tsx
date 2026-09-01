import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, LogIn, User, Building2, Shield, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner@2.0.3";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface RoleBasedLoginProps {
  onLoginSuccess: (userType: "individual" | "entity", roles: string[], organizationName?: string) => void;
  onBack: () => void;
}

// Mock database of users
const mockUsers = [
  // Individual Producer
  {
    email: "farmer@example.com",
    password: "demo123",
    type: "individual" as const,
    name: "Rajesh Kumar",
    role: "Producer"
  },
  // Entity Admin
  {
    email: "admin@agritraders.com",
    password: "demo123",
    type: "entity" as const,
    name: "Priya Sharma",
    organization: "Agri Traders Pvt Ltd",
    roles: ["Admin", "Manager", "Trading"]
  },
  // Entity Staff (Manager)
  {
    email: "manager@agritraders.com",
    password: "demo123",
    type: "entity" as const,
    name: "Amit Patel",
    organization: "Agri Traders Pvt Ltd",
    roles: ["Manager", "Operations"]
  },
  // Entity Staff (Operator)
  {
    email: "operator@agritraders.com",
    password: "demo123",
    type: "entity" as const,
    name: "Sunita Devi",
    organization: "Agri Traders Pvt Ltd",
    roles: ["Operator", "Viewer"]
  }
];

export function RoleBasedLogin({ onLoginSuccess, onBack }: RoleBasedLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        if (user.type === "individual") {
          toast.success(`Welcome back, ${user.name}!`);
          onLoginSuccess("individual", [user.role]);
        } else {
          toast.success(`Welcome back, ${user.name}!`);
          onLoginSuccess("entity", user.roles, user.organization);
        }
      } else {
        toast.error("Invalid email or password");
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleDemoLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword("demo123");
    toast.info("Demo credentials filled! Click Login to continue.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <img src={tradieLogo} alt="TRADIE" className="w-20 h-20" />
            </motion.div>
            <h1 className="text-[#003E6D] mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}>
              Welcome Back to TRADIE
            </h1>
            <p className="text-[#003E6D]/70 text-lg">
              Sign in to access your role-based dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Login Form - Left Side */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10 shadow-xl">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[#003E6D] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.5rem" }}>
                      Login to Your Account
                    </h2>
                    <p className="text-[#003E6D]/60 text-sm">
                      Enter your credentials to access your dashboard
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[#003E6D]">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
                      onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[#003E6D]">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700] pr-12"
                        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003E6D]/60 hover:text-[#003E6D]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 rounded border-2 border-[#003E6D]/20"
                      />
                      <label htmlFor="remember" className="text-sm text-[#003E6D]/70">
                        Remember me
                      </label>
                    </div>
                    <button className="text-sm text-[#003E6D] hover:text-[#FFD700] underline">
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-xl"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 mr-2" />
                        Login
                      </>
                    )}
                  </Button>

                  {/* Register Link */}
                  <div className="text-center pt-4 border-t border-[#003E6D]/10">
                    <p className="text-sm text-[#003E6D]/70">
                      Don't have an account?{" "}
                      <button
                        onClick={onBack}
                        className="text-[#003E6D] font-semibold hover:text-[#FFD700] underline"
                      >
                        Register Now
                      </button>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Demo Accounts - Right Side */}
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <h3 className="text-[#003E6D] font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <Shield className="w-5 h-5 text-blue-600" />
                  Demo Accounts
                </h3>
                <p className="text-xs text-[#003E6D]/70 mb-4">
                  Click any account to auto-fill credentials
                </p>

                <div className="space-y-2">
                  {/* Individual Producer */}
                  <button
                    onClick={() => handleDemoLogin("farmer@example.com")}
                    className="w-full p-3 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-[#003E6D]">
                        Individual Producer
                      </span>
                    </div>
                    <p className="text-xs text-[#003E6D]/60 mb-2">farmer@example.com</p>
                    <Badge variant="outline" className="text-xs bg-green-50 border-green-300">
                      Producer Dashboard
                    </Badge>
                  </button>

                  {/* Entity Admin */}
                  <button
                    onClick={() => handleDemoLogin("admin@agritraders.com")}
                    className="w-full p-3 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-[#003E6D]">
                        Entity Admin
                      </span>
                    </div>
                    <p className="text-xs text-[#003E6D]/60 mb-2">admin@agritraders.com</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300">
                        Admin
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300">
                        Manager
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300">
                        Trading
                      </Badge>
                    </div>
                  </button>

                  {/* Entity Manager */}
                  <button
                    onClick={() => handleDemoLogin("manager@agritraders.com")}
                    className="w-full p-3 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-[#003E6D]">
                        Entity Manager
                      </span>
                    </div>
                    <p className="text-xs text-[#003E6D]/60 mb-2">manager@agritraders.com</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300">
                        Manager
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300">
                        Operations
                      </Badge>
                    </div>
                  </button>

                  {/* Entity Operator */}
                  <button
                    onClick={() => handleDemoLogin("operator@agritraders.com")}
                    className="w-full p-3 bg-white rounded-lg border-2 border-amber-200 hover:border-amber-400 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-[#003E6D]">
                        Entity Operator
                      </span>
                    </div>
                    <p className="text-xs text-[#003E6D]/60 mb-2">operator@agritraders.com</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-amber-50 border-amber-300">
                        Operator
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-amber-50 border-amber-300">
                        Viewer
                      </Badge>
                    </div>
                  </button>
                </div>

                <Alert className="mt-4 bg-white border-2 border-blue-300">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    All demo accounts use password: <code className="bg-blue-100 px-1 rounded">demo123</code>
                  </AlertDescription>
                </Alert>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#003E6D] hover:text-[#FFD700]"
            >
              ← Back to Welcome
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
