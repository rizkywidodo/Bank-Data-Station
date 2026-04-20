import { BULAN_LIST, STASIUN_LIST, SHIFT_LIST, KATEGORI_LIST, LOKASI_LIST, SUBKAT_LIST } from '../data/sampleData'
import s from './FilterBar.module.css'

export default function FilterBar({ filters, setters, allNames }) {
  const { bulan, stasiun, shift, kategori, nama, lokasi, subkat } = filters
  const { setBulan, setStasiun, setShift, setKategori, setNama, setLokasi, setSubkat } = setters

  const activeCount = [bulan, stasiun, shift, kategori, lokasi, subkat].filter(v => v !== 'all').length

  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <span className={s.sectionLabel}>
          Filter {activeCount > 0 && <span className={s.activeBadge}>{activeCount} aktif</span>}
        </span>
        <div className={s.selects}>
          {[
            { label:'Bulan',        val:bulan,    set:setBulan,    opts:BULAN_LIST    },
            { label:'Stasiun',      val:stasiun,  set:setStasiun,  opts:STASIUN_LIST  },
            { label:'Shift',        val:shift,    set:setShift,    opts:SHIFT_LIST    },
            { label:'Kategori',     val:kategori, set:setKategori, opts:KATEGORI_LIST },
            { label:'Lokasi',       val:lokasi,   set:setLokasi,   opts:LOKASI_LIST   },
            { label:'Sub Kategori', val:subkat,   set:setSubkat,   opts:SUBKAT_LIST   },
          ].map(({ label, val, set, opts }) => (
            <div key={label} className={s.selectWrap}>
              <select
                value={val}
                onChange={e => set(e.target.value)}
                className={`${s.select} ${val !== 'all' ? s.selectActive : ''}`}
              >
                <option value="all">{label}</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {activeCount > 0 && (
            <button className={s.resetBtn} onClick={() => {
              setBulan('all'); setStasiun('all'); setShift('all')
              setKategori('all'); setLokasi('all'); setSubkat('all')
            }}>Reset</button>
          )}
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