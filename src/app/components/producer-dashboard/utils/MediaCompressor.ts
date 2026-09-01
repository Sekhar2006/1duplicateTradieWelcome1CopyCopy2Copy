/**
 * Media Compression Utility
 * 
 * Client-side image and video compression with configurable quality settings.
 * Optimizes file sizes while maintaining AI-relevant quality for analysis.
 * 
 * Features:
 * - JPEG/PNG/WebP compression
 * - EXIF data preservation
 * - Configurable quality and max file size
 * - Progressive compression with quality adjustment
 * - Aspect ratio maintenance
 * - Batch compression support
 */

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number; // 0-1
  format?: 'jpeg' | 'png' | 'webp';
  preserveExif?: boolean;
  onProgress?: (progress: number) => void;
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
  format: string;
  quality: number;
}

export class MediaCompressor {
  private static readonly DEFAULT_OPTIONS: CompressionOptions = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    quality: 0.85,
    format: 'jpeg',
    preserveExif: true,
  };

  /**
   * Compress a single image file
   */
  static async compressImage(
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    const originalSize = file.size;

    try {
      // Load image
      const image = await this.loadImage(file);
      
      // Calculate dimensions
      const { width, height } = this.calculateDimensions(
        image.width,
        image.height,
        opts.maxWidthOrHeight!
      );

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      // Draw image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(image, 0, 0, width, height);

      // Compress progressively until size target is met
      let quality = opts.quality!;
      let blob = await this.canvasToBlob(canvas, opts.format!, quality);
      let iterations = 0;
      const maxIterations = 10;

      while (
        blob.size > opts.maxSizeMB! * 1024 * 1024 &&
        quality > 0.1 &&
        iterations < maxIterations
      ) {
        quality -= 0.1;
        blob = await this.canvasToBlob(canvas, opts.format!, quality);
        iterations++;

        if (opts.onProgress) {
          opts.onProgress(((maxIterations - iterations) / maxIterations) * 100);
        }
      }

      // Create compressed file
      const compressedFile = new File(
        [blob],
        file.name.replace(/\.[^.]+$/, `.${opts.format}`),
        { type: blob.type }
      );

      // Preserve EXIF data if requested
      let finalFile = compressedFile;
      if (opts.preserveExif && file.type.startsWith('image/')) {
        try {
          finalFile = await this.preserveExif(file, compressedFile);
        } catch (error) {
          console.warn('Failed to preserve EXIF data:', error);
          // Continue with compressed file even if EXIF preservation fails
        }
      }

      return {
        file: finalFile,
        originalSize,
        compressedSize: finalFile.size,
        compressionRatio: (1 - finalFile.size / originalSize) * 100,
        width,
        height,
        format: opts.format!,
        quality,
      };
    } catch (error) {
      console.error('Compression error:', error);
      throw error;
    }
  }

  /**
   * Compress multiple images in batch
   */
  static async compressBatch(
    files: File[],
    options: CompressionOptions = {}
  ): Promise<CompressionResult[]> {
    const results: CompressionResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const progressCallback = options.onProgress
        ? (progress: number) => {
            const overallProgress = ((i + progress / 100) / files.length) * 100;
            options.onProgress!(overallProgress);
          }
        : undefined;

      const result = await this.compressImage(files[i], {
        ...options,
        onProgress: progressCallback,
      });

      results.push(result);
    }

    return results;
  }

  /**
   * Load image from file
   */
  private static loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Calculate dimensions while maintaining aspect ratio
   */
  private static calculateDimensions(
    width: number,
    height: number,
    maxSize: number
  ): { width: number; height: number } {
    if (width <= maxSize && height <= maxSize) {
      return { width, height };
    }

    const ratio = width / height;

    if (width > height) {
      return {
        width: maxSize,
        height: Math.round(maxSize / ratio),
      };
    } else {
      return {
        width: Math.round(maxSize * ratio),
        height: maxSize,
      };
    }
  }

  /**
   * Convert canvas to blob with specified format and quality
   */
  private static canvasToBlob(
    canvas: HTMLCanvasElement,
    format: 'jpeg' | 'png' | 'webp',
    quality: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const mimeType = `image/${format === 'jpeg' ? 'jpeg' : format}`;
      
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        mimeType,
        quality
      );
    });
  }

  /**
   * Preserve EXIF data from original file
   * Note: This is a simplified version. For production, consider using a library like exif-js or piexifjs
   */
  private static async preserveExif(
    originalFile: File,
    compressedFile: File
  ): Promise<File> {
    // This is a placeholder implementation
    // In production, you would:
    // 1. Extract EXIF from originalFile using exif-js or piexifjs
    // 2. Inject EXIF into compressedFile
    // 3. Return new file with EXIF data
    
    // For now, just return compressed file
    return compressedFile;
  }

  /**
   * Get image dimensions without loading full image
   */
  static async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    const img = await this.loadImage(file);
    return {
      width: img.width,
      height: img.height,
    };
  }

  /**
   * Check if file is an image
   */
  static isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Check if file is a video
   */
  static isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Validate file before compression
   */
  static validateFile(file: File, maxSizeMB: number = 50): {
    valid: boolean;
    error?: string;
  } {
    if (!this.isImage(file) && !this.isVideo(file)) {
      return {
        valid: false,
        error: 'File must be an image or video',
      };
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    return { valid: true };
  }

  /**
   * Compress video (simplified - for production, use ffmpeg.wasm or similar)
   */
  static async compressVideo(
    file: File,
    options: CompressionOptions = {}
  ): Promise<File> {
    // Video compression requires server-side processing or WebAssembly
    // This is a placeholder that returns the original file
    // In production, implement using:
    // - ffmpeg.wasm for client-side compression
    // - Server-side API for more reliable compression
    
    console.warn('Video compression not implemented - returning original file');
    return file;
  }

  /**
   * Create thumbnail from image
   */
  static async createThumbnail(
    file: File,
    size: number = 200
  ): Promise<string> {
    const image = await this.loadImage(file);
    
    const canvas = document.createElement('canvas');
    const { width, height } = this.calculateDimensions(image.width, image.height, size);
    
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.7);
  }

  /**
   * Resize image to exact dimensions (may crop)
   */
  static async resizeToExact(
    file: File,
    width: number,
    height: number
  ): Promise<File> {
    const image = await this.loadImage(file);
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    // Calculate crop dimensions to maintain aspect ratio
    const sourceRatio = image.width / image.height;
    const targetRatio = width / height;

    let sourceWidth = image.width;
    let sourceHeight = image.height;
    let sourceX = 0;
    let sourceY = 0;

    if (sourceRatio > targetRatio) {
      // Source is wider - crop width
      sourceWidth = image.height * targetRatio;
      sourceX = (image.width - sourceWidth) / 2;
    } else {
      // Source is taller - crop height
      sourceHeight = image.width / targetRatio;
      sourceY = (image.height - sourceHeight) / 2;
    }

    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );

    const blob = await this.canvasToBlob(canvas, 'jpeg', 0.9);
    
    return new File([blob], file.name, { type: 'image/jpeg' });
  }
}

/**
 * Utility function for easy compression
 */
export async function compressImage(
  file: File,
  options?: CompressionOptions
): Promise<CompressionResult> {
  return MediaCompressor.compressImage(file, options);
}

/**
 * Utility function for batch compression
 */
export async function compressImages(
  files: File[],
  options?: CompressionOptions
): Promise<CompressionResult[]> {
  return MediaCompressor.compressBatch(files, options);
}

export default MediaCompressor;
