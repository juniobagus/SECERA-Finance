"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("secera_transactions");
    if (stored) {
      const transactions = JSON.parse(stored);
      let income = 0;
      let expense = 0;
      
      transactions.forEach((trx: any) => {
        if (trx.type === "income") income += Number(trx.amount);
        if (trx.type === "expense") expense += Number(trx.amount);
      });
      
      setTotalIncome(income);
      setTotalExpense(expense);
      
      // Saldo murni dari hitungan Pemasukan dikurangi Pengeluaran (tanpa fiktif)
      setBalance(income - expense);
    } else {
      // Jika kosong, balance awal adalah nol
      setBalance(0);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Ringkasan Keuangan</h1>
        <p className="text-gray-500 mt-1">Pantau arus kas dan kesehatan finansial SECERA berdasarkan data transaksi Anda.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/income" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
              <Wallet className="w-5 h-5 text-gray-700" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Saldo Kas Tersedia</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">Rp {balance.toLocaleString("id-ID")}</h3>
          </div>
        </Link>

        <Link href="/income" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Total Pemasukan</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1 tracking-tight">Rp {totalIncome.toLocaleString("id-ID")}</h3>
          </div>
        </Link>

        <Link href="/expense" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Total Pengeluaran</p>
            <h3 className="text-3xl font-bold text-red-500 mt-1 tracking-tight">Rp {totalExpense.toLocaleString("id-ID")}</h3>
          </div>
        </Link>
      </div>

      {/* Empty State / Placeholder for Charts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mt-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <DollarSign className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Grafik dan Laporan Lanjutan</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Semua agregasi lanjutan kini tersedia di menu Laporan Keuangan (Reports). Anda dapat mengunjungi menu tersebut dari bilah samping.
        </p>
      </div>
    </div>
  );
}
