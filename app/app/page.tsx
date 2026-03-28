'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useProcessImage } from '@/lib/hooks/useProcessImage';
import { ModeToggle } from '@/components/editor/ModeToggle';
import { UploadZone } from '@/components/editor/UploadZone';
import { BeforeAfterSlider } from '@/components/editor/BeforeAfterSlider';
import { StatsBar } from '@/components/editor/StatsBar';
import { SettingsPanel } from '@/components/editor/SettingsPanel';
import { BatchStrip } from '@/components/editor/BatchStrip';
import { DownloadGateModal } from '@/components/editor/DownloadGateModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppPage() {
  const images = useEditorStore((s) => s.images);
  const hasImages = images.length > 0;

  // Trigger processing on settings/image change
  useProcessImage();

  return (
    <div className="flex-1 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-default">
        <ModeToggle />
        {hasImages && (
          <button
            onClick={() => {
              const store = useEditorStore.getState();
              store.checkGate(() => store.clearAll());
            }}
            className="text-[10px] font-bold uppercase tracking-wider text-text-ghost hover:text-text-muted transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          {!hasImages ? (
            /* Upload zone — full width */
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center p-4 lg:p-8"
            >
              <div className="w-full max-w-2xl">
                <UploadZone />
              </div>
            </motion.div>
          ) : (
            /* Editor layout */
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col lg:flex-row min-h-0"
            >
              {/* Preview panel — 63% on desktop */}
              <div className="flex-1 lg:w-[63%] flex flex-col p-4 min-h-0 overflow-y-auto">
                <BeforeAfterSlider />
                <StatsBar />
                <BatchStrip />
              </div>

              {/* Settings panel — 37% on desktop */}
              <div className="lg:w-[37%] lg:max-w-[420px] border-t lg:border-t-0 lg:border-l border-border-default bg-bg-surface flex flex-col min-h-0">
                <SettingsPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download gate modal */}
      <DownloadGateModal />
    </div>
  );
}
