import { Link } from "react-router-dom";

const columns = [
  {
    title: "Personal",
    links: ["Send money", "Receive money", "Wise card", "Travel money", "Currency converter"],
  },
  {
    title: "Business",
    links: ["Business account", "Batch payments", "API access", "Payroll", "Xero integration"],
  },
  {
    title: "Company",
    links: ["About us", "Jobs", "Press", "Blog", "Affiliates"],
  },
  {
    title: "Support",
    links: ["Help center", "Status page", "Contact us", "Security", "Complaints"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#163300] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-[#9FE870] mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-black tracking-tight text-[#9FE870]">wise</span>
          <p className="text-sm text-white/50">
            \u00a9 {new Date().getFullYear()} Wise Payments Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
