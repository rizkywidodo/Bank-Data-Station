#!/bin/bash
echo "🚇 Setting up MRT Banking Data Dashboard..."

mkdir -p src/data src/hooks src/components

# ─── index.html ───────────────────────────────────────────────────────────────
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Banking Data Dashboard · MRT Jakarta</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# ─── src/main.jsx ─────────────────────────────────────────────────────────────
cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
EOF

# ─── src/index.css ────────────────────────────────────────────────────────────
cat > src/index.css << 'EOF'
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --red:          #E8042C;
  --red-light:    #FEE9ED;
  --navy:         #0D1B2A;
  --navy-mid:     #1C2F45;
  --blue-soft:    #E8F0FE;
  --text:         #0D1B2A;
  --text-mid:     #374151;
  --text-muted:   #6B7280;
  --text-faint:   #9CA3AF;
  --bg:           #FFFFFF;
  --bg-page:      #F8F9FA;
  --bg-subtle:    #F3F4F6;
  --border:       #E5E7EB;
  --border-mid:   #D1D5DB;
  --radius-sm:    6px;
  --radius-md:    10px;
  --radius-lg:    14px;
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.08);
  --green:        #059669;
  --green-light:  #ECFDF5;
  --amber:        #D97706;
  --amber-light:  #FFFBEB;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-page);
  color: var(--text);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
}

select, button, input { font-family: inherit; font-size: 14px; }
button { cursor: pointer; }
EOF

# ─── src/App.jsx ──────────────────────────────────────────────────────────────
cat > src/App.jsx << 'EOF'
import Dashboard from './components/Dashboard'
import { SAMPLE_DATA } from './data/sampleData'

// ─── SWAP DATA SOURCE DI SINI ─────────────────────────────────────────────────
// CSV dari OneDrive: ganti SAMPLE_DATA dengan hasil Papa.parse(csv, {header:true}).data
// Graph API: fetch dari /v1.0/me/drive/items/FILE_ID/workbook/...
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return <Dashboard data={SAMPLE_DATA} />
}
EOF

