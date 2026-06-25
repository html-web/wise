import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeftRight, Shield, Zap, Globe, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";
import Navbar from "./_components/Navbar.tsx";
import Footer from "./_components/Footer.tsx";

const currencies = ["USD", "EUR", "GBP", "AUD", "CAD", "JPY", "INR", "SGD", "HKD", "AED"];

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Always secure",
    desc: "We're regulated in every country we operate in. Your money is protected.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast transfers",
    desc: "The majority of transfers arrive in seconds. Some take a little longer.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "80+ countries",
    desc: "Send money to over 80 countries and receive in 40+ currencies.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Freelancer, UK",
    text: "Wise has saved me hundreds of pounds in fees. The real exchange rate is a game changer.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    role: "Expat, Spain",
    text: "Transferring money back home used to be a nightmare. Now it takes minutes.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Business owner, India",
    text: "The business account is brilliant. Batch payments have saved us so much time.",
    rating: 5,
  },
];

const comparisonData = [
  { name: "Wise", fee: "\u00a32.10", rate: "1.2786", time: "Instantly", highlight: true },
  { name: "Your bank", fee: "\u00a330.00", rate: "1.2201", time: "3\u20135 days", highlight: false },
  { name: "PayPal", fee: "\u00a312.50", rate: "1.2300", time: "1\u20132 days", highlight: false },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("1000");

  const converted = (parseFloat(amount || "0") * 1.2786).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#163300" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #9FE870 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-[#9FE870] font-semibold text-sm tracking-wider uppercase mb-4">
              Money without borders
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              Send money <br />
              <span style={{ color: "#9FE870" }}>abroad for less</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Join over 16 million people and businesses who save when sending money internationally with Wise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="rounded-full font-bold px-8 py-6 text-base"
                style={{ backgroundColor: "#9FE870", color: "#163300" }}
                onClick={() => navigate("/signup")}
              >
                Get started \u2014 it's free
              </Button>
              <Button
                variant="ghost"
                className="rounded-full font-semibold px-8 py-6 text-base text-white hover:bg-white/10"
                onClick={() => navigate("/login")}
              >
                Log in <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-white/40 text-xs mt-4">No hidden fees. Real exchange rate.</p>
          </motion.div>

          {/* Currency converter card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl p-6 shadow-2xl"
          >
            <p className="text-sm font-semibold text-muted-foreground mb-4">How much are you sending?</p>
            <div className="space-y-3">
              <div className="border border-border rounded-xl p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">You send</p>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold w-full outline-none bg-transparent"
                    style={{ color: "#163300" }}
                  />
                </div>
                <div className="relative">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="appearance-none bg-muted rounded-lg px-3 py-2 pr-8 font-bold text-sm cursor-pointer outline-none"
                  >
                    {currencies.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <button
                  className="p-2 rounded-full border border-border hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => {
                    setFromCurrency(toCurrency);
                    setToCurrency(fromCurrency);
                  }}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="border border-border rounded-xl p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Recipient gets</p>
                  <p className="text-2xl font-bold" style={{ color: "#163300" }}>
                    {converted}
                  </p>
                </div>
                <div className="relative">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="appearance-none bg-muted rounded-lg px-3 py-2 pr-8 font-bold text-sm cursor-pointer outline-none"
                  >
                    {currencies.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>Fee: <strong className="text-foreground">\u00a32.10</strong></span>
                <span>Rate: <strong className="text-foreground">1.2786</strong></span>
                <span className="text-green-600 font-semibold">\u2713 Arrives instantly</span>
              </div>

              <Button
                className="w-full rounded-full py-6 font-bold text-base"
                style={{ backgroundColor: "#9FE870", color: "#163300" }}
                onClick={() => navigate("/signup")}
              >
                Compare and send
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#9FE870]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "16M+", label: "Customers" },
            { num: "\u00a39bn+", label: "Moved per month" },
            { num: "80+", label: "Countries" },
            { num: "50+", label: "Currencies" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-black" style={{ color: "#163300" }}>{s.num}</p>
              <p className="text-sm font-medium" style={{ color: "#163300" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="personal" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#163300" }}>
            Why millions choose Wise
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We give you the real exchange rate and charge a small, transparent fee \u2014 nothing more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#9FE870" }}
              >
                <span style={{ color: "#163300" }}>{f.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#163300" }}>{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#163300" }}>
              See how we compare
            </h2>
            <p className="text-muted-foreground text-lg">Sending \u00a31,000 to the United States</p>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-bold text-muted-foreground">Provider</th>
                  <th className="text-right p-4 text-sm font-bold text-muted-foreground">Fee</th>
                  <th className="text-right p-4 text-sm font-bold text-muted-foreground">Exchange rate</th>
                  <th className="text-right p-4 text-sm font-bold text-muted-foreground">Transfer time</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b border-border last:border-0 ${row.highlight ? "bg-[#9FE870]/10" : ""}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: row.highlight ? "#163300" : undefined }}>
                          {row.name}
                        </span>
                        {row.highlight && (
                          <span className="text-xs bg-[#9FE870] text-[#163300] font-bold px-2 py-0.5 rounded-full">
                            Best value
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">{row.fee}</td>
                    <td className="p-4 text-right font-semibold">{row.rate}</td>
                    <td className="p-4 text-right font-semibold">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#163300" }}>
            Trusted by millions
          </h2>
          <p className="text-muted-foreground text-lg">4.3 out of 5 based on 200,000+ reviews on Trustpilot</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border p-6"
            >
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#9FE870] text-[#9FE870]" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="font-bold text-sm" style={{ color: "#163300" }}>{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#163300" }} className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to save on your next transfer?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join 16 million people sending money with Wise. No hidden fees, no surprises.
          </p>
          <Button
            className="rounded-full font-bold px-10 py-6 text-lg"
            style={{ backgroundColor: "#9FE870", color: "#163300" }}
            onClick={() => navigate("/signup")}
          >
            Create your free account
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
