import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UploadResult {
  url: string;
  storageType: 'supabase' | 'data-url';
  fileName: string;
  fileSize: number;
  originalSize: number;
}

/**
 * Resizes an image file if it exceeds maxDimension (default 1280px) and compresses to WebP,
 * shrinking 5-10 MB photos down to ~35-65 KB so Supabase Free Plan (1 GB) can store 15,000+ photos.
 */
export async function optimizeImageFile(
  file: File,
  maxDimension = 1280,
  quality = 0.82
): Promise<{ blob: Blob; mimeType: string; ext: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ blob: file, mimeType: file.type || 'image/jpeg', ext: 'jpg' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for maximum compression (~45 KB per photo) and transparency support
        canvas.toBlob(
          (webpBlob) => {
            if (webpBlob && webpBlob.size > 0) {
              resolve({ blob: webpBlob, mimeType: 'image/webp', ext: 'webp' });
            } else {
              // Fallback to JPEG if browser does not encode WebP
              canvas.toBlob(
                (jpegBlob) => {
                  if (jpegBlob && jpegBlob.size > 0) {
                    resolve({ blob: jpegBlob, mimeType: 'image/jpeg', ext: 'jpg' });
                  } else {
                    resolve({ blob: file, mimeType: file.type || 'image/jpeg', ext: 'jpg' });
                  }
                },
                'image/jpeg',
                quality
              );
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => {
        resolve({ blob: file, mimeType: file.type || 'image/jpeg', ext: 'jpg' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve({ blob: file, mimeType: file.type || 'image/jpeg', ext: 'jpg' });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Convert a File or Blob into a Base64 Data URL
 */
export function fileToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Upload an image file to Supabase Storage bucket 'product-images'.
 * Always compresses on the client first (~35-65 KB WebP) to preserve Supabase Free Tier storage.
 */
export async function uploadProductImage(file: File, customName?: string): Promise<UploadResult> {
  const isImage =
    file.type.startsWith('image/') ||
    /\.(jpe?g|png|webp|avif|gif|heic|heif|bmp|svg)$/i.test(file.name);

  if (!isImage) {
    throw new Error('Formato no válido. Selecciona archivos de imagen (JPG, PNG, WEBP, AVIF, etc.).');
  }

  if (file.size > 30 * 1024 * 1024) {
    throw new Error('El archivo original supera los 30 MB.');
  }

  const originalSize = file.size;

  // 1. Compress & convert to lightweight WebP before uploading to Supabase Storage
  const { blob: optimizedBlob, mimeType, ext } = await optimizeImageFile(file, 1280, 0.82);

  // 2. Upload to Supabase Storage bucket 'product-images'
  if (isSupabaseConfigured && supabase) {
    try {
      const baseName = (customName || file.name.replace(/\.[^/.]+$/, ''))
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '');

      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const uniquePath = `products/${baseName || 'montezzi'}-${Date.now()}-${randomSuffix}.${ext}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(uniquePath, optimizedBlob, {
          contentType: mimeType,
          cacheControl: '31536000',
          upsert: true
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(data.path);

        return {
          url: publicUrlData.publicUrl,
          storageType: 'supabase',
          fileName: file.name,
          fileSize: optimizedBlob.size,
          originalSize
        };
      } else if (error) {
        console.warn('Supabase storage upload warning, falling back to optimized Data URL:', error.message);
      }
    } catch (err) {
      console.warn('Error connecting to Supabase storage, falling back to Data URL:', err);
    }
  }

  // Fallback: Convert optimized WebP blob to Data URL
  const dataUrl = await fileToDataUrl(optimizedBlob);

  return {
    url: dataUrl,
    storageType: 'data-url',
    fileName: file.name,
    fileSize: optimizedBlob.size,
    originalSize
  };
}

/**
 * Upload multiple product images in parallel with progress callback (unlimited count)
 */
export async function uploadMultipleProductImages(
  files: FileList | File[],
  customName?: string,
  onProgress?: (completed: number, total: number) => void
): Promise<UploadResult[]> {
  const fileArray = Array.from(files);
  const total = fileArray.length;
  let completed = 0;

  const results: UploadResult[] = [];
  // Upload in batches of 4 for fast parallel throughput without saturating connection
  const batchSize = 4;
  for (let i = 0; i < fileArray.length; i += batchSize) {
    const batch = fileArray.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (file, idx) => {
        const res = await uploadProductImage(file, `${customName || 'montezzi'}-${i + idx + 1}`);
        completed += 1;
        onProgress?.(completed, total);
        return res;
      })
    );
    results.push(...batchResults);
  }

  return results;
}
