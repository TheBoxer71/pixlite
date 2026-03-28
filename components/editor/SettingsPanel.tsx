'use client';

import { FormatSelector } from './FormatSelector';
import { QualitySlider } from './QualitySlider';
import { ResizeControls } from './ResizeControls';
import { DownloadButton } from './DownloadButton';
import { AlertTriangle } from 'lucide-react';

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-5 p-4">
        {/* Format */}
        <FormatSelector />

        {/* Divider */}
        <div className="h-px bg-border-default" />

        {/* Quality */}
        <QualitySlider />

        {/* Divider */}
        <div className="h-px bg-border-default" />

        {/* Resize */}
        <ResizeControls />

        {/* Warning */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-accent-brand/5 border border-accent-brand/10">
          <AlertTriangle className="w-3.5 h-3.5 text-accent-brand shrink-0 mt-0.5" />
          <p className="text-[10px] text-text-muted leading-relaxed">
            Download before uploading new images — processed files are not stored anywhere.
          </p>
        </div>
      </div>

      {/* Download — sticky at bottom */}
      <div className="p-4 border-t border-border-default bg-bg-surface">
        <DownloadButton />
      </div>
    </div>
  );
}
