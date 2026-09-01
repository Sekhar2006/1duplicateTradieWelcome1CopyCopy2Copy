/**
 * Offline Media Cache System
 * 
 * Manages local storage of media files when offline using IndexedDB.
 * Automatically syncs queued uploads when connection is restored.
 * 
 * Features:
 * - IndexedDB storage for large files
 * - Upload queue with retry logic
 * - Network status detection
 * - Auto-sync on reconnect
 * - Storage quota management
 * - Progress tracking
 */

interface QueuedMedia {
  id: string;
  file: Blob;
  fileName: string;
  fileType: string;
  endpoint: string;
  metadata?: Record<string, any>;
  retryCount: number;
  maxRetries: number;
  timestamp: number;
  status: 'pending' | 'uploading' | 'failed' | 'success';
  error?: string;
  uploadProgress?: number;
}

interface UploadProgressCallback {
  (progress: number, mediaId: string): void;
}

interface UploadCompleteCallback {
  (mediaId: string, response: any): void;
}

interface UploadErrorCallback {
  (mediaId: string, error: Error): void;
}

export class OfflineMediaCache {
  private static instance: OfflineMediaCache;
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'TRADIEMediaCache';
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = 'media_queue';
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;

  private onProgressCallbacks: Set<UploadProgressCallback> = new Set();
  private onCompleteCallbacks: Set<UploadCompleteCallback> = new Set();
  private onErrorCallbacks: Set<UploadErrorCallback> = new Set();

  private constructor() {
    this.initDatabase();
    this.setupNetworkListeners();
  }

  static getInstance(): OfflineMediaCache {
    if (!OfflineMediaCache.instance) {
      OfflineMediaCache.instance = new OfflineMediaCache();
    }
    return OfflineMediaCache.instance;
  }

  /**
   * Initialize IndexedDB
   */
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const objectStore = db.createObjectStore(this.STORE_NAME, {
            keyPath: 'id',
          });

