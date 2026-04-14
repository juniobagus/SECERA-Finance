# Product Requirements Document (PRD): SECERA Finance App - Versi 2.0

## 1. Executive Summary

**Problem Statement:**
SECERA Finance App Versi 1.0 telah berhasil menyederhanakan pencatatan kas (Single-Entry) harian. Namun, seiring dengan pertumbuhan perusahaan di Kediri, metode ini tidak lagi memadai untuk keperluan audit, rekonsiliasi e-commerce tingkat lanjut, dan standardisasi perpajakan (UMKM). Kesalahan *human-error* tidak terlacak karena tidak adanya alur penyeimbang *Debit-Kredit*.

**Proposed Solution:**
Merombak arsitektur inti aplikasi dari *Single-Entry* menjadi **Double-Entry Accounting System** secara komprehensif. Aplikasi versi 2.0 ini akan mendigitalkan "Alur Pembukuan Laporan Keuangan UMKM", mulai dari penjurnalan berbuku besar hingga penyusunan Neraca Saldo dan Jurnal Penyesuaian. Sistem ini harus terintegrasi langsung dengan pelaporan pajak berjalan di Indonesia (PPN & PPh Final 0,5%) dan menggunakan infrastruktur database relasional (*PostgreSQL*).

**Success Criteria:**
- **Validitas:** 100% dari transaksi yang disimpan ter-validasi secara *Double-Entry* (Nilai Total Debit = Nilai Total Kredit).
- **Tax Compliance:** Mengotomatiskan pelacakan selisih PPN Masukan & Keluaran serta perhitungan basis PPh UMKM akurat dalam hitungan detik untuk WP OP.
- **Data Safety:** Menghilangkan hilangnya rekaman transaksi akibat pembersihan cache lokal (*Browser Storage* dipindah ke Server Database yang persisten).

---

## 2. User Experience & Functionality

### User Personas
- **Accounting & Tax Manager:** Memerlukan antarmuka *Jurnal Umum* (General Journal) terpusat untuk menentukan akun Debit dan Kredit dari sebuah transaksi serta mengamati *Neraca Saldo*.

### Modul Fungsional Alur Pembukuan (Tahap UMKM)
1. **Bukti Transaksi (File Attachment):** Kemampuan untuk mengunggah dan melampirkan PNG/PDF (Nota, Invoice) langsung pada entri jurnal.
2. **Pencatatan Jurnal (Journaling):** Form input mutasi yang secara otomatis/manual memecah transaksi ke dua sisi (minimal 1 Debit, 1 Kredit) bersumber pada *Chart of Accounts* (COA).
3. **Buku Besar (General Ledger):** Tampilan rincian historis perbandingan uang masuk/keluar pada 1 kode Akun COA yang spesifik (contoh: Akun Kas, Akun Piutang e-Commerce).
4. **Neraca Saldo (Trial Balance):** Tabel real-time yang memanifestasikan semua total debit/kredit setiap akun, untuk menjamin angkanya selalu *Balance* (Seimbang).
5. **Jurnal Penyesuaian (Adjustments):** Form khusus *Correction Entries* pada akhir masa buku untuk depresiasi aset atau koreksi pajak.

### User Stories
- **Story (Accounting):** Sebagai Akuntan, saya ingin menjurnal pemasukan agar aliran uang terkait penjualan Shopee langsung mendebit "Kas" dan mengkredit "Pendapatan Penjualan", sehingga Buku Besar terekam rapi.
- **Story (Tax Admin):** Sebagai Admin Pajak, saya ingin melihat halaman *Tax Summary* yang secara mandiri merangkum total beban PPh Final 0,5% bulan ini, agar saya bisa langsung bayar pajaknya tanpa menghitung ulang dengan kalkulator. 

### Acceptance Criteria
- Transaksi gagal disimpan apabila `SUM(Debit) != SUM(Kredit)`.
- Rekapan Total Saldo semua halaman (Dashboard & Reports) di-*fetch* langsung dari agregasi jurnal di Database.

### Non-Goals (untuk Versi 2.0)
- Sistem e-Faktur terintegrasi langsung ke API DJP Pajak. (Fitur saat ini dibatasi hanya pada **Pencatatan Selisih PPN**; Integrasi API ditaruh ke Roadmap V3.0).

---

## 3. Local Taxation & Compliance Requirements (Regulasi Indonesia)

Sistem V2 dibangun agar bersesuaian dengan kebijakan pajak UMKM di Indonesia:
1. **Pajak Penghasilan (PPh) Final UMKM 0,5%:** 
   - SECERA sebagai Wajib Pajak Orang Pribadi (WP OP) memiliki **Bebas Pajak (PTKP) Rp 500juta** pertama pada omzet tahunan. Jika omzet melampaui, sistem harus melacak PPh 0,5%.
   - *Future Proofing:* Arsitektur harus memudahkan "Switch" parameter perpajakan ke WP Badan jika sewaktu-waktu perseroan di-upgrade ke PT/CV (yang dimana tidak ada pembebasan 500jt pertama).
2. **Pajak Pertambahan Nilai (PPN):**
   - Transaksi jual beli difasilitasi kolom persentase pajak PPN (11% pada 2024, fleksibel untuk update 12% di 2025). Jurnal akan mencatat pemisahan antara `Piuang Dagang` dan `PPN Keluaran`.

---

## 4. Technical Specifications

### Architecture Overview
- **Database Engine:** PostgreSQL
- **ORM / Query Builder:** Prisma (menyediakan TypeScript Type-Safe).
- **Frontend / Backend:** Next.js 15 (React Server Components, Server Actions untuk *Form Submission*).

### Data Model Target (Skema Prisma)
- `Account` (COA: Nomor Akun, Nama Akun, Tipe Akun)
- `JournalEntry` (Header Jurnal: Deskripsi, Tanggal, Ref. Bukti Transaksi)
- `JournalLine` (Rincian Jurnal: AccountID, Nominal, `type`: DEBIT / CREDIT)
- `TaxRules` (Tabel dinamis konfigurasi persentase PPN dan threshold PTKP PPh)

---

## 5. Risks & Roadmap

### Tahapan Pengerjaan (Phased Rollout)
- **Fase A (Database Setup & Jurnal Dasar):** Inisiasi Prisma PostgreSQL, Impor skema data COA, Pembuatan komponen form Input Jurnal Double-Entry.
- **Fase B (Buku Besar & Neraca Saldo):** Pembuatan antarmuka agregasi General Ledger & Trial balance.
- **Fase C (Modul Pajak V2):** Kalkulator Otomatis PPh Final dan Tracking Selisih PPN.

### Technical Risks
- **Data Integrity:** Perhitungan angka *floating-point* desimal pada laporan keuangan sangat riskan. Database PostgreSQL akan menggunakan skema tipe data `DECIMAL` (bukan Float) khusus pada kolom finansial untuk keakuratan Rp0,00 yang absolut.
