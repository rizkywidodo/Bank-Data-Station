import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { createClient } from '@supabase/supabase-js'
import Dashboard from './components/Dashboard'
import { SAMPLE_DATA } from './data/sampleData'

const supabase = createClient(
  'https://jcxjufbzblfqobpjobzw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeGp1ZmJ6YmxmcW9icGpvYnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDE5MTQsImV4cCI6MjA5MjI3NzkxNH0.iC5msp9WUC96XX6hegEjxzUZmNQKYyv7KMXcuSYi_WY'
)

const parseRows = (rows) => rows
  .filter(r => r.Name && r.Stasiun)
  .map((r, idx) => ({
    id:           idx + 1,
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
  const [data, setData]       = useState(SAMPLE_DATA)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [lastUpload, setLastUpload] = useState(null)

  useEffect(() => {
    fetchLatest()
  }, [])

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

    const reader = new FileReader()
    reader.onload = async (e) => {
      const wb = XLSX.read(e.target.result, { type: 'array' })
      const ws = wb.Sheets['Sheet1'] || wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })

      await supabase.from('bank_data').insert({ rows })

      setData(parseRows(rows))
      setLastUpload(new Date().toLocaleDateString('id-ID', {
        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }))
      setUploading(false)
    }
    reader.readAsArrayBuffer(file)
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Inter,sans-serif',color:'#6B7280'}}>
      Memuat data...
    </div>
  )

  return <Dashboard data={data} onUpload={handleUpload} uploading={uploading} lastUpload={lastUpload} />
}