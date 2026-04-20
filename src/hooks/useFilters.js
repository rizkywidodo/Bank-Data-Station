import { useState, useMemo } from 'react'

export function useFilters(data) {
  const [bulan,    setBulan]    = useState('all')
  const [stasiun,  setStasiun]  = useState('all')
  const [shift,    setShift]    = useState('all')
  const [kategori, setKategori] = useState('all')
  const [nama,     setNama]     = useState('all')
  const [lokasi,   setLokasi]   = useState('all')
  const [subkat,   setSubkat]   = useState('all')

  const filtered = useMemo(() => data.filter(d =>
    (bulan    === 'all' || d.bulan       === bulan)    &&
    (stasiun  === 'all' || d.stasiun     === stasiun)  &&
    (shift    === 'all' || d.shift       === shift)    &&
    (kategori === 'all' || d.kategori    === kategori) &&
    (nama     === 'all' || d.nama        === nama)     &&
    (lokasi   === 'all' || d.lokasi      === lokasi)   &&
    (subkat   === 'all' || d.subkategori === subkat)
  ), [data, bulan, stasiun, shift, kategori, nama, lokasi, subkat])

  return {
    filters: { bulan, stasiun, shift, kategori, nama, lokasi, subkat },
    setters: { setBulan, setStasiun, setShift, setKategori, setNama, setLokasi, setSubkat },
    filtered,
  }
}

export function countBy(arr, key) {
  return arr.reduce((acc, d) => { acc[d[key]] = (acc[d[key]] || 0) + 1; return acc }, {})
}

export function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}