import React, { useRef, useState } from 'react';
import { ImagePlus, X, Star, LoaderCircle } from 'lucide-react';
import { uploadProductImages, fileToOptimizedDataUrl, isSupabaseConfigured } from '../lib/supabase';

export default function ProductImagePicker({ images = [], onChange }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [urlInput, setUrlInput] = useState('');

  const currentImages = Array.isArray(images) ? images.filter(Boolean) : [];

  const updateImages = (next) => {
    if (onChange) onChange(next);
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter(file => file.type.startsWith('image/'));
    if (files.length === 0) {
      setMessage('Please choose image files.');
      return;
    }

    setIsUploading(true);
    setMessage('');
    try {
      const uploaded = [];
      for (const file of files) {
        try {
          if (isSupabaseConfigured) {
            const result = await uploadProductImages([file]);
            if (result.data?.length) {
              uploaded.push(result.data[0]);
              continue;
            }
          }
          uploaded.push(await fileToOptimizedDataUrl(file));
        } catch {
          setMessage('Some images could not be added.');
        }
      }

      if (uploaded.length > 0) {
        updateImages([...currentImages, ...uploaded]);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    updateImages([...currentImages, url]);
    setUrlInput('');
  };

  return (
    <div className="product-image-picker">
      <label className="product-picker-label">Product Images <span>(select multiple)</span></label>
      <div
        className={`product-image-dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {isUploading ? <LoaderCircle size={22} className="spin-icon" /> : <ImagePlus size={22} />}
        <strong>{isUploading ? 'Adding images...' : 'Drop images here or click to browse'}</strong>
        <small>JPG, PNG or WebP · choose several at once · first image is the cover</small>
      </div>

      {message && <p className="product-picker-message">{message}</p>}

      {currentImages.length > 0 && (
        <div className="product-image-grid">
          {currentImages.map((src, index) => (
            <div key={`${src.slice(0, 40)}-${index}`} className={`product-image-tile ${index === 0 ? 'is-cover' : ''}`}>
              <img src={src} alt={`Product image ${index + 1}`} />
              {index === 0 && <span className="product-image-cover-chip"><Star size={9} /> Cover</span>}
              <div className="product-image-tile-actions">
                {index !== 0 && (
                  <button type="button" onClick={() => {
                    const next = [...currentImages];
                    const [picked] = next.splice(index, 1);
                    updateImages([picked, ...next]);
                  }}>Set cover</button>
                )}
                <button type="button" aria-label="Remove image" onClick={() => updateImages(currentImages.filter((_, i) => i !== index))}>
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="product-image-url-row">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Or paste an image URL"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
        />
        <button type="button" onClick={handleAddUrl}>Add</button>
      </div>
    </div>
  );
}
