// app/components/private/EditPost/EditPostForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditPostSchema } from '@/app/lib/schemas';
// import { EditPostInput } from '@/app/lib/schemas';
import { updatePostAction, getExistingTags } from '@/app/lib/actions';
import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import TinyEditor from '@/app/components/private/Editor';
import ThumbnailPreview from './ThumbnailPreview';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Checkbox } from '@/app/ui/checkbox';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/popover';
import type { Post, User, Tag } from '@prisma/client';

type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
};

type Props = {
  post: PostWithRelations;
  setSelectedPost: (post: PostWithRelations | null) => void;
};

type FormValues = {
  title: string;
  content: string;
  tag: string;
  file?: FileList;
  isPublished: boolean;
  deleteImage?: boolean;
};

export default function EditPostForm({ post, setSelectedPost }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // UI State
  const [existingTags, setExistingTags] = useState<{ tag_id: number; tag: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(post.Tag?.tag || '');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteCurrentImage, setDeleteCurrentImage] = useState(false);

  // React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content || '',
      tag: post.Tag?.tag || '',
      isPublished: post.isPublished,
      deleteImage: false,
    },
  });

  // Fetch existing tags
  useEffect(() => {
    getExistingTags().then(setExistingTags);
  }, []);

  // Sync tag selection
  useEffect(() => {
    const tagValue = selectedTag || form.watch('tag');
    form.setValue('tag', tagValue);
  }, [selectedTag, form]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      try {
        // Convert to FormData
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('tag', data.tag);
        formData.append('isPublished', data.isPublished ? 'on' : 'off');
        formData.append('deleteImage', deleteCurrentImage ? 'on' : 'off');

        // Add file if exists
        if (data.file?.[0]) {
          formData.append('file', data.file[0]);
        }

        // Call Server Action (bind postId)
        const boundAction = updatePostAction.bind(null, post.post_id);
        const result = await boundAction({}, formData);

        if (result.success) {
          toast({
            title: 'Success!',
            description: result.message || 'Post updated successfully!',
          });

          // Clear selection and go to posts tab
          setSelectedPost(null);
          router.push('/admin?tab=posts');
          router.refresh();
        } else {
          toast({
            title: 'Error',
            description: result.message || 'Failed to update post',
            variant: 'destructive',
          });

          // Set field-specific errors
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              form.setError(field as any, {
                message: messages?.[0],
              });
            });
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      }
    });
  };

  // Handle image file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setSelectedPost(null);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'posts');
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* TAG SELECTION */}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag *</FormLabel>
              <div className="flex gap-2 items-center">
                {/* Existing Tag Selector */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[200px] justify-start"
                      disabled={!!field.value && !selectedTag}
                    >
                      {selectedTag || '+ Select existing tag'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[250px]" align="start">
                    <Command>
                      <CommandInput placeholder="Search tags..." />
                      <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {selectedTag && (
                            <CommandItem
                              onSelect={() => {
                                setSelectedTag('');
                                field.onChange('');
                                setOpen(false);
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Clear selection
                            </CommandItem>
                          )}
                          {existingTags.map((tag) => (
                            <CommandItem
                              key={tag.tag_id}
                              value={tag.tag}
                              onSelect={(value) => {
                                setSelectedTag(value);
                                field.onChange(value);
                                setOpen(false);
                              }}
                            >
                              <CheckCircle2
                                className={`mr-2 h-4 w-4 ${
                                  selectedTag === tag.tag ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                              {tag.tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <span className="text-muted-foreground">or</span>

                {/* Custom Tag Input */}
                <FormControl>
                  <Input
                    placeholder="Create new tag..."
                    disabled={!!selectedTag}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value) setSelectedTag('');
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CONTENT */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <TinyEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* THUMBNAIL MANAGEMENT */}
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              
              <div className="space-y-4">
                {/* Current Image */}
                {post.url && !deleteCurrentImage && !imagePreview && (
                  <ThumbnailPreview
                    url={post.url}
                    onRemove={() => setDeleteCurrentImage(true)}
                  />
                )}

                {/* New Image Preview */}
                {imagePreview && (
                  <ThumbnailPreview
                    url={imagePreview}
                    onRemove={() => {
                      setImagePreview(null);
                      form.setValue('file', undefined);
                    }}
                    isPreview
                  />
                )}

                {/* Delete Message */}
                {deleteCurrentImage && !imagePreview && (
                  <div className="p-4 border border-dashed rounded-md text-center">
                    <p className="text-sm text-muted-foreground">
                      Current image will be deleted
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => setDeleteCurrentImage(false)}
                    >
                      Undo
                    </Button>
                  </div>
                )}

                {/* File Input */}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleFileChange(e);
                      setDeleteCurrentImage(false);
                    }}
                    {...field}
                  />
                </FormControl>
              </div>
              
              <FormDescription>
                Upload a new image to replace the current one. Max 10MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PUBLISH CHECKBOX */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  {field.value ? 'Post is visible to public' : 'Post is in draft mode'}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* SUBMIT BUTTONS */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Post'
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isPending}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}