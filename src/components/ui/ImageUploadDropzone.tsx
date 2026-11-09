import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Link as LinkIcon,
  RefreshCw,
  Star,
  Plus,
  Sparkles
} from 'lucide-react';
import {
  uploadProductImage,
  uploadMultipleProductImages,
  UploadResult
} from '../../services/storageService';

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  galleryUrls?: string[];
  onGalleryChange?: (urls: string[]) => void;
  productCode?: string;
  label?: string;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  galleryUrls = [],
  onGalleryChange,
  productCode,
  label = 'Fotografías Oficiales del Producto (Subida Ilimitada · Supabase Storage)'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [lastUploads, setLastUploads] = useState<UploadResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Build normalized gallery list that always includes `value` if present
  const normalizedGallery = React.useMemo(() => {
    const list: string[] = [];
    if (value && value.trim()) {
      list.push(value.trim());
    }
    for (const u of galleryUrls) {
      if (u && u.trim() && !list.includes(u.trim())) {
        list.push(u.trim());
      }
    }
    return list;
  }, [value, galleryUrls]);

  const updateGalleryAndPrimary = (newList: string[], preferredPrimary?: string) => {
    const clean = newList.filter(Boolean);
    const primary =
      preferredPrimary && clean.includes(preferredPrimary)
        ? preferredPrimary
        : clean[0] || '';
    // Put primary first in gallery_urls for consistency
    const ordered = primary
      ? [primary, ...clean.filter((u) => u !== primary)]
      : clean;
    onChange(primary);
    onGalleryChange?.(ordered);
  };

  const handleProcessMultipleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setErrorMsg(null);
    setIsUploading(true);
    setUploadProgress({ done: 0, total: files.length });

    try {
      const results = await uploadMultipleProductImages(
        files,
        productCode || 'montezzi-ref',
        (done, total) => setUploadProgress({ done, total })
      );

      setLastUploads(results);
      const uploadedUrls = results.map((r) => r.url);

      // If current image is a generic local fallback placeholder when uploading the first real Supabase photo,
      // make the newly uploaded photo the primary cover automatically!
      const isCurrentPlaceholder =
        !value || value === '/images/products/kdj-60.jpg';

      const combined = isCurrentPlaceholder
        ? [...uploadedUrls, ...normalizedGallery.filter((u) => u !== '/images/products/kdj-60.jpg')]
        : [...normalizedGallery, ...uploadedUrls];

      const newPrimary = isCurrentPlaceholder ? uploadedUrls[0] : uploadedUrls[0] || value;
      updateGalleryAndPrimary(combined, newPrimary);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al subir las fotografías.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleReplaceSingleFile = async (file: File, targetIdx: number) => {
    setErrorMsg(null);
    setIsUploading(true);
    setUploadProgress({ done: 0, total: 1 });

    try {
      const res = await uploadProductImage(file, productCode || 'montezzi-ref');
      setLastUploads([res]);

      const next = [...normalizedGallery];
      const oldUrl = next[targetIdx];
      next[targetIdx] = res.url;

      const newPrimary = oldUrl === value || targetIdx === 0 ? res.url : value;
      updateGalleryAndPrimary(next, newPrimary);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al reemplazar la fotografía.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      setReplaceIndex(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleProcessMultipleFiles(e.dataTransfer.files);
    }
  };

  const handleMultiFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleProcessMultipleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleReplaceFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && replaceIndex !== null) {
      await handleReplaceSingleFile(e.target.files[0], replaceIndex);
      e.target.value = '';
    }
  };

  const handleAddExternalUrl = () => {
    const trimmed = externalUrlInput.trim();
    if (!trimmed) return;
    const next = [...normalizedGallery, trimmed];
    updateGalleryAndPrimary(next, !value ? trimmed : value);
    setExternalUrlInput('');
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const remaining = normalizedGallery.filter((u) => u !== urlToRemove);
    const nextPrimary = urlToRemove === value ? remaining[0] || '' : value;
    updateGalleryAndPrimary(remaining, nextPrimary);
  };

  const handleSetPrimary = (urlToPromote: string) => {
    updateGalleryAndPrimary(normalizedGallery, urlToPromote);
  };

  const totalCompressedKB = lastUploads.reduce((acc, u) => acc + u.fileSize, 0) / 1024;
  const totalOriginalKB = lastUploads.reduce((acc, u) => acc + u.originalSize, 0) / 1024;

  return (
    <div className="space-y-3">
      {/* Header & Action Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-[#18181B] font-bold text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#18181B]" />
          <span>{label}</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-mono text-[10px] font-semibold">
            {normalizedGallery.length} {normalizedGallery.length === 1 ? 'foto' : 'fotos'}
          </span>
        </label>

        <div className="flex items-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            className="px-3 py-1 rounded-full bg-[#18181B] text-white font-semibold hover:bg-black transition-all flex items-center gap-1 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Subir Fotografías</span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput((prev) => !prev)}
            className="px-3 py-1 rounded-full bg-[#F4F4F5] text-[#52525B] hover:text-[#18181B] hover:bg-[#EAEAEA] font-medium transition-all flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Ocultar URL' : 'Añadir por URL'}</span>
          </button>
        </div>
      </div>

      {/* ALWAYS VISIBLE Drag & Drop Multi-Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => multiFileInputRef.current?.click()}
        className={`p-5 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#18181B] bg-[#18181B]/[0.04] scale-[0.99]'
            : 'border-[#D4D4D8] hover:border-[#18181B] bg-[#FAF9F7] hover:bg-[#F4F4F5]/70'
        }`}
      >
        {isUploading ? (
          <div className="space-y-2 py-2">
            <div className="w-7 h-7 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#18181B] font-bold">
              Comprimiendo a WebP ligero y subiendo a Supabase Storage...
              {uploadProgress ? ` (${uploadProgress.done}/${uploadProgress.total})` : ''}
            </p>
            <p className="text-[11px] text-[#71717A]">
              Optimizando automáticamente (~45 KB por foto) para mantener el Plan Free de Supabase
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 py-1">
            <div className="w-11 h-11 rounded-2xl bg-[#18181B] text-white flex items-center justify-center shrink-0 shadow-xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-[#18181B] block">
                Haz clic aquí o arrastra todas las fotografías que quieras (Sin límite de cantidad)
              </span>
              <span className="text-[11px] text-[#71717A] block mt-0.5">
                Selecciona 1 o múltiples fotos a la vez (JPG, PNG, WEBP, AVIF). Se comprimen automáticamente a WebP (~45 KB) en Supabase Storage.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={multiFileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleMultiFileChange}
        className="hidden"
      />
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleReplaceFileChange}
        className="hidden"
      />

      {/* Optional External URL Adder */}
      {showUrlInput && (
        <div className="p-3 bg-[#FAF9F7] border border-[#EAE7E1] rounded-xl space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#71717A]" />
              <input
                type="text"
                value={externalUrlInput}
                onChange={(e) => setExternalUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddExternalUrl();
                  }
                }}
                placeholder="Pega una URL de imagen (https://... o /images/products/kdj-60.jpg)"
                className="w-full pl-8 pr-3 py-2 bg-white border border-[#E4E4E7] text-xs text-[#18181B] rounded-xl focus:border-black focus:outline-none font-mono"
              />
            </div>
            <button
              type="button"
              onClick={handleAddExternalUrl}
              className="px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
            >
              Añadir Foto
            </button>
          </div>
        </div>
      )}

      {/* Compression & Storage Feedback Banner */}
      {lastUploads.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-[11px] text-[#065F46]">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
            <span>
              {lastUploads.length === 1
                ? '1 fotografía subida a Supabase Storage CDN'
                : `${lastUploads.length} fotografías subidas a Supabase Storage CDN`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
            <Sparkles className="w-3 h-3 text-[#059669]" />
            <span>
              {totalOriginalKB > 0
                ? `${totalOriginalKB.toFixed(0)} KB → ${totalCompressedKB.toFixed(1)} KB WebP`
                : `${totalCompressedKB.toFixed(1)} KB WebP`}
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-2 text-xs text-[#EF4444] bg-[#FEF2F2] p-3 rounded-xl border border-[#FECACA]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Gallery Grid of All Product Photos */}
      {normalizedGallery.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#71717A]">
            <span>
              Galería activa de la referencia (haz clic en <strong>Portada</strong> para elegir la foto principal o en el ícono de cámara para reemplazar):
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {normalizedGallery.map((imgUrl, idx) => {
              const isPrimary = imgUrl === value || (idx === 0 && !value);
              const isSupabaseUrl = imgUrl.includes('supabase.co/storage');

              return (
                <div
                  key={`${imgUrl}-${idx}`}
                  className={`relative group rounded-2xl border p-2 bg-white transition-all flex flex-col justify-between ${
                    isPrimary
                      ? 'border-[#18181B] ring-2 ring-[#18181B]/10 shadow-sm'
                      : 'border-[#EAE7E1] hover:border-[#18181B]/40'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-1.5 z-10">
                    {isPrimary ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#18181B] text-white text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        Portada
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(imgUrl)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F4F4F5] hover:bg-[#18181B] text-[#52525B] hover:text-white text-[10px] font-semibold transition-colors"
                        title="Usar esta fotografía como foto principal del producto"
                      >
                        <Star className="w-2.5 h-2.5" />
                        Hacer Portada
                      </button>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceIndex(idx);
                          replaceFileInputRef.current?.click();
                        }}
                        title="Reemplazar esta fotografía"
                        className="p-1 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgUrl)}
                        title="Eliminar fotografía"
                        className="p-1 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Thumbnail */}
                  <div
                    onClick={() => handleSetPrimary(imgUrl)}
                    className="aspect-square w-full bg-[#FAF9F7] rounded-xl overflow-hidden flex items-center justify-center p-2 cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/products/kdj-60.jpg';
                      }}
                    />
                  </div>

                  {/* Storage Source Footer */}
                  <div className="mt-1.5 flex items-center justify-between text-[9px] text-[#71717A] font-mono px-0.5">
                    <span className="truncate">
                      {isSupabaseUrl ? '☁️ Supabase CDN' : 'Catálogo Local'}
                    </span>
                    <span>#{idx + 1}</span>
                  </div>
                </div>
              );
            })}

            {/* Add More Tile inside Grid */}
            <button
              type="button"
              onClick={() => multiFileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-[#D4D4D8] hover:border-[#18181B] bg-[#FAF9F7] hover:bg-[#F4F4F5] flex flex-col items-center justify-center gap-1.5 p-3 text-[#71717A] hover:text-[#18181B] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-[#E4E4E7] flex items-center justify-center shadow-2xs">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold">Añadir más fotos</span>
              <span className="text-[9px] text-[#A1A1AA]">Sin límite</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
