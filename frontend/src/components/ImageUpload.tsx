import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import './ImageUpload.css';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    onImagesChange([...images, ...newImages]);
  }, [images, onImagesChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <div className="image-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <ImagePlus className="upload-icon" />
          <p className="upload-text">Drop photos here or click to upload</p>
          <p className="upload-limit">Up to 5 photos</p>
        </div>
      </div>
      
      {images.length > 0 && (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt="" className="uploaded-image" />
              <button
                onClick={() => removeImage(index)}
                className="remove-image"
              >
                <X className="remove-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};