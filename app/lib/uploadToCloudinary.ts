import cloudinary from './cloudinary';

type UploadResult = {
  url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
};

type UploadError = {
  error: string;
};

/**
 * Upload file to Cloudinary
 * @param file - File from FormData
 * @param folder - Cloudinary folder (e.g., 'blog-posts')
 * @returns Upload result with URL and public_id
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = 'blog-posts'
): Promise<UploadResult> {
  try {
    // 1. Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Upload to Cloudinary using Promise
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto', // Automatically detect file type
          transformation: [
            { width: 1200, height: 630, crop: 'limit' }, // Limit max size
            { quality: 'auto' }, // Auto quality
            { fetch_format: 'auto' }, // Auto format
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'));
          } else {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
            });
          }
        }
      );

      // Write buffer to stream
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public_id
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB.',
    };
  }

  return { valid: true };
}