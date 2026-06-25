import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: "Personal", href: "#personal" },
    { label: "Business", href: "#business" },
    { label: "About us", href: "#about" },
    { label: "Help", href: "#help" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight" style={{ color: "#163300" }}>
            wise
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            className="rounded-full font-semibold px-6"
            style={{ backgroundColor: "#9FE870", color: "#163300" }}
            onClick={() => navigate("/signup")}
          >
            Register
          </Button>
        </div>

        <button
          className="md:hidden cursor-pointer p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-b border-border px-4 pb-4"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-base font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-6">
              <Button variant="ghost" className="w-full" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button
                className="w-full rounded-full font-semibold"
                style={{ backgroundColor: "#9FE870", color: "#163300" }}
                onClick={() => navigate("/signup")}
              >
                Register
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
