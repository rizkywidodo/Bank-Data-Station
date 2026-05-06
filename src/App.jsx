import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { createClient } from '@supabase/supabase-js'
import Dashboard from './components/Dashboard'
import { SAMPLE_DATA } from './data/sampleData'

const supabase = createClient(
  'https://jcxjufbzblfqobpjobzw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGp1ZmJ6YmxmcW9icGpvYnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDE5MTQsImV4cCI6MjA5MjI3NzkxNH0.iC5msp9WUC96XX6hegEjxzUZmNQKYyv7KMXcuSYi_WY'
)

const PASSWORD = '@Bandung2026'

const parseRows = (rows) => rows
  .filter(r => r.Name && r.Stasiun)
  .map((r, idx) => ({
    id:  idx + 1,
    id2: parseInt(r['ID2']) || 0,
    tgl: (() => {
      const raw = r['Completion time']
      if (!raw) return ''
      const d = new Date(raw)
      if (isNaN(d)) return raw
      return d.toLocaleDateString('id-ID', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' })
    })(),
    bulan:        r.Bulan || '',
    nama:         r.Name || '',
    stasiun:      r.Stasiun || '',
    shift:        r.Shift || '',
    kategori:     r['Klasifikasi Laporan'] || '',
    subkategori:  r['Sub Kategori'] || '',
    lokasi:       r.Lokasi || '',
    deskripsi:    r['Deskripsi Highlight'] || '',
    tindaklanjut: r['Tindak Lanjut'] || '',
    lampiran:     r.Lampiran || '',
  }))

export default function App() {
  const [auth, setAuth]         = useState(() => sessionStorage.getItem('auth') === 'true')
  const [pw, setPw]             = useState('')
  const [wrong, setWrong]       = useState(false)
  const [data, setData]         = useState(SAMPLE_DATA)
  const [loading, setLoading]   = useState(true)
  const [uploading, setUploading] = useState(false)
  const [lastUpload, setLastUpload] = useState(null)

  useEffect(() => {
    if (auth) fetchLatest()
    else setLoading(false)
  }, [auth])

  function handleLogin(e) {
    e.preventDefault()
    if (pw === PASSWORD) {
      sessionStorage.setItem('auth', 'true')
      setAuth(true)
    } else {
      setWrong(true)
      setPw('')
    }
  }

  async function fetchLatest() {
    setLoading(true)
    const { data: rows } = await supabase
      .from('bank_data')
      .select('rows, uploaded_at')
      .order('uploaded_at', { ascending: false })
      .limit(1)
      .single()
    if (rows?.rows) {
      setData(parseRows(rows.rows))
      setLastUpload(new Date(rows.uploaded_at).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }))
    }
    setLoading(false)
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop().toLowerCase()
    if (ext === 'csv') {
      const text = await file.text()
      const Papa = (await import('papaparse')).default
      const result = Papa.parse(text, { header: true, skipEmptyLines: true })
      await supabase.from('bank_data').insert({ rows: result.data })
      setData(parseRows(result.data))
      setLastUpload(new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }))
      setUploading(false)
      return
    }
    const reader = new FileReader()
    reader.onload = async (e) => {
      const wb = XLSX.read(e.target.result, { type: 'array' })
      const ws = wb.Sheets['Sheet1'] || wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })
      await supabase.from('bank_data').insert({ rows })
      setData(parseRows(rows))
      setLastUpload(new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }))
      setUploading(false)
    }
    reader.readAsArrayBuffer(file)
  }

  if (!auth) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0D1B2A',fontFamily:'Inter,sans-serif'}}>
      <div style={{background:'#fff',borderRadius:16,padding:'40px 48px',width:360,boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
          <div style={{width:36,height:36,borderRadius:8,background:'#0057A8',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg viewBox="0 0 36 36" width="18" height="18" fill="none"><path d="M4 28 L12 8 L18 20 L24 8 L32 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:'#0D1B2A'}}>Banking Data Dashboard</div>
            <div style={{fontSize:11,color:'#6B7280'}}>MRT Jakarta · Internal Tool</div>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:600,color:'#6B7280',textTransform:'uppercase',letterSpacing:'0.07em',display:'block',marginBottom:6}}>Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setWrong(false) }}
              placeholder="Masukkan password"
              style={{width:'100%',padding:'10px 14px',borderRadius:8,border:`1px solid ${wrong?'#CC0000':'#E5E7EB'}`,fontSize:14,outline:'none',fontFamily:'Inter,sans-serif'}}
              autoFocus
            />
            {wrong && <div style={{fontSize:12,color:'#CC0000',marginTop:6}}>Password salah, coba lagi.</div>}
          </div>
          <button type="submit" style={{width:'100%',padding:'10px',borderRadius:8,background:'#0057A8',color:'#fff',border:'none',fontSize:14,fontWeight:600,cursor:'pointer'}}>
            Masuk
          </button>
        </form>
        <div style={{fontSize:11,color:'#9CA3AF',textAlign:'center',marginTop:20}}>© 2026 MRT Jakarta · Region 1</div>
      </div>
    </div>
  )

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Inter,sans-serif',color:'#6B7280'}}>
      Memuat data...
    </div>
  )

  return <Dashboard data={data} onUpload={handleUpload} uploading={uploading} lastUpload={lastUpload} />
}