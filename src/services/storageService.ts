import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UploadResult {
  url: string;
  storageType: 'supabase' | 'data-url';
  fileName: string;
  fileSize: number;
}

/**
 * Resizes an image file if it exceeds maxDimension (e.g. 1600px) and compresses to WebP/JPEG,
 * ensuring fast loading and efficient localStorage / storage footprint.
 */
export async function optimizeImageFile(file: File, maxDimension = 1600, quality = 0.88): Promise<Blob> {
  return new Promise((resolve, reject) => {
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
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          file.type === 'image/png' ? 'image/png' : 'image/webp',
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
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
 * If Supabase is not configured or fails, falls back seamlessly to an optimized Data URL.
 */
export async function uploadProductImage(file: File, customName?: string): Promise<UploadResult> {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Formato no soportado. Por favor utiliza JPG, PNG, WEBP o AVIF.');
  }

  // Validate size (max 10MB per architecture spec)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('El archivo excede el límite máximo de 10 MB.');
  }

  // Try Supabase Storage first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'webp';
      const cleanBase = (customName || file.name)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const uniquePath = `products/${cleanBase}-${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(uniquePath, file, {
          cacheControl: '3600',
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
          fileSize: file.size
        };
      } else if (error) {
        console.warn('Supabase storage upload error, falling back to local optimized data URL:', error.message);
      }
    } catch (err) {
      console.warn('Error connecting to Supabase storage, falling back to local data URL:', err);
    }
  }

  // Fallback: Optimize and convert to Data URL
  const optimizedBlob = await optimizeImageFile(file, 1400, 0.85);
  const dataUrl = await fileToDataUrl(optimizedBlob);

  return {
    url: dataUrl,
    storageType: 'data-url',
    fileName: file.name,
    fileSize: optimizedBlob.size
  };
}
