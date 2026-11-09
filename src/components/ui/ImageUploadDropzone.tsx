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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GripVertical
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
  onAutoSave?: (primaryUrl: string, orderedGallery: string[]) => void | Promise<void>;
  productCode?: string;
  label?: string;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  value,
  onChange,
  galleryUrls = [],
  onGalleryChange,
  onAutoSave,
  productCode,
  label = 'Fotografías Oficiales del Producto (Subida Ilimitada · Supabase Storage)'
}) => {
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [lastUploads, setLastUploads] = useState<UploadResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  // Drag & Drop state for reordering gallery cards
  const [draggedCardIdx, setDraggedCardIdx] = useState<number | null>(null);
  const [dragOverCardIdx, setDragOverCardIdx] = useState<number | null>(null);

  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Preserve exact galleryUrls order while ensuring `value` is included if not already present
  const normalizedGallery = React.useMemo(() => {
    const list: string[] = [];
    for (const u of galleryUrls) {
      if (u && u.trim() && !list.includes(u.trim())) {
        list.push(u.trim());
      }
    }
    if (value && value.trim() && !list.includes(value.trim())) {
      list.unshift(value.trim());
    }
    return list;
  }, [value, galleryUrls]);

  // Apply exact gallery order AND chosen primary cover, and trigger immediate auto-save if provided
  const applyGalleryState = (orderedList: string[], chosenPrimary?: string) => {
    const clean = orderedList.filter(Boolean);
    const primary =
      chosenPrimary && clean.includes(chosenPrimary)
        ? chosenPrimary
        : value && clean.includes(value)
        ? value
        : clean[0] || '';
    onChange(primary);
    onGalleryChange?.(clean);
    onAutoSave?.(primary, clean);
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

      // If the current cover is empty or is still a default local catalog placeholder (/images/products/kdj-*.jpg),
      // place the newly uploaded photos first and make the first uploaded photo the new Portada automatically!
      const isOnlyLocalDefault =
        !value ||
        (value.startsWith('/images/products/') &&
          normalizedGallery.every((u) => u.startsWith('/images/products/')));

      const combined = isOnlyLocalDefault
        ? [...uploadedUrls, ...normalizedGallery]
        : [...normalizedGallery, ...uploadedUrls];

      const newPrimary = isOnlyLocalDefault ? uploadedUrls[0] : value || uploadedUrls[0];

      applyGalleryState(combined, newPrimary);
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
      applyGalleryState(next, newPrimary);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error al reemplazar la fotografía.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      setReplaceIndex(null);
    }
  };

  // File Dropzone handlers
  const handleFileDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCardIdx === null) {
      setIsDraggingFile(true);
    }
  };

  const handleFileDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleFileDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    if (draggedCardIdx !== null) return;
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
    applyGalleryState(next, !value ? trimmed : value);
    setExternalUrlInput('');
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const remaining = normalizedGallery.filter((u) => u !== urlToRemove);
    const nextPrimary = urlToRemove === value ? remaining[0] || '' : value;
    applyGalleryState(remaining, nextPrimary);
  };

  // Set any photo as the Cover Photo (Portada)
  const handleSetPrimary = (urlToPromote: string) => {
    applyGalleryState(normalizedGallery, urlToPromote);
  };

  // Move photo from `fromIndex` to `toIndex`
  const handleMovePhoto = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= normalizedGallery.length ||
      toIndex >= normalizedGallery.length ||
      fromIndex === toIndex
    ) {
      return;
    }
    const next = [...normalizedGallery];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    applyGalleryState(next, value);
  };

  // Card Drag & Drop Reorder handlers
  const handleCardDragStart = (e: DragEvent<HTMLDivElement>, idx: number) => {
    setDraggedCardIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const handleCardDragOver = (e: DragEvent<HTMLDivElement>, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCardIdx === null || draggedCardIdx === idx) return;
    setDragOverCardIdx(idx);
  };

  const handleCardDrop = (e: DragEvent<HTMLDivElement>, targetIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCardIdx !== null && draggedCardIdx !== targetIdx) {
      handleMovePhoto(draggedCardIdx, targetIdx);
    }
    setDraggedCardIdx(null);
    setDragOverCardIdx(null);
  };

  const handleCardDragEnd = () => {
    setDraggedCardIdx(null);
    setDragOverCardIdx(null);
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
            className="px-3 py-1 rounded-full bg-[#18181B] text-white font-semibold hover:bg-black transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Subir Fotografías</span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput((prev) => !prev)}
            className="px-3 py-1 rounded-full bg-[#F4F4F5] text-[#52525B] hover:text-[#18181B] hover:bg-[#EAEAEA] font-medium transition-all flex items-center gap-1 cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Ocultar URL' : 'Añadir por URL'}</span>
          </button>
        </div>
      </div>

      {/* ALWAYS VISIBLE Drag & Drop Multi-Upload Zone */}
      <div
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
        onDrop={handleFileDrop}
        onClick={() => multiFileInputRef.current?.click()}
        className={`p-5 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
          isDraggingFile
            ? 'border-[#18181B] bg-[#18181B]/[0.04] scale-[0.99]'
            : 'border-[#D4D4D8] hover:border-[#18181B] bg-white hover:bg-[#F4F4F5]/60'
        }`}
      >
        {isUploading ? (
          <div className="space-y-2 py-2">
            <div className="w-7 h-7 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#18181B] font-bold">
              Comprimiendo y guardando en Supabase Storage...
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
                Al subir, reordenar o elegir Portada, los cambios se guardan automáticamente en Supabase.
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
        <div className="p-3 bg-white border border-[#EAE7E1] rounded-xl space-y-2">
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
                className="w-full pl-8 pr-3 py-2 bg-[#FAF9F7] border border-[#E4E4E7] text-xs text-[#18181B] rounded-xl focus:border-black focus:outline-none font-mono"
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
                ? '¡1 fotografía subida y sincronizada en Supabase!'
                : `¡${lastUploads.length} fotografías subidas y sincronizadas en Supabase!`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
            <Sparkles className="w-3 h-3 text-[#059669]" />
            <span>
              {totalOriginalKB > 0
                ? `${totalOriginalKB.toFixed(0)} KB → ${totalCompressedKB.toFixed(1)} KB`
                : `${totalCompressedKB.toFixed(1)} KB`}
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

      {/* Reorderable Gallery Grid */}
      {normalizedGallery.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#52525B] bg-white px-3.5 py-2 rounded-xl border border-[#EAE7E1]">
            <span className="flex items-center gap-1.5">
              <GripVertical className="w-3.5 h-3.5 text-[#18181B]" />
              <span>
                <strong>Ordenar y elegir Portada:</strong> Arrastra las tarjetas, usa las flechas <strong>◀ ▶</strong> o cambia el número de orden. Elige cualquier foto como <strong>★ Portada</strong>.
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {normalizedGallery.map((imgUrl, idx) => {
              const isPrimary = imgUrl === value || (idx === 0 && !value);
              const isSupabaseUrl = imgUrl.includes('supabase.co/storage');
              const isBeingDragged = draggedCardIdx === idx;
              const isDropTarget = dragOverCardIdx === idx && draggedCardIdx !== idx;

              return (
                <div
                  key={`${imgUrl}-${idx}`}
                  draggable
                  onDragStart={(e) => handleCardDragStart(e, idx)}
                  onDragOver={(e) => handleCardDragOver(e, idx)}
                  onDrop={(e) => handleCardDrop(e, idx)}
                  onDragEnd={handleCardDragEnd}
                  className={`relative group rounded-2xl border p-2.5 bg-white transition-all flex flex-col justify-between select-none ${
                    isBeingDragged
                      ? 'opacity-40 scale-95 border-dashed border-[#18181B]'
                      : isDropTarget
                      ? 'border-[#059669] ring-2 ring-[#059669]/30 bg-[#ECFDF5]/30 scale-[1.02]'
                      : isPrimary
                      ? 'border-[#18181B] ring-2 ring-[#18181B]/15 shadow-md'
                      : 'border-[#EAE7E1] hover:border-[#18181B]/40 shadow-2xs'
                  }`}
                >
                  {/* Top Bar: Cover Badge + Replace / Delete */}
                  <div className="flex items-center justify-between gap-1 mb-1.5 z-10">
                    {isPrimary ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#18181B] text-white text-[10px] font-bold shadow-2xs">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        Portada Principal
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(imgUrl)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F4F4F5] hover:bg-[#18181B] text-[#52525B] hover:text-white text-[10px] font-semibold transition-colors cursor-pointer"
                        title="Marcar esta fotografía como la Portada principal del producto"
                      >
                        <Star className="w-2.5 h-2.5" />
                        Elegir Portada
                      </button>
                    )}

                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceIndex(idx);
                          replaceFileInputRef.current?.click();
                        }}
                        title="Reemplazar esta fotografía"
                        className="p-1 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgUrl)}
                        title="Eliminar fotografía"
                        className="p-1 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Preview (Draggable + Click to set cover) */}
                  <div
                    onClick={() => handleSetPrimary(imgUrl)}
                    title="Haz clic para elegir como Portada o arrastra para cambiar el orden"
                    className="relative aspect-square w-full bg-[#FAF9F7] rounded-xl overflow-hidden flex items-center justify-center p-2 cursor-grab active:cursor-grabbing border border-[#F0EFEA]"
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      draggable={false}
                      className="w-full h-full object-contain pointer-events-none"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/products/kdj-60.jpg';
                      }}
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/75 text-white font-mono text-[9px] font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Reorder Controls: Prev (◀) | Position Selector | Next (▶) */}
                  <div className="mt-2 pt-1.5 border-t border-[#F4F4F5] flex items-center justify-between gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMovePhoto(idx, idx - 1)}
                      title="Mover una posición antes"
                      className={`p-1 rounded-lg border transition-colors ${
                        idx === 0
                          ? 'border-transparent text-[#D4D4D8] cursor-not-allowed'
                          : 'border-[#E4E4E7] bg-[#FAF9F7] hover:bg-[#18181B] text-[#18181B] hover:text-white cursor-pointer'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    {/* Direct Order Selector */}
                    <div className="flex items-center gap-1 text-[10px] text-[#52525B]">
                      <span className="text-[9px] text-[#71717A]">Orden:</span>
                      <select
                        value={idx}
                        onChange={(e) => handleMovePhoto(idx, Number(e.target.value))}
                        title="Cambiar posición directamente"
                        className="bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-md focus:outline-none cursor-pointer"
                      >
                        {normalizedGallery.map((_, posIdx) => (
                          <option key={posIdx} value={posIdx}>
                            #{posIdx + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      disabled={idx === normalizedGallery.length - 1}
                      onClick={() => handleMovePhoto(idx, idx + 1)}
                      title="Mover una posición después"
                      className={`p-1 rounded-lg border transition-colors ${
                        idx === normalizedGallery.length - 1
                          ? 'border-transparent text-[#D4D4D8] cursor-not-allowed'
                          : 'border-[#E4E4E7] bg-[#FAF9F7] hover:bg-[#18181B] text-[#18181B] hover:text-white cursor-pointer'
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Storage Source Footer */}
                  <div className="mt-1 flex items-center justify-between text-[9px] text-[#A1A1AA] font-mono px-0.5">
                    <span className="truncate">
                      {isSupabaseUrl ? '☁️ Supabase CDN' : 'Catálogo Local'}
                    </span>
                    {isPrimary && (
                      <span className="text-[#059669] font-sans font-semibold">★ Portada</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add More Tile inside Grid */}
            <button
              type="button"
              onClick={() => multiFileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-[#D4D4D8] hover:border-[#18181B] bg-white hover:bg-[#F4F4F5] flex flex-col items-center justify-center gap-1.5 p-3 text-[#71717A] hover:text-[#18181B] transition-all cursor-pointer min-h-[180px]"
            >
              <div className="w-9 h-9 rounded-full bg-[#FAF9F7] border border-[#E4E4E7] flex items-center justify-center shadow-2xs">
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
