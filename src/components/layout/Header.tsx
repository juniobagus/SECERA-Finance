"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-3 text-gray-400 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 focus-within:border-gray-300 focus-within:bg-white transition-all w-80">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="Cari transaksi atau data..." 
          className="bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 w-full"
        />
      </div>
      
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white block"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-gray-100 pl-5">
          <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium shadow-sm">
            OW
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Owner SECERA</p>
            <p className="text-xs text-gray-500 text-left">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
