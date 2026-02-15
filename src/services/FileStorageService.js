// ===== File Storage Service (IndexedDB Implementation) =====
// Handles storing and retrieving actual files (binary data) for assets

const DB_NAME = 'GameForgeAssets';
const DB_VERSION = 1;
const STORE_NAME = 'files';

class FileStorageService {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  // Initialize IndexedDB
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  // Ensure DB is initialized before operations
  async ensureReady() {
    if (!this.db) {
      await this.initPromise;
    }
  }

  // Store a file with metadata
  async storeFile(id, file, metadata = {}) {
    await this.ensureReady();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const data = {
        id,
        file,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        timestamp: Date.now(),
        ...metadata
      };

      const request = store.put(data);
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  // Get a stored file by ID
  async getFile(id) {
    await this.ensureReady();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Delete a file by ID
  async deleteFile(id) {
    await this.ensureReady();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get all stored files
  async getAllFiles() {
    await this.ensureReady();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Generate thumbnail for image files
  async generateThumbnail(file, maxWidth = 200, maxHeight = 200) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.7);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Format file size for display
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  // Get file type category from MIME type
  static getAssetType(mimeType) {
    if (mimeType.startsWith('image/')) return 'Textures';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType.startsWith('video/')) return 'Animations';
    if (mimeType.startsWith('model/') || mimeType.includes('gltf') || mimeType.includes('glb')) return '3D Models';
    if (mimeType.includes('json') || mimeType.includes('xml')) return 'UI Elements';
    return '3D Models'; // default
  }

  // Create download URL for a file
  createObjectURL(file) {
    return URL.createObjectURL(file);
  }

  // Revoke download URL
  revokeObjectURL(url) {
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance and class for static methods
const fileStorageService = new FileStorageService();
export { FileStorageService };
export default fileStorageService;
