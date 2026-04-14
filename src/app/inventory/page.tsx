"use client";

import { useState } from "react";
import { Plus, Package, Briefcase, Edit, Trash2 } from "lucide-react";
import clsx from "clsx";

type ActiveTab = "products" | "assets";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gudang & Aset</h1>
          <p className="text-gray-500 mt-1">Kelola inventaris produk fesyen dan nilai aset fisik perusahaan.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {activeTab === "products" ? "Tambah Produk" : "Tambah Aset"}
        </button>
      </div>

      <div className="flex bg-gray-100/80 p-1.5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("products")}
          className={clsx(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === "products" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Package className="w-4 h-4" />
          Daftar Produk Fesyen
        </button>
        <button
          onClick={() => setActiveTab("assets")}
          className={clsx(
            "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === "assets" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Briefcase className="w-4 h-4" />
          Manajemen Aset Fisik
        </button>
      </div>

      {isModalOpen && (
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Form {activeTab === "products" ? "Produk Baru" : "Aset Baru"}
            </h2>
            <button onClick={() => setIsModalOpen(false)} className="text-sm text-gray-400 hover:text-gray-600 font-medium">Tutup</button>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
            {activeTab === "products" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                  <input type="text" placeholder="Kemeja Flanel Premium" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">SKU / Kode Barang</label>
                  <input type="text" placeholder="KMJ-FLN-01" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Harga Jual (Rp)</label>
                  <input type="number" placeholder="150000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stok Awal</label>
                  <input type="number" placeholder="50" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
              </>
            ) : (
              <>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Aset</label>
                  <input type="text" placeholder="Mesin Jahit Singer" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nilai Perolehan (Rp)</label>
                  <input type="number" placeholder="5000000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kondisi</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900">
                    <option>Baik</option>
                    <option>Perlu Perbaikan</option>
                    <option>Rusak</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tanggal Perolehan</label>
                  <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
              </>
            )}
            
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-gray-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Simpan {activeTab === "products" ? "Produk" : "Aset"}
              </button>
            </div>
          </form>
         </div>
      )}

      {/* Grid of Products or Assets */}
      {activeTab === "products" ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-600 font-semibold border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Nama Produk</th>
                 <th className="px-6 py-4">SKU</th>
                 <th className="px-6 py-4">Stok</th>
                 <th className="px-6 py-4 text-right">Harga Jual (Rp)</th>
                 <th className="px-6 py-4 text-center">Aksi</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { name: "Kemeja Flanel Premium", sku: "KMJ-FLN-01", stock: 120, price: 185000 },
                 { name: "Celana Denim Slimfit", sku: "CLN-DNM-02", stock: 85, price: 240000 },
                 { name: "Kaos Polos Cotton Combed", sku: "KOS-PLS-03", stock: 300, price: 65000 },
                 { name: "Jaket Bomber Canvas", sku: "JKT-BMR-04", stock: 45, price: 320000 },
               ].map((item, i) => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                       <Package className="w-5 h-5 text-gray-500" />
                     </div>
                     {item.name}
                   </td>
                   <td className="px-6 py-4 font-mono text-xs">{item.sku}</td>
                   <td className="px-6 py-4">
                     <span className={clsx(
                       "px-2.5 py-1 rounded-full text-xs font-medium border",
                       item.stock > 50 ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"
                     )}>
                       {item.stock} pcs
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right font-medium text-gray-900">
                     {item.price.toLocaleString("id-ID")}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex justify-center gap-1">
                       <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit className="w-4 h-4" /></button>
                       <button className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-600 font-semibold border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4">Nama Aset Fisik</th>
                 <th className="px-6 py-4">Tgl. Akuisisi</th>
                 <th className="px-6 py-4">Kondisi</th>
                 <th className="px-6 py-4 text-right">Nilai Aset (Rp)</th>
                 <th className="px-6 py-4 text-center">Aksi</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { name: "Mesin Jahit Juki Obras", date: "12 Jan 2024", condition: "Baik", value: 4500000 },
                 { name: "MacBook Air M2 (Admin)", date: "05 Mar 2025", condition: "Baik", value: 16500000 },
                 { name: "Mesin Potong Kain Servo", date: "22 Nov 2023", condition: "Perlu Perawatan", value: 3200000 },
                 { name: "Motor Operasional (Honda PCX)", date: "10 Feb 2022", condition: "Baik", value: 28000000 },
               ].map((item, i) => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                       <Briefcase className="w-5 h-5 text-gray-500" />
                     </div>
                     {item.name}
                   </td>
                   <td className="px-6 py-4">{item.date}</td>
                   <td className="px-6 py-4">
                     <span className={clsx(
                       "px-2.5 py-1 rounded-full text-xs font-medium border",
                       item.condition === "Baik" ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"
                     )}>
                       {item.condition}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right font-medium text-gray-900">
                     {item.value.toLocaleString("id-ID")}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex justify-center gap-1">
                       <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit className="w-4 h-4" /></button>
                       <button className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
