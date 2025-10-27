// app/components/private/EditPost/ThumbnailPreview.tsx
'use client';

import { X } from 'lucide-react';
import { Button } from '@/app/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/app/ui/alert-dialog';

type Props = {
  url: string | null;
  onRemove?: () => void;
  isPreview?: boolean;
};

export default function ThumbnailPreview({ url, onRemove, isPreview = false }: Props) {
  if (!url) return null;

  // Check if it's a valid URL or base64
  const isValidUrl = url.startsWith('http') || url.startsWith('data:image');
  
  // If it's not a valid URL, it might be a Cloudinary public_id
  const imageUrl = isValidUrl ? url : `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${url}`;

  return (
    <div className="relative w-full max-w-sm">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="relative w-full h-48 border rounded-md overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity">
            <img
              src={imageUrl}
              alt="Thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </AlertDialogTrigger>
        
        <AlertDialogContent className="max-w-4xl">
          <div className="flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Full size preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <p className="text-xs text-muted-foreground mt-2">
        {isPreview ? 'New image preview' : 'Current thumbnail'} (click to enlarge)
      </p>
    </div>
  );
}