          // Create indexes
          objectStore.createIndex('status', 'status', { unique: false });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  /**
   * Setup network status listeners
   */
  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      console.log('Network connection restored');
      this.isOnline = true;
      this.syncPendingUploads();
    });

    window.addEventListener('offline', () => {
      console.log('Network connection lost');
      this.isOnline = false;
    });
  }

  /**
   * Add media to upload queue
   */
  async queueUpload(
    file: Blob,
    fileName: string,
    endpoint: string,
    metadata?: Record<string, any>
  ): Promise<string> {
    if (!this.db) {
      await this.initDatabase();
    }

    const mediaId = `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const queuedMedia: QueuedMedia = {
      id: mediaId,
      file,
      fileName,
      fileType: file.type,
      endpoint,
      metadata,
      retryCount: 0,
      maxRetries: 3,
      timestamp: Date.now(),
      status: 'pending',
      uploadProgress: 0,
    };

    try {
      await this.saveToStore(queuedMedia);
      console.log(`Media queued: ${mediaId}`);

      // Attempt upload if online
      if (this.isOnline) {
        this.uploadMedia(mediaId);
      }

      return mediaId;
    } catch (error) {
      console.error('Failed to queue media:', error);
      throw error;
    }
  }

  /**
   * Save media to IndexedDB
   */
  private async saveToStore(media: QueuedMedia): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.put(media);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get media from store
   */
  private async getFromStore(id: string): Promise<QueuedMedia | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all pending uploads
   */
  private async getPendingUploads(): Promise<QueuedMedia[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const index = store.index('status');
      const request = index.getAll('pending');

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Upload media to server
   */
  private async uploadMedia(mediaId: string): Promise<void> {
    const media = await this.getFromStore(mediaId);
    if (!media) {
      console.error(`Media not found: ${mediaId}`);
      return;
    }

    if (media.status === 'uploading' || media.status === 'success') {
      return;
    }

    // Update status to uploading
    media.status = 'uploading';
    await this.saveToStore(media);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', media.file, media.fileName);

      // Add metadata if present
      if (media.metadata) {
        Object.entries(media.metadata).forEach(([key, value]) => {
          formData.append(key, JSON.stringify(value));
        });
      }

      // Upload with progress tracking
      const response = await this.uploadWithProgress(
        media.endpoint,
        formData,
        (progress) => {
          media.uploadProgress = progress;
          this.notifyProgress(progress, mediaId);
        }
      );

      // Upload successful
      media.status = 'success';
      media.uploadProgress = 100;
      await this.saveToStore(media);

      this.notifyComplete(mediaId, response);

      // Clean up after successful upload
      setTimeout(() => this.deleteFromStore(mediaId), 60000); // Keep for 1 minute
    } catch (error) {
      console.error(`Upload failed for ${mediaId}:`, error);

      // Retry logic
      media.retryCount++;
      
      if (media.retryCount < media.maxRetries) {
        media.status = 'pending';
        media.error = (error as Error).message;
        await this.saveToStore(media);

        // Exponential backoff
        const delay = Math.pow(2, media.retryCount) * 1000;
        setTimeout(() => this.uploadMedia(mediaId), delay);
      } else {
        media.status = 'failed';
        media.error = (error as Error).message;
        await this.saveToStore(media);

        this.notifyError(mediaId, error as Error);
      }
    }
  }

  /**
   * Upload with progress tracking
   */
  private uploadWithProgress(
    url: string,
    formData: FormData,
    onProgress: (progress: number) => void
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload aborted'));
      });

      xhr.open('POST', url);
      
      // Add authentication if needed
      const token = localStorage.getItem('auth_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhr.send(formData);
    });
  }

  /**
   * Sync all pending uploads
   */
  async syncPendingUploads(): Promise<void> {
    if (this.syncInProgress || !this.isOnline) {
      return;
    }

    this.syncInProgress = true;

    try {
      const pendingUploads = await this.getPendingUploads();
      console.log(`Syncing ${pendingUploads.length} pending uploads`);

      for (const media of pendingUploads) {
        await this.uploadMedia(media.id);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Delete media from store
   */
  private async deleteFromStore(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get queue status
   */
  async getQueueStatus(): Promise<{
    pending: number;
    uploading: number;
    failed: number;
    total: number;
  }> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const allMedia = request.result;
        const status = {
          pending: allMedia.filter((m) => m.status === 'pending').length,
          uploading: allMedia.filter((m) => m.status === 'uploading').length,
          failed: allMedia.filter((m) => m.status === 'failed').length,
          total: allMedia.length,
        };
        resolve(status);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clear all completed uploads
   */
  async clearCompleted(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const allMedia = request.result;
        const completed = allMedia.filter((m) => m.status === 'success');

        completed.forEach((media) => {
          store.delete(media.id);
        });

        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get storage quota info
   */
  async getStorageInfo(): Promise<{
    usage: number;
    quota: number;
    percentUsed: number;
  }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
        percentUsed: ((estimate.usage || 0) / (estimate.quota || 1)) * 100,
      };
    }

    return {
      usage: 0,
      quota: 0,
      percentUsed: 0,
    };
  }

  /**
   * Register callbacks
   */
  onProgress(callback: UploadProgressCallback): void {
    this.onProgressCallbacks.add(callback);
  }

  onComplete(callback: UploadCompleteCallback): void {
    this.onCompleteCallbacks.add(callback);
  }

  onError(callback: UploadErrorCallback): void {
    this.onErrorCallbacks.add(callback);
  }

  /**
   * Unregister callbacks
   */
  offProgress(callback: UploadProgressCallback): void {
    this.onProgressCallbacks.delete(callback);
  }

  offComplete(callback: UploadCompleteCallback): void {
    this.onCompleteCallbacks.delete(callback);
  }

  offError(callback: UploadErrorCallback): void {
    this.onErrorCallbacks.delete(callback);
  }

  /**
   * Notify progress
   */
  private notifyProgress(progress: number, mediaId: string): void {
    this.onProgressCallbacks.forEach((callback) => {
      callback(progress, mediaId);
    });
  }

  /**
   * Notify completion
   */
  private notifyComplete(mediaId: string, response: any): void {
    this.onCompleteCallbacks.forEach((callback) => {
      callback(mediaId, response);
    });
  }

  /**
   * Notify error
   */
  private notifyError(mediaId: string, error: Error): void {
    this.onErrorCallbacks.forEach((callback) => {
      callback(mediaId, error);
    });
  }

  /**
   * Check if online
   */
  isCurrentlyOnline(): boolean {
    return this.isOnline;
  }
}

// Export singleton instance
export const mediaCache = OfflineMediaCache.getInstance();

// Export utility functions
export async function queueMediaUpload(
  file: Blob,
  fileName: string,
  endpoint: string,
  metadata?: Record<string, any>
): Promise<string> {
  return mediaCache.queueUpload(file, fileName, endpoint, metadata);
}

export async function getUploadQueueStatus() {
  return mediaCache.getQueueStatus();
}

export default OfflineMediaCache;
