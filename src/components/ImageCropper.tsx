'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'

interface Props {
  imageSrc: string
  onSave: (croppedBlob: Blob) => void
  onCancel: () => void
}

// Helper: crop pixel area dari image
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  const ctx = canvas.getContext('2d')!

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas is empty'))
    }, 'image/jpeg', 0.92)
  })
}

export default function ImageCropper({ imageSrc, onSave, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [saving, setSaving] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  async function handleSave() {
    if (!croppedAreaPixels) return
    setSaving(true)
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
      onSave(blob)
    } catch {
      // silent
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
          <h3 className="font-bold text-[#1a1a1a]">Sesuaikan Foto</h3>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-[#f2f2f2] transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Crop area — aspect 3:4 sesuai tampilan anggota */}
        <div className="relative w-full bg-[#1a1a1a]" style={{ height: '360px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-5 py-4 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#6b6b6b] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="flex-1 h-1.5 rounded-full accent-[#1a1a1a] cursor-pointer"
            />
            <svg className="w-5 h-5 text-[#6b6b6b] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-[11px] text-[#6b6b6b] text-center mt-1">Geser untuk zoom · Drag foto untuk posisikan</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4">
          <button onClick={onCancel}
            className="flex-1 py-2.5 border border-[#e5e5e5] rounded-xl text-sm font-semibold hover:bg-[#f2f2f2] transition">
            Batal
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-sm font-bold hover:bg-[#333] transition disabled:opacity-60 flex items-center justify-center gap-2">
            {saving && (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"/>
              </svg>
            )}
            Simpan Foto
          </button>
        </div>
      </div>
    </div>
  )
}
