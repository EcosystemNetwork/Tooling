import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import DataService from '../services/DataService';
import FileStorageService, { FileStorageService as FileStorageClass } from '../services/FileStorageService';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const assetTypes = ['All', '3D Models', 'Textures', 'Audio', 'Animations', 'UI Elements'];

export default function Assets() {
  const [assets, setAssets] = useState(() => DataService.getAssets());
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [previewAsset, setPreviewAsset] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [thumbnailBlob, setThumbnailBlob] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [assetThumbnails, setAssetThumbnails] = useState({});
  const fileInputRef = useRef(null);
  const showToast = useToast();

  const refresh = useCallback(() => {
    const newAssets = DataService.getAssets();
    setAssets(newAssets);
  }, []);

  // Load thumbnails for all assets with files
  const loadThumbnails = useCallback(async () => {
    const allAssets = DataService.getAssets();
    const thumbnailMap = {};
    
    for (const asset of allAssets) {
      if (asset.hasFile) {
        try {
          const fileData = await FileStorageService.getFile(asset.id);
          if (fileData && fileData.thumbnail) {
            const url = URL.createObjectURL(fileData.thumbnail);
            thumbnailMap[asset.id] = url;
          } else if (fileData && fileData.file && fileData.fileType.startsWith('image/')) {
            // If no thumbnail but it's an image, use the image itself
            const url = URL.createObjectURL(fileData.file);
            thumbnailMap[asset.id] = url;
          }
        } catch (err) {
          console.error(`Failed to load thumbnail for asset ${asset.id}:`, err);
        }
      }
    }
    
    setAssetThumbnails(thumbnailMap);
  }, []);

  // Load thumbnails on mount
  useEffect(() => {
    const loadInitialThumbnails = async () => {
      const allAssets = DataService.getAssets();
      const thumbnailMap = {};
      
      for (const asset of allAssets) {
        if (asset.hasFile) {
          try {
            const fileData = await FileStorageService.getFile(asset.id);
            if (fileData && fileData.thumbnail) {
              const url = URL.createObjectURL(fileData.thumbnail);
              thumbnailMap[asset.id] = url;
            } else if (fileData && fileData.file && fileData.fileType.startsWith('image/')) {
              const url = URL.createObjectURL(fileData.file);
              thumbnailMap[asset.id] = url;
            }
          } catch (err) {
            console.error(`Failed to load thumbnail for asset ${asset.id}:`, err);
          }
        }
      }
      
      setAssetThumbnails(thumbnailMap);
    };
    
    loadInitialThumbnails();
  }, []);

  // Cleanup thumbnail URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(assetThumbnails).forEach(url => URL.revokeObjectURL(url));
    };
  }, [assetThumbnails]);

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
      const matchesType = activeType === 'All' || a.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [assets, search, activeType]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', type: '3D Models', size: '1.0 MB', author: '', color: '#1e88e5' });
    setUploadedFile(null);
    setThumbnailBlob(null);
    if (thumbnailUrl) {
      URL.revokeObjectURL(thumbnailUrl);
      setThumbnailUrl(null);
    }
    setModalOpen(true);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const detectedType = FileStorageClass.getAssetType(file.type);
      const size = FileStorageClass.formatFileSize(file.size);
      setForm(f => ({ 
        ...f, 
        name: f.name || file.name,
        type: detectedType,
        size: size
      }));

      // Generate thumbnail for images
      if (file.type.startsWith('image/')) {
        try {
          const thumbnail = await FileStorageService.generateThumbnail(file);
          if (thumbnail) {
            setThumbnailBlob(thumbnail);
            const url = URL.createObjectURL(thumbnail);
            setThumbnailUrl(url);
          }
        } catch (err) {
          console.error('Failed to generate thumbnail:', err);
        }
      }
    }
  };

  const openEdit = (a) => {
    setEditingId(a.id);
    setForm({ name: a.name, type: a.type, size: a.size, author: a.author, color: a.color });
    setModalOpen(true);
  };

  const handleSave = useCallback(async () => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    
    const data = {
      name: form.name.trim(),
      type: form.type,
      size: form.size || '1.0 MB',
      author: form.author || 'Unknown',
      color: form.color || '#1e88e5',
      hasFile: !!uploadedFile
    };

    try {
      let assetId = editingId;
      
      if (editingId) {
        DataService.updateAsset(editingId, data);
        showToast('Asset updated');
      } else {
        const newAsset = DataService.addAsset(data);
        assetId = newAsset.id;
        showToast('Asset added');
      }

      // Store file in IndexedDB if uploaded
      if (uploadedFile && assetId) {
        await FileStorageService.storeFile(assetId, uploadedFile, {
          thumbnail: thumbnailBlob
        });
      }

      setModalOpen(false);
      setUploadedFile(null);
      setThumbnailBlob(null);
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
        setThumbnailUrl(null);
      }
      refresh();
      await loadThumbnails();
    } catch (err) {
      showToast('Failed to save asset: ' + err.message, 'error');
    }
  }, [form, editingId, uploadedFile, thumbnailBlob, thumbnailUrl, showToast, loadThumbnails, refresh]);

  const handleDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const confirmDelete = useCallback(async () => {
    try {
      // Delete from IndexedDB
      await FileStorageService.deleteFile(deleteId);
    } catch (err) {
      console.error('Failed to delete file from storage:', err);
    }
    // Delete from DataService
    DataService.deleteAsset(deleteId);
    setConfirmOpen(false);
    refresh();
    await loadThumbnails();
    showToast('Asset deleted', 'info');
  }, [deleteId, showToast, refresh, loadThumbnails]);

  const handlePreview = async (asset) => {
    try {
      const fileData = await FileStorageService.getFile(asset.id);
      if (fileData) {
        const url = URL.createObjectURL(fileData.file);
        setPreviewUrl(url);
        setPreviewAsset({ ...asset, fileData });
        setPreviewOpen(true);
      } else {
        showToast('No file available for preview', 'info');
      }
    } catch (err) {
      showToast('Failed to load file: ' + err.message, 'error');
    }
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setPreviewOpen(false);
    setPreviewAsset(null);
  };

  const handleDownload = async (asset) => {
    try {
      const fileData = await FileStorageService.getFile(asset.id);
      if (fileData && fileData.file) {
        const url = URL.createObjectURL(fileData.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.fileName || asset.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Download started', 'info');
      } else {
        showToast('No file available for download', 'info');
      }
    } catch (err) {
      showToast('Failed to download file: ' + err.message, 'error');
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Asset Manager Library</h2>
        <button className="add-btn" onClick={openAdd}>+ Add Asset</button>
      </div>
      <div className="asset-controls">
        <div className="search-wrapper">
          <input type="text" className="search-input" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tag-filters">
          {assetTypes.map(t => (
            <button key={t} className={`tag-btn${activeType === t ? ' active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="asset-grid">
        {filtered.map((a, i) => (
          <div key={a.id} className="card asset-card reveal-item" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="asset-thumb" style={{ 
              background: assetThumbnails[a.id] 
                ? `url(${assetThumbnails[a.id]}) center/cover` 
                : `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
              position: 'relative'
            }}>
              {a.hasFile && <div className="asset-file-badge">📎 FILE</div>}
            </div>
            <div className="asset-name">{a.name}</div>
            <div className="asset-info">
              <span className="asset-type-tag">{a.type}</span>
              <span>{a.size}</span>
            </div>
            <div className="asset-info" style={{ marginTop: '6px' }}>
              <span>by {a.author}</span>
            </div>
            <div className="card-actions">
              {a.hasFile && <button className="btn-icon" onClick={() => handlePreview(a)} title="Preview Asset">👁️</button>}
              {a.hasFile && <button className="btn-icon" onClick={() => handleDownload(a)} title="Download Asset">⬇️</button>}
              <button className="btn-icon" onClick={() => openEdit(a)} title="Edit Asset">✏️</button>
              <button className="btn-icon" onClick={() => handleDelete(a.id)} title="Delete Asset">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} title={editingId ? 'Edit Asset' : 'Add Asset'} onClose={() => setModalOpen(false)} onConfirm={handleSave}>
        <div className="form-group">
          <label className="form-label">Upload File (Optional)</label>
          <input 
            ref={fileInputRef}
            type="file" 
            onChange={handleFileSelect}
            accept="image/*,audio/*,video/*,.glb,.gltf,.obj,.fbx,.blend,.json"
            style={{ display: 'none' }}
          />
          <button 
            type="button"
            className="form-input" 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              cursor: 'pointer', 
              textAlign: 'left',
              background: '#1a2744',
              border: '2px dashed #3a4d7a',
              padding: '12px'
            }}
          >
            {uploadedFile ? `✓ ${uploadedFile.name}` : '📁 Click to select file...'}
          </button>
          {thumbnailUrl && (
            <div style={{ marginTop: '10px' }}>
              <img src={thumbnailUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }} />
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Asset Name</label>
          <input className="form-input" type="text" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter asset name" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-select" value={form.type || '3D Models'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {['3D Models', 'Textures', 'Audio', 'Animations', 'UI Elements'].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Size</label>
            <input 
              className="form-input" 
              type="text" 
              value={form.size || ''} 
              onChange={e => setForm(f => ({ ...f, size: e.target.value }))} 
              placeholder="e.g., 10.5 MB" 
              disabled={uploadedFile}
              title={uploadedFile ? 'Size is automatically calculated from uploaded file' : ''}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Author</label>
            <input className="form-input" type="text" value={form.author || ''} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Author name" />
          </div>
          <div className="form-group">
            <label className="form-label">Color</label>
            <input className="form-input" type="color" value={form.color || '#1e88e5'} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
          </div>
        </div>
      </Modal>

      <Modal open={confirmOpen} title="Confirm Action" onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} confirmLabel="Delete" confirmClass="modal-btn-danger">
        <p className="confirm-message">Are you sure you want to delete this asset?</p>
      </Modal>

      <Modal open={previewOpen} title={`Preview: ${previewAsset?.name || ''}`} onClose={closePreview} onConfirm={closePreview} confirmLabel="Close">
        {previewAsset?.fileData && previewUrl && (
          <div style={{ padding: '10px' }}>
            {previewAsset.fileData.fileType.startsWith('image/') && (
              <img 
                src={previewUrl} 
                alt={previewAsset.name}
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
              />
            )}
            {previewAsset.fileData.fileType.startsWith('audio/') && (
              <div>
                <audio controls style={{ width: '100%', marginTop: '10px' }}>
                  <source src={previewUrl} type={previewAsset.fileData.fileType} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {previewAsset.fileData.fileType.startsWith('video/') && (
              <video controls style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}>
                <source src={previewUrl} type={previewAsset.fileData.fileType} />
                Your browser does not support the video element.
              </video>
            )}
            {!previewAsset.fileData.fileType.startsWith('image/') && 
             !previewAsset.fileData.fileType.startsWith('audio/') && 
             !previewAsset.fileData.fileType.startsWith('video/') && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '48px', marginBottom: '10px' }}>📄</p>
                <p style={{ color: '#a0b0c0' }}>Preview not available for this file type</p>
                <p style={{ color: '#6080a0', fontSize: '14px', marginTop: '10px' }}>
                  File: {previewAsset.fileData.fileName}<br/>
                  Type: {previewAsset.fileData.fileType}<br/>
                  Size: {FileStorageClass.formatFileSize(previewAsset.fileData.fileSize)}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