# ─── src/data/sampleData.js ───────────────────────────────────────────────────
cat > src/data/sampleData.js << 'EOF'
export const SAMPLE_DATA = [
  { id:1,  tgl:"2/1/2026",  bulan:"Februari", nama:"Sugiarso Amin",      stasiun:"Cipete Raya", shift:"Siang", kategori:"Safety",   subkategori:"Perilaku Penumpang",          lokasi:"Concourse Unpaid Area", deskripsi:"Penumpang memaksa masuk dari sisi concourse barat" },
  { id:2,  tgl:"2/2/2026",  bulan:"Februari", nama:"Helly Setiawan",     stasiun:"Fatmawati",   shift:"Pagi",  kategori:"Service",  subkategori:"Kebersihan & Hama",           lokasi:"Ground",                deskripsi:"Bau tidak sedap di eskalator lantai dasar" },
  { id:3,  tgl:"2/2/2026",  bulan:"Februari", nama:"Agung Yoga Pradita", stasiun:"Haji Nawi",   shift:"Pagi",  kategori:"Service",  subkategori:"Gangguan Gate & Mesin Tiket", lokasi:"Concourse Paid Area",   deskripsi:"PG eror 101 dan 105 menyebabkan antrian panjang" },
  { id:4,  tgl:"2/2/2026",  bulan:"Februari", nama:"Sugiarso Amin",      stasiun:"Lebak Bulus", shift:"Siang", kategori:"Safety",   subkategori:"Keselamatan Penumpang",       lokasi:"Concourse Paid Area",   deskripsi:"Penumpang berusia lanjut menaiki eskalator dan terjatuh" },
  { id:5,  tgl:"2/3/2026",  bulan:"Februari", nama:"Dwi Masruri",        stasiun:"Cipete Raya", shift:"Malam", kategori:"Safety",   subkategori:"Kerusakan Fisik",             lokasi:"Concourse Paid Area",   deskripsi:"Temuan keramik pecah di area gate" },
  { id:6,  tgl:"2/3/2026",  bulan:"Februari", nama:"Helly Setiawan",     stasiun:"Fatmawati",   shift:"Pagi",  kategori:"Safety",   subkategori:"Kerusakan Fisik",             lokasi:"Back of House",         deskripsi:"Informasi OCC deep di line 1" },
  { id:7,  tgl:"2/3/2026",  bulan:"Februari", nama:"Yanni Surya",        stasiun:"Haji Nawi",   shift:"Pagi",  kategori:"Safety",   subkategori:"Gangguan Lift & Eskalator",   lokasi:"Concourse Paid Area",   deskripsi:"Lift sisi kiri trouble pada pukul 15.20" },
  { id:8,  tgl:"2/3/2026",  bulan:"Februari", nama:"Yanni Surya",        stasiun:"Lebak Bulus", shift:"Siang", kategori:"Safety",   subkategori:"Keselamatan Penumpang",       lokasi:"Concourse Paid Area",   deskripsi:"Penumpang terjatuh di tangga manual downtrack" },
  { id:9,  tgl:"2/4/2026",  bulan:"Februari", nama:"Agus Heriyanto",     stasiun:"Cipete Raya", shift:"Malam", kategori:"Safety",   subkategori:"Gangguan Lift & Eskalator",   lokasi:"Lift",                  deskripsi:"Gangguan Elevator GC sisi Damkar" },
  { id:10, tgl:"2/4/2026",  bulan:"Februari", nama:"Sugiarso Amin",      stasiun:"Fatmawati",   shift:"Pagi",  kategori:"Service",  subkategori:"Perilaku Penumpang",          lokasi:"Concourse Unpaid Area", deskripsi:"Penumpang menanyakan tap in dari sisi barat" },
  { id:11, tgl:"2/4/2026",  bulan:"Februari", nama:"Yanni Surya",        stasiun:"Haji Nawi",   shift:"Siang", kategori:"Safety",   subkategori:"Kerusakan Fisik",             lokasi:"Concourse Paid Area",   deskripsi:"Karpet nomad sudah kurang baik berpotensi bahaya" },
  { id:12, tgl:"2/5/2026",  bulan:"Februari", nama:"Helly Setiawan",     stasiun:"Lebak Bulus", shift:"Pagi",  kategori:"Security", subkategori:"Barang Mencurigakan / LnF",   lokasi:"Platform Downtrack",    deskripsi:"Ditemukan tas tertinggal di platform 2B" },
  { id:13, tgl:"2/5/2026",  bulan:"Februari", nama:"Ira Utami Putri",    stasiun:"Cipete Raya", shift:"Siang", kategori:"Security", subkategori:"Gangguan Ketertiban",         lokasi:"Concourse Unpaid Area", deskripsi:"Pengamen masuk area stasiun" },
  { id:14, tgl:"2/6/2026",  bulan:"Februari", nama:"Fujiana Fujiana",    stasiun:"Fatmawati",   shift:"Malam", kategori:"Service",  subkategori:"Kepadatan & Antrian",         lokasi:"Concourse Paid Area",   deskripsi:"Antrian panjang di gate masuk jam peak hour" },
  { id:15, tgl:"2/6/2026",  bulan:"Februari", nama:"Dwi Masruri",        stasiun:"Haji Nawi",   shift:"Pagi",  kategori:"Safety",   subkategori:"Perilaku Penumpang",          lokasi:"Platform Uptrack",      deskripsi:"Penumpang berdiri terlalu dekat tepi platform" },
  { id:16, tgl:"2/7/2026",  bulan:"Februari", nama:"Sugiarso Amin",      stasiun:"Lebak Bulus", shift:"Siang", kategori:"Service",  subkategori:"Gangguan Sistem Digital",     lokasi:"Ground",                deskripsi:"Layar informasi jadwal mati selama 2 jam" },
  { id:17, tgl:"2/7/2026",  bulan:"Februari", nama:"Helly Setiawan",     stasiun:"Cipete Raya", shift:"Pagi",  kategori:"Security", subkategori:"Barang Mencurigakan / LnF",   lokasi:"Concourse Paid Area",   deskripsi:"Ditemukan HP tertinggal di bangku tunggu" },
  { id:18, tgl:"2/8/2026",  bulan:"Februari", nama:"Yanni Surya",        stasiun:"Fatmawati",   shift:"Malam", kategori:"Safety",   subkategori:"Keselamatan Penumpang",       lokasi:"Platform Downtrack",    deskripsi:"Penumpang hampir terjepit pintu kereta" },
  { id:19, tgl:"2/9/2026",  bulan:"Februari", nama:"Agung Yoga Pradita", stasiun:"Haji Nawi",   shift:"Siang", kategori:"Service",  subkategori:"Kebersihan & Hama",           lokasi:"Toilet Publik",         deskripsi:"Toilet tidak berfungsi optimal, bau menyengat" },
  { id:20, tgl:"2/10/2026", bulan:"Februari", nama:"Ira Utami Putri",    stasiun:"Lebak Bulus", shift:"Pagi",  kategori:"Security", subkategori:"Gangguan Ketertiban",         lokasi:"Back of House",         deskripsi:"Oknum tidak dikenal masuk area BOH tanpa izin" },
  { id:21, tgl:"1/5/2026",  bulan:"Januari",  nama:"Sugiarso Amin",      stasiun:"Cipete Raya", shift:"Pagi",  kategori:"Safety",   subkategori:"Kerusakan Fisik",             lokasi:"Concourse Paid Area",   deskripsi:"Railing tangga kendur di area barat" },
  { id:22, tgl:"1/6/2026",  bulan:"Januari",  nama:"Helly Setiawan",     stasiun:"Fatmawati",   shift:"Siang", kategori:"Service",  subkategori:"Gangguan Gate & Mesin Tiket", lokasi:"Concourse Paid Area",   deskripsi:"Mesin top-up error tidak bisa digunakan" },
  { id:23, tgl:"1/7/2026",  bulan:"Januari",  nama:"Yanni Surya",        stasiun:"Haji Nawi",   shift:"Malam", kategori:"Security", subkategori:"Barang Mencurigakan / LnF",   lokasi:"Platform Uptrack",      deskripsi:"Koper mencurigakan ditinggal di platform" },
  { id:24, tgl:"1/8/2026",  bulan:"Januari",  nama:"Dwi Masruri",        stasiun:"Lebak Bulus", shift:"Pagi",  kategori:"Safety",   subkategori:"Gangguan Lift & Eskalator",   lokasi:"Lift",                  deskripsi:"Lift B3 tidak beroperasi" },
  { id:25, tgl:"1/9/2026",  bulan:"Januari",  nama:"Fujiana Fujiana",    stasiun:"Cipete Raya", shift:"Siang", kategori:"Service",  subkategori:"Perilaku Penumpang",          lokasi:"Concourse Unpaid Area", deskripsi:"Penumpang ribut di area antrian" },
  { id:26, tgl:"3/1/2026",  bulan:"Maret",    nama:"Agus Heriyanto",     stasiun:"Fatmawati",   shift:"Pagi",  kategori:"Safety",   subkategori:"Keselamatan Penumpang",       lokasi:"Platform Downtrack",    deskripsi:"Penumpang berlari di platform saat kereta masuk" },
  { id:27, tgl:"3/2/2026",  bulan:"Maret",    nama:"Ira Utami Putri",    stasiun:"Haji Nawi",   shift:"Malam", kategori:"Security", subkategori:"Gangguan Ketertiban",         lokasi:"Concourse Unpaid Area", deskripsi:"Kelompok pemuda membuat keributan" },
  { id:28, tgl:"3/3/2026",  bulan:"Maret",    nama:"Sugiarso Amin",      stasiun:"Lebak Bulus", shift:"Siang", kategori:"Service",  subkategori:"Kebersihan & Hama",           lokasi:"Ground",                deskripsi:"Ditemukan tikus di area BOH lantai ground" },
  { id:29, tgl:"3/4/2026",  bulan:"Maret",    nama:"Helly Setiawan",     stasiun:"Cipete Raya", shift:"Pagi",  kategori:"Safety",   subkategori:"Kerusakan Fisik",             lokasi:"Back of House",         deskripsi:"Pintu BOH rusak tidak bisa dikunci" },
  { id:30, tgl:"3/5/2026",  bulan:"Maret",    nama:"Yanni Surya",        stasiun:"Fatmawati",   shift:"Siang", kategori:"Service",  subkategori:"Gangguan Sistem Digital",     lokasi:"Concourse Paid Area",   deskripsi:"CCTV di jalur masuk mati sejak pagi" },
]

