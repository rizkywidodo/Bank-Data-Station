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
        { label:'Safety',        value:byKat.Safety||0,   sub:pct('Safety'),   color:COLORS.Safety,   bg:'#EEF3FB' },
        { label:'Service',       value:byKat.Service||0,  sub:pct('Service'),  color:COLORS.Service,  bg:'#FFF8E1' },
        { label:'Security',      value:byKat.Security||0, sub:pct('Security'), color:COLORS.Security, bg:'#FEF2F2' },
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
