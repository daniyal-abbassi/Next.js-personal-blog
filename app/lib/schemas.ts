import z from "zod";


export const EditPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    tag: z.string().min(1, 'Tag is required'),
    isPublished: z.boolean().default(false),
    deleteImage: z.boolean().optional(), // Option to delete current image
  });
  
  export type EditPostInput = z.infer<typeof EditPostSchema>;
  