"use client";

import { useState } from "react";
import { RefreshCcw, ShoppingBag, Store, Filter } from "lucide-react";
import clsx from "clsx";

type SalesOrder = {
  id: string;
  orderId: string;
  platform: "Shopee" | "TikTok Shop";
  customerName: string;
  items: number;
  total: number;
  status: "Completed" | "Pending";
  date: string;
};

const initialOrders: SalesOrder[] = [
  { id: "1", orderId: "SHP-99281-A", platform: "Shopee", customerName: "Andi Wijaya", items: 2, total: 345000, status: "Completed", date: "Hari ini, 09:12" },
  { id: "2", orderId: "TTS-88123-B", platform: "TikTok Shop", customerName: "Siti Amelia", items: 1, total: 125000, status: "Completed", date: "Hari ini, 08:45" },
  { id: "3", orderId: "SHP-77291-C", platform: "Shopee", customerName: "Budi Santoso", items: 4, total: 890000, status: "Completed", date: "Kemarin, 21:30" },
  { id: "4", orderId: "TTS-55212-D", platform: "TikTok Shop", customerName: "Maya Putri", items: 1, total: 200000, status: "Completed", date: "Kemarin, 19:15" },
];

export default function SalesPage() {
  const [orders, setOrders] = useState<SalesOrder[]>(initialOrders);
  const [isSyncing, setIsSyncing] = useState(false);

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Simulate pulling new order
      const newOrder: SalesOrder = {
        id: Date.now().toString(),
        orderId: `TTS-NEW-${Math.floor(Math.random() * 1000)}`,
        platform: "TikTok Shop",
        customerName: "Pelanggan Baru",
        items: 3,
        total: 450000,
        status: "Completed",
        date: "Baru saja",
      };
      setOrders([newOrder, ...orders]);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Penjualan (Sales)</h1>
          <p className="text-gray-500 mt-1">Sinkronisasi otomatis riwayat pesanan dari E-Commerce Anda.</p>
        </div>
        
        <button 
          onClick={simulateSync}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
        >
          <RefreshCcw className={clsx("w-4 h-4", isSyncing && "animate-spin")} />
          {isSyncing ? "Menarik Data API..." : "Simulasi Auto-Sync"}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-orange-100/70 rounded-lg border border-orange-200/50">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Shopee Sales</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2 mt-4">Total Penjualan (Bulan Ini)</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Rp 24.500.000</h2>
        </div>

        <div className="bg-zinc-50/80 p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-zinc-200 rounded-lg">
              <Store className="w-5 h-5 text-zinc-800" />
            </div>
            <h3 className="font-semibold text-gray-900">TikTok Shop Sales</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2 mt-4">Total Penjualan (Bulan Ini)</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Rp 18.200.000</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Daftar Pesanan Tersinkronisasi</h2>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
               <Filter className="w-3.5 h-3.5" /> Filter
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-600 font-semibold border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4 tracking-wider">Nomor Pesanan</th>
                 <th className="px-6 py-4 tracking-wider">Platform</th>
                 <th className="px-6 py-4 tracking-wider">Pelanggan</th>
                 <th className="px-6 py-4 tracking-wider">Waktu</th>
                 <th className="px-6 py-4 text-right tracking-wider">Nilai Transaksi</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {orders.map((order) => (
                 <tr key={order.id} className="hover:bg-gray-50/50 transition-colors animate-in fade-in slide-in-from-left-2 duration-300">
                   <td className="px-6 py-4 font-medium text-gray-900">{order.orderId}</td>
                   <td className="px-6 py-4">
                     <span className={clsx(
                       "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
                       order.platform === "Shopee" ? "bg-orange-50 text-orange-700 border border-orange-100" : "bg-black text-white border border-gray-800"
                     )}>
                       {order.platform}
                     </span>
                   </td>
                   <td className="px-6 py-4 flex items-center gap-3">
                     <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                       {order.customerName.charAt(0)}
                     </div>
                     <div>
                       <span className="block text-gray-900">{order.customerName}</span>
                       <span className="block text-xs text-gray-400">{order.items} item</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">{order.date}</td>
                   <td className="px-6 py-4 text-right font-medium text-gray-900 border-b-transparent">
                     Rp {order.total.toLocaleString("id-ID")}
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
