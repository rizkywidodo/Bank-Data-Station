import { useMemo } from 'react'
import { useFilters } from '../hooks/useFilters'
import FilterBar from './FilterBar'
import PersonalBanner from './PersonalBanner'
import MetricCards from './MetricCards'
import { DonutChart, BarStasiun, TrendChart, ParetoChart, HeatmapLokasi, ShiftChart } from './Charts'
import DataTable from './DataTable'
import s from './Dashboard.module.css'

export default function Dashboard({ data, filename, onUpload, uploading, lastUpload, onNavigate }) {
  const { filters, setters, filtered } = useFilters(data)
  const allNames = useMemo(() => [...new Set(data.map(d => d.nama))].sort(), [data])
  const allStasiun  = useMemo(() => [...new Set(data.map(d => d.stasiun))].filter(Boolean).sort(), [data])
  const allBulan    = useMemo(() => [...new Set(data.map(d => d.bulan))].filter(Boolean), [data])
  const allShift    = useMemo(() => [...new Set(data.map(d => d.shift))].filter(Boolean).sort(), [data])
  const allLokasi   = useMemo(() => [...new Set(data.map(d => d.lokasi))].filter(Boolean).sort(), [data])
  const allSubkat   = useMemo(() => [...new Set(data.map(d => d.subkategori))].filter(Boolean).sort(), [data])
  const allFasilitas = useMemo(() => [
  ...new Set(data.flatMap(d => d.jenisGangguan ? [d.jenisGangguan] : d.subkategoriAsli && ['Gangguan Gate & Mesin Tiket','Gangguan Lift & Eskalator','Gangguan Sistem Digital','Kerusakan Fisik'].includes(d.subkategoriAsli) ? [d.subkategoriAsli] : []))
].filter(Boolean).sort(), [data])
  const allKategori = useMemo(() => [...new Set(data.map(d => d.kategori))].filter(Boolean).sort(), [data])

  return (
    <div className={s.page}>
      {/* Navbar — same vibe as station-rooms */}
      <nav className={s.nav}>
        <div className={s.navInner}>
          <div className={s.navBrand}>
            <div className={s.navLogo}>
            <svg viewBox="0 0 36 36" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28 L12 8 L18 20 L24 8 L32 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
            <div>
              <div className={s.navTitle}>Station Bank Data</div>
              <div className={s.navSub}>MRT Jakarta</div>
            </div>
          </div>
          <div className={s.navRight}>
          <label className={s.uploadBtn}>
          <span className={s.uploadText}>{uploading ? 'Mengupload...' : 'Upload Data Terbaru'}</span>
          <span className={s.uploadIcon}>↑</span>
          <input type="file" accept=".xlsx,.xls,.csv" style={{display:'none'}} onChange={onUpload} disabled={uploading} />
        </label>
        </div>
        </div>
      </nav>

      {/* Hero strip */}
      <div className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>Data Operasional Stasiun</p>
          <h1 className={s.heroTitle}>Banking Data.</h1>
          <p className={s.heroSub}>Analisis laporan harian dari seluruh Area Authority di 4 stasiun Region 1.</p>
          {lastUpload && <p className={s.heroSub} style={{marginTop:6,opacity:0.6,fontSize:13}}>Update terakhir: {lastUpload}</p>}
          <button className={s.heroBtn} onClick={() => onNavigate('report')}>
            Lihat Laporan AA →
          </button>
        </div>
      </div>

      <div className={s.body}>
        <FilterBar 
  filters={filters} 
  setters={setters} 
  allNames={allNames}
  allStasiun={allStasiun}
  allBulan={allBulan}
  allShift={allShift}
  allLokasi={allLokasi}
  allSubkat={allSubkat}
  allKategori={allKategori}
  allFasilitas={allFasilitas}
      />
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
          © 2026 MRT Jakarta · Internal Tool · Region 1 · Rizky Widodo (intern) · Banking Data Program
        </footer>
      </div>
    </div>
  )
}
