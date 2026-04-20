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
         <Bar dataKey="value" fill="#0057A8" radius={[5,5,0,0]} name="Laporan" />
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
  const sorted = Object.entries(countBy(data, 'subkategori'))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9)
  const maxV = sorted[0]?.[1] || 1

  return (
    <Card title="Pareto — Sub Kategori Terbanyak">
      <div className={s.paretoWrap}>
        {sorted.length === 0
          ? <div className={s.empty}>Tidak ada data</div>
          : sorted.map(([k, v], i) => (
            <div key={k} className={s.pRow}>
              <span className={s.pLabel}>{k.length > 22 ? k.slice(0, 21) + '…' : k}</span>
              <div className={s.pTrack}>
                <div className={s.pFill} style={{ width: `${Math.round(v / maxV * 100)}%`, background: PC[i % PC.length] }} />
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