export const STASIUN_LIST  = ['Cipete Raya', 'Fatmawati', 'Haji Nawi', 'Lebak Bulus']
export const BULAN_LIST    = ['Januari', 'Februari', 'Maret', 'April']
export const SHIFT_LIST    = ['Pagi', 'Siang', 'Malam']
export const KATEGORI_LIST = ['Safety', 'Service', 'Security']
export const COLORS        = { Safety: '#E8042C', Service: '#059669', Security: '#D97706' }
EOF

# ─── src/hooks/useFilters.js ──────────────────────────────────────────────────
cat > src/hooks/useFilters.js << 'EOF'
import { useState, useMemo } from 'react'

export function useFilters(data) {
  const [bulan,    setBulan]    = useState('all')
  const [stasiun,  setStasiun]  = useState('all')
  const [shift,    setShift]    = useState('all')
  const [kategori, setKategori] = useState('all')
  const [nama,     setNama]     = useState('all')

  const filtered = useMemo(() => data.filter(d =>
    (bulan    === 'all' || d.bulan    === bulan)    &&
    (stasiun  === 'all' || d.stasiun  === stasiun)  &&
    (shift    === 'all' || d.shift    === shift)    &&
    (kategori === 'all' || d.kategori === kategori) &&
    (nama     === 'all' || d.nama     === nama)
  ), [data, bulan, stasiun, shift, kategori, nama])

  return { filters: { bulan, stasiun, shift, kategori, nama }, setters: { setBulan, setStasiun, setShift, setKategori, setNama }, filtered }
}

