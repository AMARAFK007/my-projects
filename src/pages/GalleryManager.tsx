import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Info, 
  X,
  Check
} from 'lucide-react';
// Comment out storage related imports
// import { 
//   getStorage, 
//   ref, 
//   uploadBytesResumable, 
//   getDownloadURL, 
//   listAll, 
//   deleteObject 
// } from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  query, 
  getDocs, 
  deleteDoc, 
  doc, 
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  category: string;
  caption?: string;
  uploaded: string;
  size: string;
}

export default function GalleryManager() {
  // Demo placeholders in case Firestore is empty
  const placeholderImages = [
    {
      id: '1',
      url: 'https://source.unsplash.com/random/800x600/?farmhouse',
      name: 'Farmhouse Exterior',
      category: 'exterior',
      uploaded: new Date().toISOString(),
      size: '1.2 MB'
    },
    {
      id: '2',
      url: 'https://source.unsplash.com/random/800x600/?room',
      name: 'Luxury Room',
      category: 'rooms',
      uploaded: new Date().toISOString(),
      size: '0.8 MB'
    },
    {
      id: '3',
      url: 'https://source.unsplash.com/random/800x600/?dining',
      name: 'Dining Area',
      category: 'food',
      uploaded: new Date().toISOString(),
      size: '1.5 MB'
    },
    {
      id: '4',
      url: 'https://source.unsplash.com/random/800x600/?amenities',
      name: 'Amenities',
      category: 'amenities',
      uploaded: new Date().toISOString(),
      size: '0.9 MB'
    }
  ];

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Images' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'exterior', name: 'Exterior' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'activities', name: 'Activities' },
  ];

  // Load images from Firestore
  const fetchImages = async () => {
    setLoading(true);
    try {
      const imagesCollection = collection(db, 'galleryImages');
      const q = query(imagesCollection, orderBy('uploaded', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const imagesList: ImageItem[] = [];
      querySnapshot.forEach((doc) => {
        imagesList.push({
          id: doc.id,
          ...doc.data()
        } as ImageItem);
      });
      
      if (imagesList.length > 0) {
        setImages(imagesList);
      } else {
        // If Firestore is empty, use placeholders and add them to Firestore
        setImages(placeholderImages);
        placeholderImages.forEach(async (image) => {
          const { id, ...imageData } = image;
          try {
            await addDoc(collection(db, 'galleryImages'), imageData);
          } catch (err) {
            console.error('Error adding placeholder to Firestore:', err);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      showNotification('error', 'Failed to load gallery images');
      // Fallback to placeholders
      setImages(placeholderImages);
    } finally {
      setLoading(false);
    }
  };

  // Load images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  // Store image metadata in Firestore even without actual Storage
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    
    try {
      const newImages: ImageItem[] = [];
      
      // Process each file
      for (const file of selectedFiles) {
        // Create object URL for client-side preview
        const url = URL.createObjectURL(file);
        
        // Determine file size
        const size = (file.size / 1024 > 1024) 
          ? `${(file.size / 1024 / 1024).toFixed(2)} MB` 
          : `${(file.size / 1024).toFixed(2)} KB`;
        
        // Prepare image data
        const imageData = {
          url: url, // Using local URL for preview
          name: file.name,
          category: 'rooms', // Default category
          uploaded: new Date().toISOString(),
          size: size,
          isExternalUrl: true, // Flag to indicate it's an external URL
        };
        
        // Add to Firestore
        try {
          const docRef = await addDoc(collection(db, 'galleryImages'), imageData);
          newImages.push({
            id: docRef.id,
            ...imageData
          });
          
          // Simulate progress
          setUploadProgress(prev => ({
            ...prev, 
            [file.name]: 100
          }));
        } catch (err) {
          console.error('Error adding to Firestore:', err);
          showNotification('error', `Failed to add ${file.name}`);
        }
      }
      
      setImages(prev => [...newImages, ...prev]);
      setSelectedFiles([]);
      showNotification('success', `Added ${newImages.length} images`);
    } catch (error) {
      console.error('Failed to process images:', error);
      showNotification('error', 'Failed to process one or more images');
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  // Delete from Firestore
  const handleDelete = async (image: ImageItem) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'galleryImages', image.id));
      
      // Update local state
      setImages(images.filter(img => img.id !== image.id));
      
      // If this was the selected image, deselect it
      if (selectedImage && selectedImage.id === image.id) {
        setSelectedImage(null);
      }
      
      showNotification('success', 'Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      showNotification('error', 'Failed to delete image');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredImages = currentCategory === 'all' 
    ? images 
    : images.filter(img => img.category === currentCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gallery Manager</h1>
        <p className="text-foreground/60">Upload and manage your gallery images</p>
        <p className="text-sm text-amber-500 mt-2">
          Note: Images are stored as references with local previews. When hosting the admin panel,
          you'll need to integrate with an image hosting service.
        </p>
      </div>

      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 rounded-md px-4 py-3 shadow-md ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span>{notification.type === 'success' ? <Check size={18} /> : <Info size={18} />}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Upload Section */}
      <div className="admin-card">
        <h2 className="mb-4 text-lg font-semibold">Upload Images</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div 
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="mb-2 h-6 w-6 text-foreground/60" />
              <p className="text-sm text-foreground/60">
                Click to select files or drag and drop
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">{selectedFiles.length} files selected</p>
                <ul className="mt-1 text-xs text-foreground/60">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-end">
            <button
              className="admin-btn-primary flex items-center justify-center"
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        </div>

        {uploading && Object.keys(uploadProgress).length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Upload Progress</p>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{fileId}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div 
                    className="h-1.5 rounded-full bg-primary" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Gallery Images</h2>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`rounded-md px-3 py-1 text-sm ${
                  currentCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p className="mt-2 text-foreground/60">Loading images...</p>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <ImageIcon className="mx-auto h-10 w-10 text-foreground/40" />
              <p className="mt-2 text-foreground/60">No images found in this category</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.name} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // If image fails to load, replace with placeholder
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image);
                    }}
                    className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-white">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-card">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Image Details</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="rounded-full p-1 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.name} 
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      // If image fails to load, replace with placeholder
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Filename</h4>
                    <p>{selectedImage.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Category</h4>
                    <p>{selectedImage.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Size</h4>
                    <p>{selectedImage.size}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/60">Uploaded</h4>
                    <p>{new Date(selectedImage.uploaded).toLocaleString()}</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => handleDelete(selectedImage)}
                      className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 