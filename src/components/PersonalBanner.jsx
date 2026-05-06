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
          <div className={s.meta}>{topSt?.[0]||'—'}</div>
        </div>
      </div>
      <div className={s.stats}>
        {[
          { v: pd.length,          l: 'Total',    c: '#0D1B2A' },
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
