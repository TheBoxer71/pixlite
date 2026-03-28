'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { AlertTriangle, Download, Trash2, X } from 'lucide-react';

export function DownloadGateModal() {
  const isOpen = useEditorStore((s) => s.isDownloadGateOpen);
  const resolveGate = useEditorStore((s) => s.resolveGate);
  const undownloadedCount = useEditorStore((s) => s.undownloadedCount());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-bg-surface border border-border-default rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-accent-brand/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-accent-brand" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-center text-sm font-bold text-text-primary mb-1">
          Undownloaded {undownloadedCount === 1 ? 'Image' : 'Images'}
        </h2>
        <p className="text-center text-xs text-text-muted mb-5">
          You have {undownloadedCount} processed {undownloadedCount === 1 ? 'image' : 'images'} that
          {undownloadedCount === 1 ? " hasn't" : " haven't"} been downloaded.
          Processed files are not stored anywhere.
        </p>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => resolveGate('download')}
            className="w-full flex items-center justify-center gap-2 bg-accent-brand text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download First
          </button>
          <button
            onClick={() => resolveGate('discard')}
            className="w-full flex items-center justify-center gap-2 bg-danger/10 text-danger py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-danger/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Discard & Continue
          </button>
          <button
            onClick={() => resolveGate('cancel')}
            className="w-full flex items-center justify-center gap-2 text-text-muted py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:text-text-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
