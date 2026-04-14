"use client";

import { useState } from "react";
import { Download, FileText, Activity, PieChart, Landmark } from "lucide-react";
import clsx from "clsx";

type ReportTab = "cashflow" | "profitloss" | "balancesheet";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>("profitloss");

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Laporan Keuangan</h1>
          <p className="text-gray-500 mt-1">Laporan finansial otomatis untuk mendukung keputusan bisnis Anda.</p>
        </div>
        
        <button 
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100/80 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("profitloss")}
          className={clsx(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === "profitloss" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <PieChart className="w-4 h-4" />
          Laba Rugi (P&L)
        </button>
        <button
          onClick={() => setActiveTab("cashflow")}
          className={clsx(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === "cashflow" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Activity className="w-4 h-4" />
          Arus Kas (Cash Flow)
        </button>
        <button
          onClick={() => setActiveTab("balancesheet")}
          className={clsx(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === "balancesheet" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Landmark className="w-4 h-4" />
          Neraca (Balance Sheet)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8 min-h-[500px]">
        {/* Laba Rugi Tab */}
        {activeTab === "profitloss" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Laporan Laba Rugi</h2>
                <p className="text-gray-500 text-sm">Periode: 1 April 2026 - 30 April 2026</p>
              </div>
              <h3 className="text-3xl font-black text-gray-900">Rp 58.750.000</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg mb-3">Pendapatan (Income)</h4>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Penjualan Shopee</span>
                  <span className="font-medium text-gray-900">Rp 24.500.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Penjualan TikTok Shop</span>
                  <span className="font-medium text-gray-900">Rp 18.200.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Penjualan Offline / Grosir</span>
                  <span className="font-medium text-gray-900">Rp 48.200.000</span>
                </div>
                <div className="flex justify-between py-3 text-sm font-bold text-gray-900 px-3 border-t border-gray-100 mt-2">
                  <span>Total Pendapatan</span>
                  <span className="text-green-600">Rp 90.900.000</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg mb-3">Beban / Pengeluaran (Expenses)</h4>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Harga Pokok Penjualan (HPP)</span>
                  <span className="font-medium text-gray-900">Rp 12.850.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Beban Operasional Gudang/Toko</span>
                  <span className="font-medium text-gray-900">Rp 15.000.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Beban Gaji & Marketing</span>
                  <span className="font-medium text-gray-900">Rp 4.300.000</span>
                </div>
                <div className="flex justify-between py-3 text-sm font-bold text-gray-900 px-3 border-t border-gray-100 mt-2">
                  <span>Total Beban</span>
                  <span className="text-red-500">Rp 32.150.000</span>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-6 rounded-xl flex justify-between items-center mt-8">
                <div>
                  <h4 className="text-lg font-bold">Laba Bersih (Net Profit)</h4>
                  <p className="text-gray-400 text-sm">Pendapatan dikurangi dengan Total Beban.</p>
                </div>
                <h3 className="text-2xl font-bold">Rp 58.750.000</h3>
              </div>
            </div>
          </div>
        )}

        {/* Arus Kas Tab */}
        {activeTab === "cashflow" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Arus Kas (Cash Flow)</h2>
                <p className="text-gray-500 text-sm">Aliran uang tunai masuk dan keluar SECERA.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-12 text-center text-gray-500 flex-col">
              <FileText className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-600">Visualisasi Metrik Cash Flow sedang dianalisis dari data terbaru.</p>
              <p className="text-sm">Anda dapat beralih ke tab Laba Rugi untuk detail sementara.</p>
            </div>
          </div>
        )}

        {/* Neraca Tab */}
        {activeTab === "balancesheet" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Neraca (Balance Sheet)</h2>
                <p className="text-gray-500 text-sm">Status aset dan kewajiban terkini per 14 April 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg mb-3">Aktiva (Aset)</h4>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Kas Terkini</span>
                  <span className="font-medium text-gray-900">Rp 124.500.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Aset Tetap (Fisik)</span>
                  <span className="font-medium text-gray-900">Rp 52.200.000</span>
                </div>
                <div className="flex justify-between py-3 text-sm text-gray-900 px-3 hover:bg-gray-50 rounded-md border-t border-gray-100 mt-2 font-bold">
                  <span>Total Aset</span>
                  <span className="text-gray-900 tracking-tight">Rp 176.700.000</span>
                </div>
              </div>

               <div>
                <h4 className="font-semibold text-gray-900 bg-gray-50 p-3 rounded-lg mb-3">Pasiva (Kewajiban & Modal)</h4>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Hutang Jangka Pendek</span>
                  <span className="font-medium text-gray-900">Rp 0</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Modal Pemilik Bersih</span>
                  <span className="font-medium text-gray-900">Rp 117.950.000</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-600 px-3 hover:bg-gray-50 rounded-md">
                  <span>Laba Ditahan Saat Ini</span>
                  <span className="font-medium text-gray-900">Rp 58.750.000</span>
                </div>
                <div className="flex justify-between py-3 text-sm text-gray-900 px-3 hover:bg-gray-50 rounded-md border-t border-gray-100 mt-2 font-bold">
                  <span>Total Pasiva</span>
                  <span className="text-gray-900 tracking-tight">Rp 176.700.000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
