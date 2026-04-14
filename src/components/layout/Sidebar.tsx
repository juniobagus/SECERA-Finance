"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, ArrowRightLeft, Package, UserSquare2, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Income & Expense", href: "/transactions", icon: ArrowRightLeft },
  { name: "Sales (Shopee/TikTok)", href: "/sales", icon: Wallet },
  { name: "Produk & Aset", href: "/inventory", icon: Package },
  { name: "Laporan Keuangan", href: "/reports", icon: UserSquare2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 overflow-hidden shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="font-bold text-xl tracking-tight text-gray-900">SECERA.</div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
        >
          <Settings className="w-4 h-4" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}
