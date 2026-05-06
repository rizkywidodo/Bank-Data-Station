import { countBy } from '../hooks/useFilters'
import { COLORS } from '../data/sampleData'
import s from './MetricCards.module.css'

export default function MetricCards({ data, selectedNama }) {
  const byKat = countBy(data, 'kategori')
  const total = data.length
  const katKeys = ['Safety', 'Service', 'Security']

  const pct = (k, i) => {
    if (i === katKeys.length - 1) {
      const sumSoFar = katKeys.slice(0, i).reduce((acc, key) => acc + Math.round((byKat[key]||0)/(total||1)*100), 0)
      return `${100 - sumSoFar}% dari total`
    }
    return `${Math.round((byKat[k]||0)/(total||1)*100)}% dari total`
  }

  const bg = { Safety:'#EEF3FB', Service:'#FFF8E1', Security:'#FEF2F2' }

  return (
    <div className={s.grid}>
      {[
        { label:'Total Laporan', value:total, sub: selectedNama==='all'?'semua AA':selectedNama.split(' ')[0], color:'var(--navy)', bg:'var(--bg)' },
        ...katKeys.map((k, i) => ({ label:k, value:byKat[k]||0, sub:pct(k,i), color:COLORS[k], bg:bg[k] }))
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