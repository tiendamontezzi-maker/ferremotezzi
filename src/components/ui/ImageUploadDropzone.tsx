import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, X, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { uploadProductImage, UploadResult } from '../../services/storageService';

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  productCode?: string;
  label?: string;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  productCode,
  label = 'Fotografía Oficial de la Referencia'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<UploadResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setErrorMsg(null);
    setIsUploading(true);

    try {
      const result = await uploadProductImage(file, productCode || 'montezzi-ref');
      setUploadInfo(result);
      onChange(result.url);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al procesar la imagen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await handleProcessFile(file);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await handleProcessFile(file);
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="text-obsidian/80 uppercase tracking-wider font-bold text-xs flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-black" />
          <span>{label} *</span>
        </label>
        <div className="flex items-center gap-1 text-[11px] font-sans">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-xs transition-colors ${
              mode === 'upload'
                ? 'bg-black text-white font-bold'
                : 'text-obsidian/60 hover:text-black'
            }`}
          >
            Subir Archivo
          </button>
          <span className="text-black/20">·</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-xs transition-colors ${
              mode === 'url'
                ? 'bg-black text-white font-bold'
                : 'text-obsidian/60 hover:text-black'
            }`}
          >
            URL Externa / Catálogo
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <div className="space-y-2">
          <div className="relative">
            <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-obsidian/40" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... o /images/products/kdj-60.jpg"
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD6C8] text-xs text-obsidian rounded-xs focus:border-black focus:outline-none font-mono"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-obsidian/60">
            <span>Ejemplos rápidos:</span>
            {['/images/products/kdj-60.jpg', '/images/products/kdj-90.jpg', '/images/products/kdj-103.jpg'].map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => onChange(demo)}
                className="underline hover:text-black"
              >
                {demo.split('/').pop()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {value ? (
            /* Image Preview Card */
            <div className="relative p-3 bg-white border border-black/15 rounded-sm flex items-center gap-4 group">
              <div className="w-20 h-20 bg-[#F5F4F0] rounded-xs border border-black/10 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={value}
                  alt="Vista previa"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/kdj-60.jpg';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-obsidian truncate">
                    {uploadInfo?.fileName || 'Imagen cargada correctamente'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-obsidian/60">
                  <span className="font-mono bg-black/5 px-1.5 py-0.5 rounded">
                    {uploadInfo?.storageType === 'supabase' ? 'Supabase Storage CDN' : 'Almacenamiento Local Optimizado'}
                  </span>
                  {uploadInfo && (
                    <span>{(uploadInfo.fileSize / 1024).toFixed(1)} KB</span>
                  )}
                </div>
                <p className="text-[10px] text-obsidian/40 truncate font-mono">
                  {value.startsWith('data:') ? 'data:image/... [Base64]' : value}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Reemplazar imagen"
                  className="p-1.5 text-obsidian/60 hover:text-black hover:bg-black/5 rounded"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setUploadInfo(null);
                  }}
                  title="Eliminar imagen"
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop Area */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-sm text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-black bg-black/[0.04] scale-[0.99]'
                  : 'border-[#DDD6C8] hover:border-black/50 bg-[#FAF9F7]'
              }`}
            >
              {isUploading ? (
                <div className="space-y-2 py-3">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-obsidian font-bold">Procesando y optimizando imagen...</p>
                  <p className="text-[10px] text-obsidian/50">Ajustando resolución y preparando carga</p>
                </div>
              ) : (
                <div className="space-y-2 py-2">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mx-auto text-black">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-obsidian block">
                      Haz clic para examinar o arrastra una imagen aquí
                    </span>
                    <span className="text-[10px] text-obsidian/50 block mt-0.5">
                      JPG, PNG, WEBP o AVIF (hasta 10 MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/avif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-600 bg-red-50 p-2 rounded-xs border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
