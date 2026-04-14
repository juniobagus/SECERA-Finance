"use client";

import { useState, useEffect } from "react";
import { Plus, ArrowUpRight, Search, Download, Edit, Trash2 } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  notes: string;
};

const emptyForm: Transaction = { id: "", date: "", type: "income", amount: 0, category: "Penjualan Retail", notes: "" };

export default function IncomePage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [incomeList, setIncomeList] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Transaction>(emptyForm);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("secera_transactions");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAllTransactions(parsed);
      setIncomeList(parsed.filter((t: Transaction) => t.type === "income"));
    }
  }, []);

  const saveTransactions = (newData: Transaction[]) => {
    setAllTransactions(newData);
    setIncomeList(newData.filter((t) => t.type === "income"));
    localStorage.setItem("secera_transactions", JSON.stringify(newData));
  };

  const handleOpenModal = (trx?: Transaction) => {
    if (trx) {
      setFormData(trx);
    } else {
      setFormData({ ...emptyForm, date: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.date) return;

    if (formData.id) {
      saveTransactions(allTransactions.map((trx) => (trx.id === formData.id ? formData : trx)));
    } else {
      saveTransactions([{ ...formData, id: Date.now().toString() }, ...allTransactions]);
    }
    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  const confirmDelete = (id: string) => {
    setDeleteModalId(id);
  };

  const executeDelete = () => {
    if (deleteModalId) {
      saveTransactions(allTransactions.filter((trx) => trx.id !== deleteModalId));
      setDeleteModalId(null);
    }
  };

  const totalIncome = incomeList.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Pemasukan</h3>
            <p className="text-gray-500 text-sm mb-6">Apakah Anda yakin ingin menghapus data pemasukan ini? Data yang terhapus tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModalId(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
              <button onClick={executeDelete} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pemasukan (Income)</h1>
          <p className="text-gray-500 mt-1">Kelola aliran data kas masuk bulanan dari penjualan SECERA.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Tambah Pemasukan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-green-50/50 border border-green-100 p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-green-800 font-medium mb-1">Total Pemasukan (Tercatat)</p>
          <h3 className="text-3xl font-bold text-green-700 tracking-tight">Rp {totalIncome.toLocaleString("id-ID")}</h3>
        </div>
        <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-1">Jumlah Data Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-900">{incomeList.length} Transaksi</h3>
        </div>
      </div>

      {isModalOpen && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{formData.id ? "Edit Pemasukan" : "Form Pemasukan Baru"}</h2>
            <button onClick={() => setIsModalOpen(false)} className="text-sm text-gray-400 hover:text-gray-600 font-medium">Tutup</button>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Nominal Pemasukan (Rp)</label>
              <input type="number" value={formData.amount || ""} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} placeholder="Contoh: 1500000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Tanggal</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none">
                <option>Penjualan Retail</option>
                <option>Penjualan Grosir</option>
                <option>Pendapatan Lain-lain</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Catatan/Deskripsi</label>
              <input type="text" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Catatan tambahan..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" />
            </div>
            <div className="md:col-span-4 flex justify-end mt-4 gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">Batal</button>
              <button type="submit" className="bg-gray-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 shadow-sm">Simpan Pemasukan</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Riwayat Pemasukan</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Cari referensi..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 outline-none" />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Download className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-gray-500">
             <thead className="bg-gray-50/50 text-xs uppercase text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Catatan</th>
                <th className="px-6 py-4 text-right">Nominal</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {incomeList.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Belum ada data pemasukan. Silakan tambah data baru.</td></tr>
              ) : incomeList.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{trx.date}</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">{trx.category}</span></td>
                  <td className="px-6 py-4">{trx.notes}</td>
                  <td className="px-6 py-4 text-right font-semibold text-green-600">
                    <div className="flex items-center justify-end gap-1.5"><ArrowUpRight className="w-3.5 h-3.5" /> Rp {trx.amount.toLocaleString("id-ID")}</div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex justify-center gap-1">
                       <button onClick={() => handleOpenModal(trx)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded" title="Edit"><Edit className="w-4 h-4" /></button>
                       <button onClick={() => confirmDelete(trx.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
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
