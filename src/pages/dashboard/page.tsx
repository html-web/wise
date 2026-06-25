import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  ArrowDownLeft,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  Plus,
  ChevronRight,
  Globe,
  RefreshCcw,
  LayoutDashboard,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", sent: 1200, received: 400 },
  { month: "Feb", sent: 1900, received: 800 },
  { month: "Mar", sent: 800, received: 1200 },
  { month: "Apr", sent: 2400, received: 600 },
  { month: "May", sent: 1600, received: 1500 },
  { month: "Jun", sent: 2800, received: 900 },
  { month: "Jul", sent: 3200, received: 2100 },
];

const transactions = [
  { id: 1, name: "Google LLC", type: "received", amount: "+$2,500.00", currency: "USD", date: "Today, 2:30 PM", flag: "\uD83C\uDDFA\uD83C\uDDF8", status: "completed" },
  { id: 2, name: "Transfer to EUR", type: "sent", amount: "-\u00a3800.00", currency: "GBP", date: "Today, 11:15 AM", flag: "\uD83C\uDDEC\uD83C\uDDE7", status: "completed" },
  { id: 3, name: "Freelance Payment", type: "received", amount: "+\u20ac1,200.00", currency: "EUR", date: "Yesterday", flag: "\uD83C\uDDEA\uD83C\uDDFA", status: "completed" },
  { id: 4, name: "Rent Transfer", type: "sent", amount: "-\u00a31,450.00", currency: "GBP", date: "Jul 18", flag: "\uD83C\uDDEC\uD83C\uDDE7", status: "completed" },
  { id: 5, name: "Invoice #4892", type: "received", amount: "+$750.00", currency: "USD", date: "Jul 17", flag: "\uD83C\uDDFA\uD83C\uDDF8", status: "pending" },
  { id: 6, name: "Amazon Services", type: "sent", amount: "-$120.00", currency: "USD", date: "Jul 15", flag: "\uD83C\uDDFA\uD83C\uDDF8", status: "completed" },
];

const balances = [
  { currency: "GBP", symbol: "\u00a3", amount: "12,450.84", flag: "\uD83C\uDDEC\uD83C\uDDE7", trend: "+2.4%" },
  { currency: "USD", symbol: "$", amount: "8,320.50", flag: "\uD83C\uDDFA\uD83C\uDDF8", trend: "+0.8%" },
  { currency: "EUR", symbol: "\u20ac", amount: "3,910.20", flag: "\uD83C\uDDEA\uD83C\uDDFA", trend: "-0.3%" },
];

const quickActions = [
  { icon: <Send className="w-5 h-5" />, label: "Send", color: "#9FE870" },
  { icon: <ArrowDownLeft className="w-5 h-5" />, label: "Receive", color: "#9FE870" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Card", color: "#9FE870" },
  { icon: <RefreshCcw className="w-5 h-5" />, label: "Convert", color: "#9FE870" },
];

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: "Home", active: true },
  { icon: <Send className="w-5 h-5" />, label: "Send" },
  { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics" },
  { icon: <Globe className="w-5 h-5" />, label: "Currencies" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Cards" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeBalance, setActiveBalance] = useState(0);

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex flex-col bg-white border-r border-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <span className="text-2xl font-black" style={{ color: "#163300" }}>wise</span>
          <button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                item.active
                  ? "text-[#163300]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={item.active ? { backgroundColor: "#9FE870" } : {}}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer mb-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: "#9FE870", color: "#163300" }}
            >
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: "#163300" }}>James Doe</p>
              <p className="text-xs text-muted-foreground truncate">james@example.com</p>
            </div>
          </div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors cursor-pointer"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-muted-foreground">Good morning,</p>
              <p className="text-base font-bold" style={{ color: "#163300" }}>James Doe \uD83D\uDC4B</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9FE870]" />
            </button>
            <Button
              className="rounded-full font-semibold text-sm px-4 hidden sm:flex items-center gap-2"
              style={{ backgroundColor: "#9FE870", color: "#163300" }}
            >
              <Plus className="w-4 h-4" /> Add money
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black" style={{ color: "#163300" }}>Your balances</h2>
              <button className="text-sm font-semibold flex items-center gap-1 cursor-pointer" style={{ color: "#163300" }}>
                <Plus className="w-4 h-4" /> Add currency
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {balances.map((b, i) => (
                <motion.div
                  key={b.currency}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setActiveBalance(i)}
                  className={`rounded-2xl p-5 cursor-pointer transition-all ${
                    activeBalance === i
                      ? "shadow-lg scale-[1.02]"
                      : "hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: activeBalance === i ? "#163300" : "white",
                    border: "1px solid",
                    borderColor: activeBalance === i ? "#163300" : "#e5e7eb",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{b.flag}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        b.trend.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {b.trend}
                    </span>
                  </div>
                  <p
                    className="text-2xl font-black mb-1"
                    style={{ color: activeBalance === i ? "#9FE870" : "#163300" }}
                  >
                    {b.symbol}{b.amount}
                  </p>
                  <p className={`text-xs font-semibold ${activeBalance === i ? "text-white/60" : "text-muted-foreground"}`}>
                    {b.currency} Account
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <motion.button
                key={a.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#9FE870" }}
                >
                  <span style={{ color: "#163300" }}>{a.icon}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#163300" }}>{a.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-black text-base" style={{ color: "#163300" }}>Transfer activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 7 months</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#9FE870]" /> Sent
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#163300]" /> Received
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="sent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9FE870" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9FE870" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="received" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#163300" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#163300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }}
                  formatter={(value: number) => [`$${value}`, ""]}
                />
                <Area type="monotone" dataKey="sent" stroke="#9FE870" strokeWidth={2} fill="url(#sent)" />
                <Area type="monotone" dataKey="received" stroke="#163300" strokeWidth={2} fill="url(#received)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-border">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-black text-base" style={{ color: "#163300" }}>Recent transactions</h3>
              <button className="text-xs font-semibold flex items-center gap-1 cursor-pointer" style={{ color: "#163300" }}>
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: tx.type === "received" ? "#9FE870" + "30" : "#163300" + "15" }}
                  >
                    {tx.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "#163300" }}>{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-sm font-bold"
                      style={{ color: tx.type === "received" ? "#16a34a" : "#163300" }}
                    >
                      {tx.amount}
                    </p>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#163300" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" style={{ color: "#9FE870" }} />
                  <span className="text-sm font-semibold" style={{ color: "#9FE870" }}>Quick send</span>
                </div>
                <h3 className="text-xl font-black mb-1">Send money instantly</h3>
                <p className="text-white/60 text-sm">Low fees, real exchange rate. Arrives in seconds.</p>
              </div>
              <Button
                className="rounded-full font-bold px-8 py-5 flex-shrink-0 flex items-center gap-2"
                style={{ backgroundColor: "#9FE870", color: "#163300" }}
              >
                <Send className="w-4 h-4" /> Send now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
