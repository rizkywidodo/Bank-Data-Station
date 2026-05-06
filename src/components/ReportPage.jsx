import { useMemo } from 'react'
import { countBy, initials } from '../hooks/useFilters'
import { COLORS } from '../data/sampleData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import s from './ReportPage.module.css'

const BULAN_ORDER = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const BADGE = { Safety: s.bSafety, Service: s.bService, Security: s.bSecurity }

export default function ReportPage({ data, nama, onBack }) {
  const pd = useMemo(() => data.filter(d => d.nama === nama), [data, nama])
  const allNames = useMemo(() => [...new Set(data.map(d => d.nama))], [data])
  const byKat = useMemo(() => countBy(pd, 'kategori'), [pd])
  const total = pd.length

  const topSt = Object.entries(countBy(pd, 'stasiun')).sort((a,b) => b[1]-a[1])[0]
  const allBulan = [...new Set(data.map(d => d.bulan))].filter(Boolean)
  const bulanAktif = new Set(pd.map(d => d.bulan)).size
  const konsistensi = Math.round(bulanAktif / (allBulan.length || 1) * 100)

  const avgTotal = Math.round(
    allNames.map(n => data.filter(d => d.nama === n).length)
      .reduce((a,b) => a+b, 0) / (allNames.length || 1)
  )
  const rank = allNames
    .map(n => ({ n, c: data.filter(d => d.nama === n).length }))
    .sort((a,b) => b.c - a.c)
    .findIndex(x => x.n === nama) + 1

  const trendData = BULAN_ORDER
    .filter(b => allBulan.includes(b))
    .map(b => ({
      name: b.slice(0,3),
      total: pd.filter(d => d.bulan === b).length,
      Safety: pd.filter(d => d.bulan === b && d.kategori === 'Safety').length,
      Service: pd.filter(d => d.bulan === b && d.kategori === 'Service').length,
      Security: pd.filter(d => d.bulan === b && d.kategori === 'Security').length,
    }))

  const subKatData = Object.entries(countBy(pd, 'subkategori'))
    .sort((a,b) => b[1]-a[1]).slice(0,6)

  const shiftData = Object.entries(countBy(pd, 'shift'))
    .sort((a,b) => b[1]-a[1])

  const lokasiData = Object.entries(countBy(pd, 'lokasi'))
    .sort((a,b) => b[1]-a[1]).slice(0,5)

  const avgLen = pd.length
    ? Math.round(pd.reduce((acc, d) => acc + (d.deskripsi?.length || 0), 0) / pd.length)
    : 0
  const detailCount = pd.filter(d => (d.deskripsi?.length || 0) > 80).length
  const singkatCount = pd.filter(d => (d.deskripsi?.length || 0) < 30).length
  const qualityScore = Math.round((detailCount / (total || 1)) * 100)

  const recentLaporan = [...pd].sort((a,b) => b.id2 - a.id2).slice(0, 5)

  return (
    <div className={s.page}>
      <nav className={s.nav}>
        <div className={s.navInner}>
            <button className={s.backBtn} onClick={onBack}>← Semua AA</button>
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
          <p className={s.eyebrow}>Individual Report · {topSt?.[0] || '—'}</p>
          <div className={s.profile}>
            <div className={s.avatar}>{initials(nama)}</div>
            <div>
              <h1 className={s.name}>{nama}</h1>
              <p className={s.meta}>Area Authority · {topSt?.[0] || '—'} · Region 1</p>
            </div>
          </div>
          <div className={s.heroStats}>
            <div className={s.hstat}><div className={s.hstatVal}>{total}</div><div className={s.hstatLabel}>Total Laporan</div></div>
            <div className={s.hstat}><div className={s.hstatVal} style={{color:'#4472C4'}}>{byKat.Safety||0}</div><div className={s.hstatLabel}>Safety</div></div>
            <div className={s.hstat}><div className={s.hstatVal} style={{color:'#FFC000'}}>{byKat.Service||0}</div><div className={s.hstatLabel}>Service</div></div>
            <div className={s.hstat}><div className={s.hstatVal} style={{color:'#FF0000'}}>{byKat.Security||0}</div><div className={s.hstatLabel}>Security</div></div>
            <div className={s.hstat}><div className={s.hstatVal}>#{rank}</div><div className={s.hstatLabel}>Ranking Tim</div></div>
            <div className={s.hstat}><div className={s.hstatVal}>{konsistensi}%</div><div className={s.hstatLabel}>Konsistensi</div></div>
          </div>
        </div>
      </div>

      <div className={s.body}>

        {/* Posisi di Tim */}
        <div className={s.card} style={{marginBottom:12}}>
          <div className={s.cardTitle}>Posisi di Tim</div>
          <div className={s.teamCompare}>
            <div className={s.tcItem}>
              <span className={s.tcLabel}>Total laporan</span>
              <div className={s.tcBar}>
                <div className={s.tcFill} style={{width:`${Math.min(total/Math.max(avgTotal*2,total)*100,100)}%`, background:'#0057A8'}}/>
                <div className={s.tcAvgLine} style={{left:`${Math.min(avgTotal/Math.max(avgTotal*2,total)*100,100)}%`}}/>
              </div>
              <span className={s.tcVal}>{total} <span style={{color:'#9CA3AF',fontSize:11}}>/ avg {avgTotal}</span></span>
            </div>
            <p className={s.tcNote}>
              {total > avgTotal
                ? `${nama.split(' ')[0]} ${Math.round((total/avgTotal-1)*100)}% di atas rata-rata tim`
                : total < avgTotal
                ? `${nama.split(' ')[0]} ${Math.round((1-total/avgTotal)*100)}% di bawah rata-rata tim`
                : `${nama.split(' ')[0]} tepat di rata-rata tim`}
            </p>
          </div>
        </div>

        <div className={s.row2}>
          {/* Trend Bulanan */}
          <div className={s.card}>
            <div className={s.cardTitle}>Trend per Bulan</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData} margin={{top:4,right:8,bottom:0,left:-20}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                <XAxis dataKey="name" tick={{fontSize:11,fill:'#9CA3AF'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#9CA3AF'}} axisLine={false} tickLine={false} allowDecimals={false}/>
                <Tooltip/>
                <Line type="monotone" dataKey="total" stroke="#0057A8" strokeWidth={2.5} dot={{r:4,fill:'#0057A8',strokeWidth:0}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribusi Kategori */}
          <div className={s.card}>
            <div className={s.cardTitle}>Distribusi Kategori</div>
            <div className={s.legend}>
              {['Safety','Service','Security'].map(k => (
                <span key={k} className={s.legItem}>
                  <span className={s.legDot} style={{background:k==='Safety'?'#4472C4':k==='Service'?'#FFC000':'#FF0000'}}/>
                  {k} · {Math.round((byKat[k]||0)/total*100)}%
                </span>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={['Safety','Service','Security'].map(k=>({name:k,value:byKat[k]||0}))}
                  cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {['Safety','Service','Security'].map(k => (
                    <Cell key={k} fill={k==='Safety'?'#4472C4':k==='Service'?'#FFC000':'#FF0000'}/>
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={s.row2}>
          {/* Sub Kategori */}
          <div className={s.card}>
            <div className={s.cardTitle}>Sub Kategori Terbanyak</div>
            <div style={{marginTop:8}}>
              {subKatData.map(([k,v],i) => (
                <div key={k} className={s.barRow}>
                  <span className={s.barLabel}>{k.length>20?k.slice(0,19)+'…':k}</span>
                  <div className={s.barTrack}><div className={s.barFill} style={{width:`${Math.round(v/subKatData[0][1]*100)}%`,background:'#0057A8',opacity:1-i*0.12}}/></div>
                  <span className={s.barVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shift & Lokasi */}
          <div className={s.card}>
            <div className={s.cardTitle}>Distribusi Shift</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={shiftData.map(([k,v])=>({name:k,value:v}))} margin={{top:4,right:8,bottom:0,left:-20}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                <XAxis dataKey="name" tick={{fontSize:11,fill:'#9CA3AF'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#9CA3AF'}} axisLine={false} tickLine={false} allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey="value" fill="#0057A8" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
            <div className={s.cardTitle} style={{marginTop:14}}>Lokasi Terbanyak</div>
            {lokasiData.map(([k,v]) => (
              <div key={k} className={s.barRow} style={{marginBottom:5}}>
                <span className={s.barLabel}>{k.length>20?k.slice(0,19)+'…':k}</span>
                <div className={s.barTrack}><div className={s.barFill} style={{width:`${Math.round(v/lokasiData[0][1]*100)}%`,background:'#374151'}}/></div>
                <span className={s.barVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kualitas Deskripsi */}
        <div className={s.card} style={{marginBottom:12}}>
          <div className={s.cardTitle}>Kualitas Deskripsi</div>
          <div className={s.qualityRow}>
            <div className={s.qualScore}>
              <div className={s.qualScoreNum} style={{color: qualityScore>=70?'#059669':qualityScore>=40?'#D97706':'#CC0000'}}>{qualityScore}%</div>
              <div className={s.qualScoreLabel}>Skor Kualitas</div>
            </div>
            <div className={s.qualStats}>
              <div className={s.qualStat}><span className={s.qualStatVal}>{avgLen}</span><span className={s.qualStatLabel}>rata-rata karakter</span></div>
              <div className={s.qualStat}><span className={s.qualStatVal} style={{color:'#059669'}}>{detailCount}</span><span className={s.qualStatLabel}>laporan detail (&gt;80 char)</span></div>
              <div className={s.qualStat}><span className={s.qualStatVal} style={{color:'#CC0000'}}>{singkatCount}</span><span className={s.qualStatLabel}>laporan singkat (&lt;30 char)</span></div>
            </div>
          </div>
        </div>

        {/* Laporan Terbaru */}
        <div className={s.card}>
          <div className={s.cardTitle}>5 Laporan Terbaru</div>
          <div style={{overflowX:'auto'}}>
            <table className={s.table}>
              <thead><tr><th>Tgl</th><th>Kategori</th><th>Sub Kategori</th><th>Lokasi</th><th>Deskripsi</th></tr></thead>
              <tbody>
                {recentLaporan.map(d => (
                  <tr key={d.id}>
                    <td className={s.muted}>{d.tgl}</td>
                    <td><span className={`${s.badge} ${BADGE[d.kategori]}`}>{d.kategori}</span></td>
                    <td>{d.subkategori}</td>
                    <td className={s.muted}>{d.lokasi}</td>
                    <td className={s.trunc}>{d.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}