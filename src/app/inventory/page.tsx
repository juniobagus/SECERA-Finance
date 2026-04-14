"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Briefcase, Edit, Trash2 } from "lucide-react";
import clsx from "clsx";

type ActiveTab = "products" | "assets";

type Product = { id: string; name: string; sku: string; price: number; stock: number; };
type Asset = { id: string; name: string; date: string; value: number; condition: string; };

const emptyProduct: Product = { id: "", name: "", sku: "", price: 0, stock: 0 };
const emptyAsset: Asset = { id: "", name: "", date: "", value: 0, condition: "Baik" };

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pForm, setPForm] = useState<Product>(emptyProduct);
  const [aForm, setAForm] = useState<Asset>(emptyAsset);

  const [deleteModal, setDeleteModal] = useState<{ type: string, id: string } | null>(null);

  useEffect(() => {
    const storedP = localStorage.getItem("secera_products");
    const storedA = localStorage.getItem("secera_assets");
    if (storedP) setProducts(JSON.parse(storedP));
    if (storedA) setAssets(JSON.parse(storedA));
  }, []);

  const saveProducts = (data: Product[]) => {
    setProducts(data);
    localStorage.setItem("secera_products", JSON.stringify(data));
  };

  const saveAssets = (data: Asset[]) => {
    setAssets(data);
    localStorage.setItem("secera_assets", JSON.stringify(data));
  };

  const handleOpenModal = (item?: any) => {
    if (activeTab === "products") {
      setPForm(item ? item : emptyProduct);
    } else {
      setAForm(item ? item : { ...emptyAsset, date: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "products") {
      if (!pForm.name || !pForm.sku) return;
      if (pForm.id) {
        saveProducts(products.map(p => p.id === pForm.id ? pForm : p));
      } else {
        saveProducts([{ ...pForm, id: Date.now().toString() }, ...products]);
      }
    } else {
      if (!aForm.name || !aForm.date) return;
      if (aForm.id) {
        saveAssets(assets.map(a => a.id === aForm.id ? aForm : a));
      } else {
        saveAssets([{ ...aForm, id: Date.now().toString() }, ...assets]);
      }
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (type: string, id: string) => {
    setDeleteModal({ type, id });
  };

  const executeDelete = () => {
    if (!deleteModal) return;
    if (deleteModal.type === "products") {
      saveProducts(products.filter(p => p.id !== deleteModal.id));
    } else {
      saveAssets(assets.filter(a => a.id !== deleteModal.id));
    }
    setDeleteModal(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Custom Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Data</h3>
            <p className="text-gray-500 text-sm mb-6">Apakah Anda yakin ingin menghapus data ini? Aksi ini tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModal(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
              <button onClick={executeDelete} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gudang & Aset</h1>
          <p className="text-gray-500 mt-1">Kelola inventaris produk fesyen dan nilai aset fisik perusahaan.</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
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
              {activeTab === "products" 
                ? (pForm.id ? "Edit Produk" : "Produk Baru") 
                : (aForm.id ? "Edit Aset" : "Aset Baru")
              }
            </h2>
            <button onClick={() => setIsModalOpen(false)} className="text-sm text-gray-400 hover:text-gray-600 font-medium">Tutup</button>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {activeTab === "products" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Produk</label>
                  <input type="text" value={pForm.name} onChange={(e) => setPForm({...pForm, name: e.target.value})} placeholder="Contoh: Kemeja Flanel Premium" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">SKU / Kode Barang</label>
                  <input type="text" value={pForm.sku} onChange={(e) => setPForm({...pForm, sku: e.target.value})} placeholder="KMJ-FLN-01" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Harga Jual (Rp)</label>
                  <input type="number" value={pForm.price || ""} onChange={(e) => setPForm({...pForm, price: Number(e.target.value)})} placeholder="150000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stok Awal</label>
                  <input type="number" value={pForm.stock || ""} onChange={(e) => setPForm({...pForm, stock: Number(e.target.value)})} placeholder="50" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
              </>
            ) : (
              <>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Aset</label>
                  <input type="text" value={aForm.name} onChange={(e) => setAForm({...aForm, name: e.target.value})} placeholder="Mesin Jahit Singer" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nilai Perolehan (Rp)</label>
                  <input type="number" value={aForm.value || ""} onChange={(e) => setAForm({...aForm, value: Number(e.target.value)})} placeholder="5000000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kondisi</label>
                  <select value={aForm.condition} onChange={(e) => setAForm({...aForm, condition: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900">
                    <option>Baik</option>
                    <option>Perlu Perbaikan</option>
                    <option>Rusak</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tanggal Perolehan</label>
                  <input type="date" value={aForm.date} onChange={(e) => setAForm({...aForm, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-900" required />
                </div>
              </>
            )}
            
            <div className="md:col-span-2 flex justify-end mt-4 gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Batal</button>
              <button type="submit" className="bg-gray-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
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
               {products.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Katalog produk masih kosong.</td></tr>
               ) : products.map((item) => (
                 <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
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
                       <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit className="w-4 h-4" /></button>
                       <button onClick={() => confirmDelete("products", item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
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
               {assets.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Belum ada daftar aset tercetak.</td></tr>
               ) : assets.map((item) => (
                 <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
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
                       <button onClick={() => handleOpenModal(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit className="w-4 h-4" /></button>
                       <button onClick={() => confirmDelete("assets", item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
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
