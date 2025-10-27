// import TinyEditor from "@/app/components/private/Editor";
// import { useActionState, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useToast } from "@/hooks/useToast";
// import { Loader2 } from "lucide-react";
// // import { postSchema } from "../../../utils/zodSchemas";
// import { Button } from "@/app/ui/button";
// import { Input } from "@/app/ui/input";
// import { Checkbox } from "@/app/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/ui/form";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/app/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/app/ui/popover";
// import { createPostAction } from "@/app/lib/actions";
// import { getExistingTags } from "@/app/lib/data";
// import { FormSchema } from "@/app/lib/actions";


// export default function CreatePostForm() {
// //   const [open, setOpen] = useState(false);
// //   const [selectedTag, setselectedTag] = useState(null);
// //   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   const initialState = { message: null, errors: {}, success: false };
//   const [state, formAction, isPending] = useActionState(
//     createPostAction,
//     initialState
//   );
//     // Local state for UI
//     const [content, setContent] = useState('');
//     const [selectedTag, setSelectedTag] = useState('');
//     const [customTag, setCustomTag] = useState('');
//     const [existingTags, setExistingTags] = useState<{ tag_id: number; tag: string }[]>([]);
//     const [open, setOpen] = useState(false);
  
//     // Fetch existing tags on mount
//     useEffect(() => {
//       getExistingTags().then(setExistingTags);
//     }, []);
  
//     // Handle success
//     useEffect(() => {
//       if (state.success) {
//         toast({
//           title: 'Success!',
//           description: state.message,
//         });
        
//         // Reset form
//         setContent('');
//         setSelectedTag('');
//         setCustomTag('');
        
//         // Switch to posts tab
//         router.push('/admin?tab=posts');
//       }
//     }, [state.success, state.message, router, toast]);
  
//     // Handle errors
//     useEffect(() => {
//       if (state.message && !state.success) {
//         toast({
//           title: 'Error',
//           description: state.message,
//           variant: 'destructive',
//         });
//       }
//     }, [state.message, state.success, toast]);
  
//     // Determine which tag to use
//     const tagValue = selectedTag || customTag;
  
//   return (
//     <Form {...FormSchema}>
//       <form action={formAction} className="space-y-8 ">
//         <FormField
//           control={form.control}
//           name="tag"
//           render={({ field }) => (
//             <FormItem className="flex flex-row space-x-4 rounded-md border p-2">
//               <FormControl>
//                 <div className="flex items-center space-x-4">
//                   <p className="text-sm text-muted-foreground">Tag</p>
//                   <Popover open={open} onOpenChange={setOpen}>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="w-[150px] justify-start"
//                       >
//                         {selectedTag ? (
//                           <>{selectedTag}</>
//                         ) : (
//                           <>+ Select a Tag</>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0" side="right" align="start">
//                       <Command>
//                         <CommandInput placeholder="Search Tag..." />
//                         {selectedTag && (
//                           <CommandItem
//                             onSelect={() => {
//                               setselectedTag(null);
//                               form.setValue("tag", ""); // Clear the form value as well
//                               setOpen(false);
//                             }}
//                           >
//                             Clear Tag
//                           </CommandItem>
//                         )}
//                         <CommandList>
//                           <CommandEmpty>No results found.</CommandEmpty>
//                           <CommandGroup>
//                             {tags.map((tag) => (
//                               <CommandItem
//                                 key={tag}
//                                 value={tag}
//                                 onSelect={(value) => {
//                                   setselectedTag(tag);
//                                   form.setValue("tag", value);
//                                   setOpen(false);
//                                 }}
//                               >
//                                 {tag}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//               </FormControl>
//               <FormControl>
//                 <Input
//                   placeholder="Create a new tag..."
//                   type=""
//                   className="w-50"
//                   disabled={!!selectedTag}
//                   {...field}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input placeholder="..." type="" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Content</FormLabel>
//               <FormControl>
//                 <TinyEditor value={field.value} onChange={field.onChange} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="file"
//           render={() => (
//             <FormItem>
//               <FormLabel>Thumbnail</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   onChange={(e) => form.setValue("file", e.target.files)}
//                 />
//               </FormControl>
//               <FormDescription>Select an image to upload.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="isPublished"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>Publish post?</FormLabel>

