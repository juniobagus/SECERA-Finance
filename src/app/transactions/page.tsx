"use client";

import { useState } from "react";
import { Plus, ArrowUpRight, ArrowDownRight, Search, Download } from "lucide-react";
import clsx from "clsx";

type Transaction = {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  notes: string;
};

const initialTransactions: Transaction[] = [
  { id: "1", date: "2026-04-12", type: "income", amount: 15400000, category: "Penjualan Grosir", notes: "Invoice #1024" },
  { id: "2", date: "2026-04-13", type: "expense", amount: 2500000, category: "Operasional", notes: "Pembayaran Listrik & Air" },
  { id: "3", date: "2026-04-14", type: "income", amount: 32800000, category: "Penjualan Retail", notes: "Shopee/TikTok payout" },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pemasukan & Pengeluaran</h1>
          <p className="text-gray-500 mt-1">Catat dan pantau seluruh transaksi kas harian SECERA.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Transaksi
        </button>
      </div>

      {isModalOpen && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Form Transaksi Baru</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-sm text-gray-400 hover:text-gray-600 font-medium">Tutup</button>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Jenis Transaksi</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all">
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nominal (Rp)</label>
              <input type="number" placeholder="Contoh: 1500000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tanggal</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all">
                <option>Penjualan Retail</option>
                <option>Operasional Gudang</option>
                <option>Gaji Karyawan</option>
                <option>Lain-lain</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-4 space-y-2">
              <label className="text-sm font-medium text-gray-700">Catatan/Deskripsi</label>
              <input type="text" placeholder="Catatan opsional..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>

            <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
              <button type="submit" className="bg-gray-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Riwayat Transaksi</h2>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4 border-b border-gray-100 tracking-wider">Tanggal</th>
                <th className="px-6 py-4 border-b border-gray-100 tracking-wider">Kategori</th>
                <th className="px-6 py-4 border-b border-gray-100 tracking-wider">Catatan</th>
                <th className="px-6 py-4 border-b border-gray-100 text-right tracking-wider">Nominal</th>
                <th className="px-6 py-4 border-b border-gray-100 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{trx.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {trx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{trx.notes}</td>
                  <td className="px-6 py-4 text-right">
                    <div className={clsx(
                      "font-semibold flex items-center justify-end gap-1.5",
                      trx.type === "income" ? "text-green-600" : "text-gray-900"
                    )}>
                      {trx.type === "income" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
                      Rp {trx.amount.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 block"></span>
                      Selesai
                    </span>
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
