import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import {
  Upload,
  Camera,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  File,
  X,
  Play,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  type: 'image' | 'video';
}

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (files: UploadedFile[]) => void;
  onCameraCapture?: () => void;
  title?: string;
  description?: string;
  maxFiles?: number;
  acceptedTypes?: string[];
  showCameraOption?: boolean;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete,
  onCameraCapture,
  title = 'Upload Images or Videos',
  description = 'Add photos or videos of your commodity for AI analysis',
  maxFiles = 5,
  acceptedTypes = ['image/*', 'video/*'],
  showCameraOption = true,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Calculate overall progress
  const overallProgress =
    uploadedFiles.length > 0
      ? Math.round(
          uploadedFiles.reduce((sum, file) => sum + file.progress, 0) / uploadedFiles.length
        )
      : 0;

  const uploadComplete =
    uploadedFiles.length > 0 && uploadedFiles.every((f) => f.status === 'success');

  const hasErrors = uploadedFiles.some((f) => f.status === 'error');

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Process each file
    const newFiles: UploadedFile[] = fileArray.map((file) => ({
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0,
      type: file.type.startsWith('image/') ? 'image' : 'video',
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Start upload simulation
    uploadFiles(newFiles);
  };

  const uploadFiles = async (files: UploadedFile[]) => {
    setIsUploading(true);

    for (const file of files) {
      // Update status to uploading
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: 'uploading' as const } : f))
      );

      // Simulate upload progress
      try {
        await simulateUpload(file.id);

        // Mark as success
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'success' as const, progress: 100 } : f
          )
        );

        toast.success(`${file.file.name} uploaded successfully`);
      } catch (error) {
        // Mark as error
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: 'error' as const, error: 'Upload failed. Please retry.' }
              : f
          )
        );

        toast.error(`Failed to upload ${file.file.name}`);
      }
    }

    setIsUploading(false);
  };

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Simulate occasional failure
          if (Math.random() < 0.1) {
            reject(new Error('Upload failed'));
          } else {
            resolve();
          }
        }

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f))
        );
      }, 200);
    });
  };

  const handleRetry = (fileId: string) => {
    const file = uploadedFiles.find((f) => f.id === fileId);
    if (file) {
      uploadFiles([file]);
    }
  };

  const handleRemove = (fileId: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleConfirm = () => {
    if (uploadComplete) {
      onUploadComplete(uploadedFiles);
      onClose();
      // Clean up object URLs
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setUploadedFiles([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#003E6D',
              fontSize: '24px',
            }}
          >
            {title}
          </DialogTitle>
          <DialogDescription style={{ fontFamily: 'Lato, sans-serif' }}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Upload Area */}
          {uploadedFiles.length < maxFiles && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: '#D9F2FF' }}
                >
                  <Upload className="w-8 h-8" style={{ color: '#003E6D' }} />
                </div>

                <div>
                  <p
                    className="text-base mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                  >
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Supports images and videos • Max {maxFiles} files
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    style={{ borderColor: '#003E6D', color: '#003E6D' }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>

                  {showCameraOption && onCameraCapture && (
                    <Button
                      onClick={onCameraCapture}
                      className="text-white"
                      style={{ backgroundColor: '#FFD700' }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Use Camera
                    </Button>
                  )}
                </div>

                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept={acceptedTypes.join(',')}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Overall Progress */}
          {isUploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                >
                  Uploading files...
                </span>
                <span className="text-sm text-gray-600">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          )}

          {/* Error Summary */}
          {hasErrors && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p
                    className="text-sm text-red-900"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Some uploads failed
                  </p>
                  <p className="text-xs text-red-700 mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Please retry failed uploads or remove them to continue
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4
                  className="text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                >
                  Uploaded Files ({uploadedFiles.length}/{maxFiles})
                </h4>
              </div>

              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="border border-gray-200 rounded-lg p-3 bg-white"
                >
                  <div className="flex items-center gap-3">
                    {/* Preview */}
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      {file.type === 'image' ? (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      {/* Status Overlay */}
                      {file.status === 'uploading' && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                      )}
                      {file.status === 'success' && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="absolute inset-0 bg-red-500 bg-opacity-80 flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className="text-sm truncate"
                          style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                        >
                          {file.file.name}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor:
                              file.status === 'success'
                                ? '#10B981'
                                : file.status === 'error'
                                ? '#EF4444'
                                : '#6B7280',
                            color:
                              file.status === 'success'
                                ? '#10B981'
                                : file.status === 'error'
                                ? '#EF4444'
                                : '#6B7280',
                          }}
                        >
                          {file.type}
                        </Badge>
                      </div>

                      <p className="text-xs text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <Progress value={file.progress} className="h-1" />
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === 'error' && file.error && (
                        <p
                          className="text-xs text-red-600 mt-1"
                          style={{ fontFamily: 'Lato, sans-serif' }}
                        >
                          {file.error}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {file.status === 'error' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetry(file.id)}
                          className="text-xs"
                        >
                          Retry
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(file.id)}
                        disabled={file.status === 'uploading'}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!uploadComplete || isUploading}
              className="flex-1 text-white"
              style={{
                backgroundColor: uploadComplete ? '#FFD700' : '#9CA3AF',
                cursor: uploadComplete ? 'pointer' : 'not-allowed',
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm and Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadModal;