export function countBy(arr, key) {
  return arr.reduce((acc, d) => { acc[d[key]] = (acc[d[key]] || 0) + 1; return acc }, {})
}

export function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}
EOF

# ─── src/components/Dashboard.jsx ────────────────────────────────────────────
cat > src/components/Dashboard.jsx << 'EOF'
import { useMemo } from 'react'
import { useFilters } from '../hooks/useFilters'
import FilterBar from './FilterBar'
import PersonalBanner from './PersonalBanner'
import MetricCards from './MetricCards'
import { DonutChart, BarStasiun, TrendChart, ParetoChart, HeatmapLokasi, ShiftChart } from './Charts'
import DataTable from './DataTable'
import s from './Dashboard.module.css'

export default function Dashboard({ data }) {
  const { filters, setters, filtered } = useFilters(data)
  const allNames = useMemo(() => [...new Set(data.map(d => d.nama))].sort(), [data])

  return (
    <div className={s.page}>
      {/* Navbar — same vibe as station-rooms */}
      <nav className={s.nav}>
        <div className={s.navInner}>
          <div className={s.navBrand}>
            <div className={s.navLogo}>MRT</div>
            <div>
              <div className={s.navTitle}>Banking Data Dashboard</div>
              <div className={s.navSub}>MRT Jakarta</div>
            </div>
          </div>
          <div className={s.navRight}>
            <span className={s.navTag}>Internal Tool · Region 1</span>
          </div>
        </div>
      </nav>

      {/* Hero strip */}
      <div className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>Data Operasional Stasiun</p>
          <h1 className={s.heroTitle}>Banking Data.</h1>
          <p className={s.heroSub}>Analisis laporan harian dari seluruh Area Authority di 4 stasiun Region 1. {filtered.length} entri ditampilkan.</p>
        </div>
      </div>

      <div className={s.body}>
        <FilterBar filters={filters} setters={setters} allNames={allNames} />
        <PersonalBanner nama={filters.nama} allData={data} />
        <MetricCards data={filtered} selectedNama={filters.nama} />
        <div className={s.row2}>
          <DonutChart data={filtered} />
          <BarStasiun data={filtered} />
        </div>
        <div className={s.row2}>
          <TrendChart allData={data} selectedNama={filters.nama} />
          <ParetoChart data={filtered} />
        </div>
        <div className={s.row2}>
          <HeatmapLokasi data={filtered} />
          <ShiftChart data={filtered} />
        </div>
        <DataTable data={filtered} />

        <footer className={s.footer}>
          © 2026 MRT Jakarta · Internal Tool · Region 1 · Banking Data Program
        </footer>
      </div>
    </div>
  )
}
EOF

cat > src/components/Dashboard.module.css << 'EOF'
.page { min-height: 100vh; background: var(--bg-page); }

/* Nav */
.nav { background: var(--navy); border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; }
.navInner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; }
.navBrand { display: flex; align-items: center; gap: 12px; }
.navLogo { width: 32px; height: 32px; border-radius: 8px; background: var(--red); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 11px; letter-spacing: 0.05em; flex-shrink: 0; }
.navTitle { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.2; }
.navSub   { font-size: 11px; color: rgba(255,255,255,0.45); }
.navRight { display: flex; align-items: center; }
.navTag   { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.03em; }

