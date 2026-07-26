/**
 * Compresses an image file client-side using HTML5 Canvas before uploading/saving.
 * Converts large high-res photos to lightweight WEBP Data URLs or Blobs.
 * 
 * @param file The File object from input[type="file"]
 * @param maxWidth Maximum width in pixels (default 1080px)
 * @param maxHeight Maximum height in pixels (default 1080px)
 * @param quality Compression quality from 0.0 to 1.0 (default 0.8)
 * @returns Promise<string> Compressed Data URL
 */
export async function compressImage(
  file: File,
  maxWidth = 1080,
  maxHeight = 1080,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Calculate aspect ratio scaling
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve(event.target?.result as string)
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        const compressedDataUrl = canvas.toDataURL("image/webp", quality)
        resolve(compressedDataUrl)
      }

      img.onerror = (error) => reject(error)
    }

    reader.onerror = (error) => reject(error)
  })
}

/**
 * Compresses an image file into a WebP Blob ready for FormData upload.
 * Reduces file size down to ~40KB - 120KB while preserving sharp 1080p visual quality.
 */
export async function compressImageToFile(
  file: File,
  maxWidth = 1080,
  maxHeight = 1080,
  quality = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          return resolve(file)
        }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              resolve(file)
            }
          },
          "image/webp",
          quality
        )
      }

      img.onerror = (error) => reject(error)
    }

    reader.onerror = (error) => reject(error)
  })
}
