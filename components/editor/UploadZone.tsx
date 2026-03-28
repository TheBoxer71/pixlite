'use client';

import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEditorStore } from '@/lib/store/editorStore';
import { Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const MAX_SIZE = 25 * 1024 * 1024; // 25 MB
const ACCEPTED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tiff', '.tif'],
};

export function UploadZone() {
  const mode = useEditorStore((s) => s.mode);
  const images = useEditorStore((s) => s.images);
  const addImages = useEditorStore((s) => s.addImages);
  const checkGate = useEditorStore((s) => s.checkGate);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_SIZE);
      const oversized = acceptedFiles.length - validFiles.length;
      if (oversized > 0) {
        toast.error(`${oversized} file${oversized > 1 ? 's' : ''} exceeded the 25 MB limit`);
      }

      if (validFiles.length === 0) return;

      if (images.length > 0) {
        checkGate(() => addImages(validFiles));
      } else {
        addImages(validFiles);
      }
    },
    [addImages, checkGate, images.length]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    maxFiles: mode === 'single' ? 1 : 8,
    multiple: mode === 'batch',
  });

  // Paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        e.preventDefault();
        onDrop(files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onDrop]);

  const hasError = fileRejections.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        <div
          {...getRootProps()}
          className={`
            relative flex flex-col items-center justify-center
            min-h-[40vh] lg:min-h-[50vh]
            rounded-xl border-2 border-dashed
            transition-all duration-200 cursor-pointer
            dot-grid
            ${isDragActive
              ? 'border-accent-brand bg-accent-dim'
              : hasError
                ? 'border-danger bg-danger/5'
                : 'border-border-default hover:border-text-ghost'
            }
          `}
        >
          <input {...getInputProps()} />

          {/* Drag active pulse effect */}
          {isDragActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-accent-brand"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          <div className="flex flex-col items-center gap-4 py-8 px-4">
            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                isDragActive
                  ? 'bg-accent-brand/20 text-accent-brand'
                  : hasError
                    ? 'bg-danger/10 text-danger'
                    : 'bg-bg-elevated text-text-ghost'
              }`}
            >
              {hasError ? (
                <AlertCircle className="w-7 h-7" />
              ) : (
                <Upload className="w-7 h-7" />
              )}
            </div>

            {/* Text */}
            {isDragActive ? (
              <p className="text-sm font-medium text-accent-brand">
                Drop your {mode === 'batch' ? 'images' : 'image'} here
              </p>
            ) : hasError ? (
              <div className="text-center">
                <p className="text-sm font-medium text-danger mb-1">Invalid file</p>
                <p className="text-xs text-text-muted">
                  Accepted formats: JPEG, PNG, WebP, GIF, BMP, TIFF (max 25 MB)
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-text-primary mb-1">
                  Drag & drop your {mode === 'batch' ? 'images' : 'image'} here
                </p>
                <p className="text-xs text-text-muted">
                  or click to browse · paste from clipboard
                </p>
                <p className="text-[10px] text-text-ghost mt-2">
                  JPEG, PNG, WebP, GIF, BMP, TIFF · Max 25 MB
                  {mode === 'batch' && ' · Up to 8 images'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
