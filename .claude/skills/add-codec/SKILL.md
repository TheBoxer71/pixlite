---
name: add-codec
description: Scaffold a new image format codec for pixlite (e.g., AVIF, GIF)
argument-hint: [format-name]
---

Scaffold a new image codec for the `$ARGUMENTS` format in pixlite.

## Steps

1. **Read the existing codec pattern** from `lib/codecs/jpeg.ts` to understand the structure.

2. **Create `lib/codecs/$ARGUMENTS.ts`** following the exact same pattern:
   - Import `Codec`, `CodecOptions`, `CodecResult` from `@/lib/types`
   - Import `calculateCropRegion` from `@/lib/utils/imageUtils`
   - Implement the `drawWithCrop` helper (same as other codecs)
   - Export a `[format]Codec` object implementing the `Codec` interface
   - Use the correct MIME type (e.g., `image/avif`)
   - Use the correct file extension
   - Use `OffscreenCanvas` with `HTMLCanvasElement` fallback

3. **Register the codec** in `lib/codecs/index.ts`:
   - Add the import
   - Add to the `codecs` Record

4. **Update `ImageFormat` type** in `lib/types.ts`:
   - Add the new format to the union type

5. **Update `FormatSelector.tsx`** in `components/editor/FormatSelector.tsx`:
   - Add the new format to the `formats` array with a label and description

6. **Update `app/globals.css`** if any format-specific CSS is needed (usually not).

7. **Run `/build`** to verify everything compiles.

## Important Notes

- Check browser support for the MIME type. If `canvas.convertToBlob({ type: 'image/[format]' })` is not widely supported, note this as a limitation.
- For AVIF specifically: Canvas API support is limited. A note should be added that full AVIF support requires `@squoosh/lib` WASM (Phase 2).
- For GIF: Canvas API doesn't support animated GIF encoding. Only single-frame export is possible.
