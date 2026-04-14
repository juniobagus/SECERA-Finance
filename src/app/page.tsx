import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Ringkasan Keuangan</h1>
        <p className="text-gray-500 mt-1">Pantau arus kas dan kesehatan finansial SECERA bulan ini.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-gray-50 rounded-xl">
              <Wallet className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Saldo Kas Tersedia</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">Rp 124.500.000</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Pemasukan (Bulan Ini)</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">Rp 48.200.000</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-xl">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Pengeluaran (Bulan Ini)</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">Rp 12.850.000</h3>
          </div>
        </div>
      </div>

      {/* Empty State / Placeholder for Charts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center mt-8">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <DollarSign className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Grafik Arus Kas Belum Tersedia</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Fitur ini akan segera diaktifkan pada iterasi mendatang setelah integrasi data dengan laporan keuangan (Phase 5) selesai dibuat.
        </p>
      </div>
    </div>
  );
}