//                 <FormMessage />
//               </div>
//             </FormItem>
//           )}
//         />
//         <Button type="submit">
//           {loading ? <Loader2 className="animate-spin" /> : "Submit"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// app/components/private/CreatePost/CreatePostForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { createPostAction} from '@/app/lib/actions';
import { getExistingTags } from '@/app/lib/data';
import TinyEditor from '@/app/components/private/Editor';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/ui/input';
import { Checkbox } from '@/app/ui/checkbox';
import { Label } from '@/app/ui/label';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
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

// ============================================
// FORM SCHEMA (Client-side validation)
// ============================================
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tag: z.string().min(1, 'Tag is required'),
  file: z.any().optional(),
  isPublished: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

// ============================================
// CREATE POST FORM COMPONENT
// ============================================
export default function CreatePostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  // Tag management state
  const [existingTags, setExistingTags] = useState<{ tag_id: number; tag: string }[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // React Hook Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tag: '',
      isPublished: false,
    },
  });

  // Fetch existing tags on mount
  useEffect(() => {
    getExistingTags().then(setExistingTags);
  }, []);

  // Sync tag value with form
  useEffect(() => {
    const tagValue = selectedTag || customTag;
    form.setValue('tag', tagValue);
  }, [selectedTag, customTag, form]);

  // ============================================
  // SUBMIT HANDLER (Converts to FormData for Server Action)
  // ============================================
  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      try {
        // Convert form data to FormData for server action
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('tag', data.tag);
        formData.append('isPublished', data.isPublished ? 'true' : 'false');

        // Append file if exists
        if (data.file && data.file[0]) {
          formData.append('file', data.file[0]);
        }

        // Call server action
        const result = await createPostAction({}, formData);

        if (result.success) {
          toast({
            title: 'Success!',
            description: result.message,
          });

          // Reset form
          form.reset();
          setSelectedTag('');
          setCustomTag('');

          // Navigate to posts tab
          router.push('/admin?tab=posts');
          router.refresh(); // Refresh server data
        } else {
          // Handle errors
          toast({
            title: 'Error',
            description: result.message || 'Failed to create post',
            variant: 'destructive',
          });

          // Set field errors from server
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              if (messages && messages[0]) {
                form.setError(field as keyof FormValues, {
                  message: messages[0],
                });
              }
            });
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ========== TAG FIELD ========== */}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag *</FormLabel>
              <div className="flex gap-2 items-center">
                {/* Existing Tag Selector */}
                <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-[200px] justify-start"
                      disabled={!!customTag}
                    >
                      {selectedTag || '+ Select existing tag'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[200px]" align="start">
                    <Command>
                      <CommandInput placeholder="Search tags..." />
                      <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {selectedTag && (
                            <CommandItem
                              onSelect={() => {
                                setSelectedTag('');
                                setTagPopoverOpen(false);
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
                                setCustomTag('');
                                setTagPopoverOpen(false);
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
                <Input
                  placeholder="Create new tag..."
                  value={customTag}
                  onChange={(e) => {
                    setCustomTag(e.target.value);
                    if (e.target.value) setSelectedTag('');
                  }}
                  disabled={!!selectedTag}
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========== TITLE FIELD ========== */}
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

        {/* ========== CONTENT FIELD ========== */}
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

        {/* ========== FILE UPLOAD ========== */}
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Optional. Max 10MB. Supports: JPG, PNG, WebP
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========== PUBLISH CHECKBOX ========== */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish immediately</FormLabel>
                <FormDescription>
                  Make this post visible to the public
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* ========== SUBMIT BUTTONS ========== */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Post'
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin?tab=posts')}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}