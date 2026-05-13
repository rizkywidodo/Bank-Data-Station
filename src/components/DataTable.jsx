import { useState } from 'react'
import s from './DataTable.module.css'

const BADGE = { Safety: s.bSafety, Service: s.bService, Security: s.bSecurity }
const PER_PAGE = 20

function Modal({ entry, onClose }) {
  const [lightbox, setLightbox] = useState(null)
  if (!entry) return null
  const lampiranList = entry.lampiran ? entry.lampiran.split('; ').map(u => u.trim()).filter(Boolean) : []
  const isImage = url => /\.(jpg|jpeg|png|gif|webp)/i.test(url)
  const isVideo = url => /\.(mp4|mov|avi|webm)/i.test(url)

  return (
    <>
      {lightbox && (
        <div className={s.lightbox} onClick={() => setLightbox(null)}>
          <button className={s.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          {isVideo(lightbox)
            ? <video src={lightbox} controls autoPlay className={s.lightboxMedia} onClick={e => e.stopPropagation()} />
            : <img src={lightbox} alt="Lampiran" className={s.lightboxMedia} onClick={e => e.stopPropagation()} />
          }
        </div>
      )}

      <div className={s.overlay} onClick={onClose}>
        <div className={s.modal} onClick={e => e.stopPropagation()}>
          <div className={s.modalHeader}>
            <div>
              <div className={s.modalTitle}>{entry.nama}</div>
              <div className={s.modalMeta}>{entry.tgl} · {entry.stasiun} · Shift {entry.shift}</div>
            </div>
            <button className={s.closeBtn} onClick={onClose}>✕</button>
          </div>

          <div className={s.modalBody}>
            <div className={s.modalRow}>
              <span className={`${s.badge} ${BADGE[entry.kategori]}`}>{entry.kategori}</span>
              <span className={s.modalSub}>{entry.subkategori}</span>
              <span className={s.modalLokasi}>{entry.lokasi}</span>
            </div>

            <div className={s.modalSection}>
              <div className={s.modalLabel}>Deskripsi Highlight</div>
              <div className={s.modalText}>{entry.deskripsi || '—'}</div>
            </div>

            {(entry.jenisGangguan || entry.subkategoriAsli !== entry.subkategori) && (
              <div className={s.modalSection}>
                <div className={s.modalLabel}>Fasilitas yang Terganggu</div>
                <div className={s.modalText}>
                  {entry.jenisGangguan || entry.subkategoriAsli}
                </div>
              </div>
            )}

            <div className={s.modalSection}>
              <div className={s.modalLabel}>Tindak Lanjut</div>
              <div className={s.modalText}>{entry.tindaklanjut || '—'}</div>
            </div>

            {(entry.jenisGangguan || ['Gangguan Gate & Mesin Tiket','Gangguan Lift & Eskalator','Gangguan Sistem Digital','Kerusakan Fisik'].includes(entry.subkategoriAsli)) && (
            <div className={s.modalSection}>
              <div className={s.modalLabel}>Fasilitas yang Terganggu</div>
              <div className={s.modalText}>{entry.jenisGangguan || entry.subkategoriAsli}</div>
            </div>
          )}

            {lampiranList.length > 0 && (
              <div className={s.modalSection}>
                <div className={s.modalLabel}>Lampiran ({lampiranList.length})</div>
                <div className={s.mediaGrid}>
                  {lampiranList.map((url, i) => (
                    <div key={i} className={s.mediaItem}>
                      {isImage(url) ? (
                        <img src={url} alt={`Lampiran ${i+1}`} className={s.mediaImg}
                          onClick={() => setLightbox(url)}
                          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                      ) : isVideo(url) ? (
                        <div className={s.videoThumb} onClick={() => setLightbox(url)}>
                          <video src={url} className={s.mediaImg} style={{pointerEvents:'none'}} />
                          <div className={s.playBtn}>▶</div>
                        </div>
                      ) : null}
                      <a href={url} target="_blank" rel="noreferrer" className={s.mediaFallback}
                        style={{display: isImage(url)||isVideo(url) ? 'none' : 'flex'}}>
                        Buka Lampiran {lampiranList.length > 1 ? i+1 : ''} →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function DataTable({ data }) {
  const [page, setPage]       = useState(1)
  const [sortAsc, setSortAsc] = useState(false)
  const [selected, setSelected] = useState(null)

  const sorted = [...data].sort((a, b) => {
  return sortAsc ? a.id2 - b.id2 : b.id2 - a.id2
})

  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  if (page > totalPages && totalPages > 0) setPage(1)
  const pageData = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <Modal entry={selected} onClose={() => setSelected(null)} />

      <div className={s.card}>
        <div className={s.header}>
          <p className={s.title}>Laporan</p>
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
            <button className={`${s.sortBtn} ${!sortAsc ? s.sortActive : ''}`} onClick={() => { setSortAsc(false); setPage(1) }}>Terbaru</button>
            <button className={`${s.sortBtn} ${sortAsc ? s.sortActive : ''}`}  onClick={() => { setSortAsc(true);  setPage(1) }}>Terlama</button>
            <span className={s.count}>{data.length} entri</span>
          </div>
        </div>

        <div className={s.wrap}>
          <table className={s.table}>
            <thead>
              <tr>{['#','Tgl','Nama AA','Stasiun','Shift','Kategori','Sub Kategori','Lokasi','Deskripsi'].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {sorted.length === 0
                ? <tr><td colSpan={9} className={s.empty}>Tidak ada data</td></tr>
                : pageData.map(d => (
                  <tr key={d.id} className={s.clickableRow} onClick={() => setSelected(d)}>
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

        {totalPages > 1 && (
          <div className={s.pagination}>
            <button className={s.pgBtn} onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
            <span className={s.pgInfo}>Halaman {page} dari {totalPages} · {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, sorted.length)} dari {sorted.length}</span>
            <button className={s.pgBtn} onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
          </div>
        )}
      </div>
    </>
  )
}