/* Hero */
.hero { background: var(--navy); padding: 40px 0 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.heroInner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.heroEyebrow { font-size: 12px; font-weight: 500; color: var(--red); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
.heroTitle { font-size: clamp(32px, 5vw, 52px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 12px; }
.heroSub   { font-size: 15px; color: rgba(255,255,255,0.5); max-width: 520px; line-height: 1.6; }

/* Body */
.body { max-width: 1200px; margin: 0 auto; padding: 28px 24px; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }

/* Footer */
.footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-faint); text-align: center; }

@media (max-width: 768px) {
  .row2 { grid-template-columns: 1fr; }
  .body { padding: 16px; }
  .heroTitle { font-size: 28px; }
}
EOF

# ─── src/components/FilterBar.jsx ────────────────────────────────────────────
cat > src/components/FilterBar.jsx << 'EOF'
import { BULAN_LIST, STASIUN_LIST, SHIFT_LIST, KATEGORI_LIST } from '../data/sampleData'
import s from './FilterBar.module.css'

export default function FilterBar({ filters, setters, allNames }) {
  const { bulan, stasiun, shift, kategori, nama } = filters
  const { setBulan, setStasiun, setShift, setKategori, setNama } = setters
  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <span className={s.sectionLabel}>Filter</span>
        <div className={s.selects}>
          {[
            { label:'Bulan',    val:bulan,    set:setBulan,    opts:BULAN_LIST    },
            { label:'Stasiun',  val:stasiun,  set:setStasiun,  opts:STASIUN_LIST  },
            { label:'Shift',    val:shift,    set:setShift,    opts:SHIFT_LIST    },
            { label:'Kategori', val:kategori, set:setKategori, opts:KATEGORI_LIST },
          ].map(({ label, val, set, opts }) => (
            <select key={label} value={val} onChange={e => set(e.target.value)} className={s.select}>
              <option value="all">Semua {label}</option>
              {opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
        </div>
      </div>
      <div className={s.divider} />
      <div className={s.chipRow}>
        <span className={s.chipLabel}>Area Authority</span>
        <div className={s.chips}>
          <button className={`${s.chip} ${nama==='all' ? s.chipAll : ''}`} onClick={() => setNama('all')}>Semua AA</button>
          {allNames.map(n => (
            <button key={n} className={`${s.chip} ${nama===n ? s.chipActive : ''}`} onClick={() => setNama(n)}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
EOF

cat > src/components/FilterBar.module.css << 'EOF'
.wrap { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 12px; box-shadow: var(--shadow-sm); }
.topRow { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.sectionLabel { font-size: 11px; font-weight: 600; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.07em; flex-shrink: 0; }
.selects { display: flex; gap: 8px; flex-wrap: wrap; }
.select { font-size: 13px; padding: 7px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--bg-subtle); color: var(--text-mid); cursor: pointer; outline: none; transition: border-color 0.15s; }
.select:hover { border-color: var(--border-mid); }
.select:focus { border-color: var(--navy); }
.divider { height: 1px; background: var(--border); margin: 14px 0; }
.chipRow { display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
.chipLabel { font-size: 11px; font-weight: 600; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.07em; flex-shrink: 0; padding-top: 7px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; border: 1px solid var(--border); background: var(--bg-subtle); color: var(--text-muted); transition: all 0.15s; }
.chip:hover { border-color: var(--border-mid); color: var(--text); }
.chipActive { background: var(--navy) !important; color: #fff !important; border-color: var(--navy) !important; }
.chipAll    { background: var(--navy) !important; color: #fff !important; border-color: var(--navy) !important; }
EOF

# ─── src/components/PersonalBanner.jsx ───────────────────────────────────────
cat > src/components/PersonalBanner.jsx << 'EOF'
import { countBy, initials } from '../hooks/useFilters'
import { COLORS } from '../data/sampleData'
import s from './PersonalBanner.module.css'

export default function PersonalBanner({ nama, allData }) {
  if (nama === 'all') return null
  const pd      = allData.filter(d => d.nama === nama)
  const byKat   = countBy(pd, 'kategori')
  const total   = pd.length || 1
  const topSub  = Object.entries(countBy(pd, 'subkategori')).sort((a,b)=>b[1]-a[1])[0]
  const topSt   = Object.entries(countBy(pd, 'stasiun')).sort((a,b)=>b[1]-a[1])[0]
  const topShift= Object.entries(countBy(pd, 'shift')).sort((a,b)=>b[1]-a[1])[0]

  return (
    <div className={s.banner}>
      <div className={s.left}>
        <div className={s.avatar}>{initials(nama)}</div>
        <div>
          <div className={s.name}>{nama}</div>
          <div className={s.meta}>{topSt?.[0]||'—'} · Shift {topShift?.[0]||'—'}</div>
        </div>
      </div>
      <div className={s.stats}>
        {[
          { v: pd.length,          l: 'Total',    c: var(--navy) },
          { v: byKat.Safety||0,    l: 'Safety',   c: COLORS.Safety   },
          { v: byKat.Service||0,   l: 'Service',  c: COLORS.Service  },
          { v: byKat.Security||0,  l: 'Security', c: COLORS.Security },
        ].map(x => (
          <div key={x.l} className={s.stat}>
            <span className={s.sv} style={{color: x.l==='Total'?'var(--navy)':x.c}}>{x.v}</span>
            <span className={s.sl}>{x.l}</span>
          </div>
        ))}
      </div>
      <div className={s.bars}>
        <div className={s.barsTitle}>Distribusi kontribusi</div>
        {['Safety','Service','Security'].map(k => (
          <div key={k} className={s.brow}>
            <span className={s.blabel}>{k}</span>
            <div className={s.btrack}><div className={s.bfill} style={{width:`${Math.round((byKat[k]||0)/total*100)}%`,background:COLORS[k]}}/></div>
            <span className={s.bval}>{Math.round((byKat[k]||0)/total*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
EOF

cat > src/components/PersonalBanner.module.css << 'EOF'
.banner { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 22px; margin-bottom: 12px; display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; box-shadow: var(--shadow-sm); animation: fadeUp 0.2s ease; }
@keyframes fadeUp { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
.left   { display: flex; align-items: center; gap: 14px; min-width: 200px; }
.avatar { width: 44px; height: 44px; border-radius: 10px; background: var(--navy); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
.name   { font-size: 16px; font-weight: 600; color: var(--text); }
.meta   { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.stats  { display: flex; gap: 8px; flex-wrap: wrap; }
.stat   { background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 10px 16px; text-align: center; min-width: 70px; }
.sv { display: block; font-size: 22px; font-weight: 700; line-height: 1; }
.sl { display: block; font-size: 10px; color: var(--text-faint); margin-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.bars       { flex: 1; min-width: 220px; }
.barsTitle  { font-size: 11px; font-weight: 600; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 10px; }
.brow   { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.blabel { font-size: 12px; color: var(--text-muted); width: 60px; flex-shrink: 0; }
.btrack { flex: 1; background: var(--bg-subtle); border-radius: 4px; height: 8px; overflow: hidden; }
.bfill  { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
.bval   { font-size: 11px; color: var(--text-muted); width: 32px; text-align: right; flex-shrink: 0; }
EOF

# ─── src/components/MetricCards.jsx ──────────────────────────────────────────
cat > src/components/MetricCards.jsx << 'EOF'
import { countBy } from '../hooks/useFilters'
import { COLORS } from '../data/sampleData'
import s from './MetricCards.module.css'

export default function MetricCards({ data, selectedNama }) {
  const byKat = countBy(data, 'kategori')
  const total = data.length
  const pct = k => `${Math.round((byKat[k]||0)/(total||1)*100)}% dari total`

  return (
    <div className={s.grid}>
      {[
        { label:'Total Laporan', value:total,             sub: selectedNama==='all'?'semua AA':selectedNama.split(' ')[0], color:'var(--navy)', bg:'var(--bg)' },
        { label:'Safety',        value:byKat.Safety||0,   sub:pct('Safety'),   color:COLORS.Safety,   bg:'#FEF2F2' },
        { label:'Service',       value:byKat.Service||0,  sub:pct('Service'),  color:COLORS.Service,  bg:'#F0FDF4' },
        { label:'Security',      value:byKat.Security||0, sub:pct('Security'), color:COLORS.Security, bg:'#FFFBEB' },
      ].map(c => (
        <div key={c.label} className={s.card} style={{background:c.bg}}>
          <div className={s.label}>{c.label}</div>
          <div className={s.value} style={{color:c.color}}>{c.value}</div>
          <div className={s.sub}>{c.sub}</div>
        </div>
      ))}
    </div>
  )
}
EOF

cat > src/components/MetricCards.module.css << 'EOF'
.grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 12px; }
.card { border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; box-shadow: var(--shadow-sm); }
.label { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px; }
.value { font-size: 32px; font-weight: 700; line-height: 1; }
.sub   { font-size: 12px; color: var(--text-muted); margin-top: 5px; }
@media (max-width: 640px) { .grid { grid-template-columns: repeat(2,1fr); } }
EOF

# ─── src/components/Charts.jsx ───────────────────────────────────────────────
cat > src/components/Charts.jsx << 'EOF'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts'
import { countBy } from '../hooks/useFilters'
import { COLORS, BULAN_LIST, STASIUN_LIST, SHIFT_LIST } from '../data/sampleData'
import s from './Charts.module.css'

const PC  = ['#E8042C','#0D1B2A','#059669','#D97706','#7C3AED','#0369A1']
const LBG = {'Concourse Paid Area':'#DBEAFE','Concourse Unpaid Area':'#DCFCE7','Platform Downtrack':'#FEE2E2','Platform Uptrack':'#FEF9C3','Back of House':'#EDE9FE','Ground':'#DCFCE7','Lift':'#FCE7F3','Toilet Publik':'#F3F4F6'}
const LTX = {'Concourse Paid Area':'#1E40AF','Concourse Unpaid Area':'#166534','Platform Downtrack':'#991B1B','Platform Uptrack':'#854D0E','Back of House':'#4C1D95','Ground':'#14532D','Lift':'#831843','Toilet Publik':'#374151'}

function Card({ title, children }) {
  return <div className={s.card}><p className={s.cardTitle}>{title}</p>{children}</div>
}
function Leg({ items }) {
  return (
    <div className={s.legend}>
      {items.map(({ label, color }) => (
        <span key={label} className={s.legItem}><span className={s.legDot} style={{ background: color }} />{label}</span>
      ))}
    </div>
  )
}

export function DonutChart({ data }) {
  const byKat = countBy(data, 'kategori')
  const total = data.length || 1
  const cd    = Object.entries(byKat).map(([k, v]) => ({ name: k, value: v }))
  return (
    <Card title="Distribusi Kategori">
      <Leg items={Object.keys(COLORS).map(k => ({ label: `${k} · ${Math.round((byKat[k]||0)/total*100)}%`, color: COLORS[k] }))} />
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={cd} cx="50%" cy="50%" innerRadius={56} outerRadius={86} paddingAngle={3} dataKey="value">
            {cd.map(e => <Cell key={e.name} fill={COLORS[e.name] || '#ccc'} />)}
          </Pie>
          <Tooltip formatter={(v, n) => [`${v} (${Math.round(v/total*100)}%)`, n]} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function BarStasiun({ data }) {
  const bySt = countBy(data, 'stasiun')
  const cd   = STASIUN_LIST.map(s => ({ name: s.split(' ')[0], value: bySt[s] || 0, full: s }))
  return (
    <Card title="Laporan per Stasiun">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={cd} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip formatter={(v, _, p) => [v, p.payload.full]} cursor={{ fill: '#F9FAFB' }} />
          <Bar dataKey="value" fill="#0D1B2A" radius={[5, 5, 0, 0]} name="Laporan" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function TrendChart({ allData, selectedNama }) {
  const base = selectedNama === 'all' ? allData : allData.filter(d => d.nama === selectedNama)
  const cd   = BULAN_LIST.map(b => ({
    name:     b.slice(0, 3),
    Safety:   base.filter(d => d.bulan === b && d.kategori === 'Safety').length,
    Service:  base.filter(d => d.bulan === b && d.kategori === 'Service').length,
    Security: base.filter(d => d.bulan === b && d.kategori === 'Security').length,
  }))
  return (
    <Card title="Trend per Bulan">
      <Leg items={Object.entries(COLORS).map(([k, c]) => ({ label: k, color: c }))} />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={cd} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip />
          {Object.entries(COLORS).map(([k, c], i) => (
            <Line key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2.5}
              dot={{ r: 4, fill: c, strokeWidth: 0 }}
              strokeDasharray={i === 1 ? '5 3' : i === 2 ? '2 4' : undefined} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ParetoChart({ data }) {
  const sorted = Object.entries(countBy(data, 'subkategori')).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const maxV   = sorted[0]?.[1] || 1
  return (
    <Card title="Pareto — Sub Kategori Terbanyak">
      <div className={s.paretoWrap}>
        {sorted.length === 0
          ? <div className={s.empty}>Tidak ada data</div>
          : sorted.map(([k, v], i) => (
            <div key={k} className={s.pRow}>
              <span className={s.pLabel}>{k.length > 20 ? k.slice(0, 19) + '…' : k}</span>
              <div className={s.pTrack}>
                <div className={s.pFill} style={{ width: `${Math.round(v / maxV * 100)}%`, background: PC[i % 6] }} />
              </div>
              <span className={s.pVal}>{v}</span>
            </div>
          ))}
      </div>
    </Card>
  )
}

export function HeatmapLokasi({ data }) {
  const sorted = Object.entries(countBy(data, 'lokasi')).sort((a, b) => b[1] - a[1])
  const maxL   = sorted[0]?.[1] || 1
  return (
    <Card title="Heatmap Lokasi">
      <div className={s.heatGrid}>
        {sorted.slice(0, 8).map(([k, v]) => (
          <div key={k} className={s.heatItem}
            style={{ background: LBG[k] || '#F3F4F6', opacity: 0.5 + (v / maxL) * 0.5 }}>
            <div className={s.heatLabel} style={{ color: LTX[k] || '#374151' }}>{k}</div>
            <div className={s.heatVal}   style={{ color: LTX[k] || '#374151' }}>{v}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function ShiftChart({ data }) {
  const cd = SHIFT_LIST.map(sh => ({
    name:     sh,
    Safety:   data.filter(d => d.shift === sh && d.kategori === 'Safety').length,
    Service:  data.filter(d => d.shift === sh && d.kategori === 'Service').length,
    Security: data.filter(d => d.shift === sh && d.kategori === 'Security').length,
  }))
  return (
    <Card title="Laporan per Shift">
      <Leg items={Object.entries(COLORS).map(([k, c]) => ({ label: k, color: c }))} />
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={cd} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip cursor={{ fill: '#F9FAFB' }} />
          {Object.entries(COLORS).map(([k, c]) => (
            <Bar key={k} dataKey={k} stackId="a" fill={c} radius={k === 'Security' ? [5, 5, 0, 0] : [0, 0, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
EOF

cat > src/components/Charts.module.css << 'EOF'
.card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px 20px; box-shadow: var(--shadow-sm); }
.cardTitle { font-size: 11px; font-weight: 600; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 12px; }
.legend { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 10px; }
.legItem { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
.legDot  { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
.paretoWrap { padding-top: 4px; }
.pRow   { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.pLabel { font-size: 11px; color: var(--text-muted); width: 140px; text-align: right; flex-shrink: 0; }
.pTrack { flex: 1; background: var(--bg-subtle); border-radius: 4px; height: 12px; overflow: hidden; }
.pFill  { height: 100%; border-radius: 4px; transition: width 0.4s ease; }
.pVal   { font-size: 12px; font-weight: 600; color: var(--text-mid); width: 22px; flex-shrink: 0; }
.heatGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }
.heatItem { border-radius: var(--radius-md); padding: 10px 14px; }
.heatLabel { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.heatVal   { font-size: 22px; font-weight: 700; margin-top: 2px; line-height: 1; }
.empty { text-align: center; padding: 28px; color: var(--text-faint); font-size: 13px; }
EOF

# ─── src/components/DataTable.jsx ────────────────────────────────────────────
cat > src/components/DataTable.jsx << 'EOF'
import s from './DataTable.module.css'
const BADGE = { Safety: s.bSafety, Service: s.bService, Security: s.bSecurity }

export default function DataTable({ data }) {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <p className={s.title}>Laporan Terbaru</p>
        <span className={s.count}>{data.length} entri</span>
      </div>
      <div className={s.wrap}>
        <table className={s.table}>
          <thead>
            <tr>{['#','Tgl','Nama AA','Stasiun','Shift','Kategori','Sub Kategori','Lokasi','Deskripsi'].map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.length === 0
              ? <tr><td colSpan={9} className={s.empty}>Tidak ada data untuk filter ini</td></tr>
              : data.slice(0, 15).map(d => (
                <tr key={d.id}>
                  <td className={s.muted}>{d.id}</td>
                  <td className={s.nowrap + ' ' + s.muted}>{d.tgl}</td>
                  <td className={s.bold}>{d.nama}</td>
                  <td>{d.stasiun}</td>
                  <td>{d.shift}</td>
                  <td><span className={`${s.badge} ${BADGE[d.kategori]}`}>{d.kategori}</span></td>
                  <td>{d.subkategori}</td>
                  <td className={s.muted}>{d.lokasi}</td>
                  <td className={s.trunc + ' ' + s.muted}>{d.deskripsi}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data.length > 15 && <div className={s.more}>Menampilkan 15 dari {data.length} · scroll untuk lihat semua</div>}
    </div>
  )
}
EOF

cat > src/components/DataTable.module.css << 'EOF'
.card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 10px; box-shadow: var(--shadow-sm); overflow: hidden; }
.header { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 12px; border-bottom: 1px solid var(--border); }
.title  { font-size: 11px; font-weight: 600; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.07em; }
.count  { font-size: 11px; color: var(--text-faint); background: var(--bg-subtle); border: 1px solid var(--border); border-radius: 20px; padding: 2px 10px; }
.wrap   { overflow-x: auto; }
.table  { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; padding: 9px 14px; background: var(--bg-subtle); color: var(--text-muted); font-weight: 600; white-space: nowrap; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); }
td { padding: 10px 14px; border-bottom: 1px solid var(--border); color: var(--text); vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #FAFAFA; }
.muted  { color: var(--text-muted) !important; }
.bold   { font-weight: 500; color: var(--text) !important; }
.nowrap { white-space: nowrap; }
.trunc  { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badge  { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.bSafety   { background: #FEE2E2; color: #991B1B; }
.bService  { background: #DCFCE7; color: #166534; }
.bSecurity { background: #FEF9C3; color: #854D0E; }
.empty { text-align: center; padding: 32px; color: var(--text-faint); }
.more  { text-align: center; font-size: 12px; color: var(--text-faint); padding: 12px; border-top: 1px solid var(--border); }
EOF

echo ""
echo "✅ Done! Sekarang jalanin:"
echo "  npm run dev -- --host"
echo ""
