import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { motion } from "motion/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ backgroundColor: "#163300" }}
      >
        <Link to="/" className="text-2xl font-black text-[#9FE870]">
          wise
        </Link>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Welcome back.<br />
            <span style={{ color: "#9FE870" }}>Your money awaits.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Log in to send money, manage your account, and track your transfers.
          </p>
        </motion.div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#9FE870]/20 flex items-center justify-center">
            <span className="text-[#9FE870] text-xs font-bold">\u2713</span>
          </div>
          <p className="text-white/50 text-sm">Regulated in 180+ countries</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden block text-2xl font-black mb-8" style={{ color: "#163300" }}>
            wise
          </Link>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-black mb-1" style={{ color: "#163300" }}>Log in to Wise</h1>
            <p className="text-muted-foreground text-sm mb-8">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold underline" style={{ color: "#163300" }}>
                Register for free
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold mb-1.5 block">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <a href="#" className="text-xs font-semibold underline" style={{ color: "#163300" }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm font-medium">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full font-bold text-base"
                style={{ backgroundColor: "#9FE870", color: "#163300" }}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                className="h-12 rounded-xl border border-border font-semibold text-sm"
                onClick={() => navigate("/dashboard")}
              >
                Google
              </Button>
              <Button
                variant="ghost"
                className="h-12 rounded-xl border border-border font-semibold text-sm"
                onClick={() => navigate("/dashboard")}
              >
                Apple
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
