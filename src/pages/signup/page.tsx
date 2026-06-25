import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { motion } from "motion/react";

const steps = ["Account", "Personal", "Verify"];

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    country: "United Kingdom",
    phone: "",
  });

  const update = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const validateStep0 = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters";
    return errs;
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.lastName) errs.lastName = "Last name is required";
    if (!form.dob) errs.dob = "Date of birth is required";
    if (!form.phone) errs.phone = "Phone number is required";
    return errs;
  };

  const next = () => {
    let errs: Record<string, string> = {};
    if (step === 0) errs = validateStep0();
    if (step === 1) errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep((s) => s + 1);
  };

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/dashboard");
  };

  const passwordStrength = () => {
    const p = form.password;
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-[#9FE870]"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
  const strength = passwordStrength();

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
            Join 16 million<br />
            <span style={{ color: "#9FE870" }}>happy customers.</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Open your free account today. No monthly fees, no hidden charges.
          </p>
          <ul className="space-y-3">
            {["Free to open", "Real exchange rates", "Low transparent fees", "Send to 80+ countries"].map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#9FE870] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" style={{ color: "#163300" }} />
                </div>
                <span className="text-white/80 text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {["#9FE870", "#4ade80", "#22c55e"].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#163300]" style={{ backgroundColor: c }} />
            ))}
          </div>
          <p className="text-white/50 text-sm">16M+ customers trust us</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden block text-2xl font-black mb-8" style={{ color: "#163300" }}>
            wise
          </Link>

          <button
            onClick={() => (step > 0 ? setStep((s) => s - 1) : navigate("/"))}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> {step > 0 ? "Back" : "Home"}
          </button>

          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-[#9FE870] text-[#163300]"
                      : i === step
                      ? "border-2 border-[#163300] text-[#163300]"
                      : "border-2 border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-semibold ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <>
                <h1 className="text-2xl font-black mb-1" style={{ color: "#163300" }}>Create your account</h1>
                <p className="text-muted-foreground text-sm mb-8">
                  Already have one?{" "}
                  <Link to="/login" className="font-semibold underline" style={{ color: "#163300" }}>
                    Log in
                  </Link>
                </p>

                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Email address</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`h-12 rounded-xl ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        className={`h-12 rounded-xl pr-12 ${errors.password ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {form.password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                i < strength ? strengthColors[strength] : "bg-border"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{strengthLabels[strength]}</p>
                      </div>
                    )}
                    {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                  </div>

                  <Button
                    className="w-full h-12 rounded-full font-bold text-base"
                    style={{ backgroundColor: "#9FE870", color: "#163300" }}
                    onClick={next}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-2xl font-black mb-1" style={{ color: "#163300" }}>Tell us about yourself</h1>
                <p className="text-muted-foreground text-sm mb-8">We need this for regulatory purposes.</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm font-semibold mb-1.5 block">First name</Label>
                      <Input
                        placeholder="John"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={`h-12 rounded-xl ${errors.firstName ? "border-destructive" : ""}`}
                      />
                      {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-1.5 block">Last name</Label>
                      <Input
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={`h-12 rounded-xl ${errors.lastName ? "border-destructive" : ""}`}
                      />
                      {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Date of birth</Label>
                    <Input
                      type="date"
                      value={form.dob}
                      onChange={(e) => update("dob", e.target.value)}
                      className={`h-12 rounded-xl ${errors.dob ? "border-destructive" : ""}`}
                    />
                    {errors.dob && <p className="text-destructive text-xs mt-1">{errors.dob}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Country of residence</Label>
                    <select
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-ring"
                    >
                      {["United Kingdom", "United States", "Germany", "France", "Australia", "Canada", "India", "Singapore"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Phone number</Label>
                    <Input
                      type="tel"
                      placeholder="+44 7700 900000"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={`h-12 rounded-xl ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <Button
                    className="w-full h-12 rounded-full font-bold text-base"
                    style={{ backgroundColor: "#9FE870", color: "#163300" }}
                    onClick={next}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-2xl font-black mb-1" style={{ color: "#163300" }}>Verify your identity</h1>
                <p className="text-muted-foreground text-sm mb-8">
                  We sent a 6-digit code to <strong>{form.email}</strong>
                </p>

                <div className="space-y-5">
                  <div className="flex justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 rounded-xl border border-border text-center text-xl font-bold outline-none focus:ring-2 focus:border-[#9FE870]"
                        style={{ color: "#163300" }}
                        onInput={(e) => {
                          const target = e.currentTarget;
                          if (target.value && target.nextElementSibling instanceof HTMLInputElement) {
                            target.nextElementSibling.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Didn't receive it?{" "}
                    <button className="font-semibold underline cursor-pointer" style={{ color: "#163300" }}>
                      Resend code
                    </button>
                  </p>

                  <Button
                    className="w-full h-12 rounded-full font-bold text-base"
                    style={{ backgroundColor: "#9FE870", color: "#163300" }}
                    disabled={loading}
                    onClick={finish}
                  >
                    {loading ? "Creating account..." : "Verify and create account"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
