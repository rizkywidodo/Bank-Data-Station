import { useMemo } from 'react'
import { countBy, initials } from '../hooks/useFilters'
import { COLORS } from '../data/sampleData'
import s from './ReportListPage.module.css'

const BULAN_ORDER = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

export default function ReportListPage({ data, onSelect, onBack }) {
  const allNames = useMemo(() => [...new Set(data.map(d => d.nama))].sort(), [data])
  const allBulan = useMemo(() => [...new Set(data.map(d => d.bulan))].filter(Boolean), [data])
  const avgTotal = useMemo(() => {
    const counts = allNames.map(n => data.filter(d => d.nama === n).length)
    return Math.round(counts.reduce((a,b) => a+b, 0) / (counts.length || 1))
  }, [data, allNames])

  const aaList = useMemo(() => allNames.map(nama => {
    const pd = data.filter(d => d.nama === nama)
    const byKat = countBy(pd, 'kategori')
    const topSt = Object.entries(countBy(pd, 'stasiun')).sort((a,b) => b[1]-a[1])[0]
    const bulanAktif = new Set(pd.map(d => d.bulan)).size
    const totalBulan = allBulan.length || 1
    const konsistensi = Math.round(bulanAktif / totalBulan * 100)
    const total = pd.length
    const vsAvg = total - avgTotal

    return { nama, total, byKat, topSt: topSt?.[0] || '—', konsistensi, vsAvg, bulanAktif }
  }).sort((a,b) => b.total - a.total), [data, allNames, avgTotal, allBulan])

  return (
    <div className={s.page}>
      <nav className={s.nav}>
        <div className={s.navInner}>
            <button className={s.backBtn} onClick={onBack}>← Dashboard</button>
            <div className={s.navBrand}>
            <div className={s.navLogo}>
                <svg viewBox="0 0 36 36" width="16" height="16" fill="none">
                <path d="M4 28 L12 8 L18 20 L24 8 L32 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div>
                <div className={s.navTitle}>Station Data Bank</div>
                <div className={s.navSub}>MRT Jakarta</div>
            </div>
            </div>
        </div>
        </nav>

      <div className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Analisa Per Individu</p>
          <h1 className={s.title}>Laporan AA.</h1>
          <p className={s.sub}>{allNames.length} Area Authority · Rata-rata {avgTotal} laporan per orang</p>
        </div>
      </div>

      <div className={s.body}>
        <div className={s.grid}>
          {aaList.map((aa, i) => (
            <div key={aa.nama} className={s.card} onClick={() => onSelect(aa.nama)}>
              <div className={s.cardTop}>
                <div className={s.rank}>#{i+1}</div>
                <div className={s.avatar}>{initials(aa.nama)}</div>
                <div className={s.info}>
                  <div className={s.name}>{aa.nama}</div>
                  <div className={s.meta}>{aa.topSt}</div>
                </div>
                <div className={s.total}>{aa.total}</div>
              </div>

              <div className={s.bars}>
                {['Safety','Service','Security'].map(k => (
                  <div key={k} className={s.miniBar}>
                    <div className={s.miniTrack}>
                      <div className={s.miniFill} style={{
                        width: `${Math.round((aa.byKat[k]||0)/aa.total*100)}%`,
                        background: k==='Safety'?'#4472C4':k==='Service'?'#FFC000':'#FF0000'
                      }}/>
                    </div>
                    <span className={s.miniLabel}>{k} {Math.round((aa.byKat[k]||0)/aa.total*100)}%</span>
                  </div>
                ))}
              </div>

              <div className={s.cardBottom}>
                <div className={s.stat}>
                  <span className={s.statVal}>{aa.konsistensi}%</span>
                  <span className={s.statLabel}>Konsistensi</span>
                </div>
                <div className={s.stat}>
                  <span className={s.statVal} style={{color: aa.vsAvg >= 0 ? '#059669' : '#CC0000'}}>
                    {aa.vsAvg >= 0 ? '+' : ''}{aa.vsAvg}
                  </span>
                  <span className={s.statLabel}>vs rata-rata</span>
                </div>
                <div className={s.stat}>
                  <span className={s.statVal}>{aa.bulanAktif}</span>
                  <span className={s.statLabel}>bulan aktif</span>
                </div>
                <div className={s.viewBtn}>Lihat detail →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}