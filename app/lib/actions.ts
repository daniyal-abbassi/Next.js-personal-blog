"use server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, auth, getUser } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { signOut } from "@/auth";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  validateImageFile,
} from '@/app/lib/uploadToCloudinary';
import { findOrCreateTag } from "./data";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function signUp(preState: string | undefined, formData: FormData) {
  try {
    const validatedFields = signUpSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (!validatedFields.success) {
      return "Invalid Fields!";
    }

    const { username, password } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
      where: { username },
    });
    if (existingUser) {
      return "Username already taken";
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });

    try {
      await signIn("credentials", { username, password, redirect: false });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return "Invalid credentials";
          default:
            return "Somthing went wrong!";
        }
      }
      throw error;
    } //catch block
  } catch (error) {
    console.error("Sign-up error:", error);
    return "Something went wrong!";
  }
  revalidatePath("/");
  redirect("/");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Somthing went wrong!";
      }
    }
    throw error;
  } //catch block
}

// Validate Object
const FormSchema = z.object({
  title: z.string().min(1, "A post cannot publish without a title."),
  content: z.string().min(1, "A post should contain something atleast!"),
  author_id: z.number(),
  isPublished: z.boolean(),
  tag_id: z.coerce.number().gt(0, "Should select a tag atleast!"),
});

// State type
export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    isPublished?: string[];
    tag_id?: string[];
  };
  message?: string | null;
};

const CreatePost = FormSchema;

// Delete post function
type ActionResponse<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function deletePost(id: number): Promise<ActionResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized: You must be logged in to delete posts",
      };
    }

    const post = await prisma.post.findUnique({
      where: { post_id: id },
    });
    if (!post) {
      return { success: false, error: "Post Not Found!" };
    }
    //delete from cloudinary
    if (post.coudinaryId) {
      try {
        await deleteFromCloudinary(post.coudinaryId);
      } catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
        // Continue with post deletion even if Cloudinary fails
      }
    }
    //one admin can not delete others admin post = ownership
    await prisma.post.delete({
      where: {
        post_id: id,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/posts");
    return { success: true, data: post };
  } catch (error) {
    console.error("Delete post error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete post!",
    };
  }
}

// toggle publish state
export async function togglePublish(postId: number, isPublished:boolean): Promise<ActionResponse> {
  try {
    const updatedPost = await prisma.post.update({
      where: {post_id: postId},
      data: {isPublished},
      include: {
        Tag: true
      }
    });

    revalidatePath('/admin');
    revalidatePath('/posts');

    return {success: true, data: updatedPost};
  } catch (error) {
    console.error('Toggle publish error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update post' 
    };
  }
}
// Update/Edit post function
export async function editPost(
  id: number,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreatePost.safeParse({
    author_id: 1,
    tag_id: formData.get("tag"),
    title: formData.get("title"),
    content: formData.get("content"),
    isPublished: formData.get("publishStatus") === "publish" ? true : false,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check the form inputs again, something is missing!!!",
    };
  }
  const { author_id, tag_id, title, content, isPublished } =
    validatedFields.data;
  try {
    await prisma.post.update({
      where: {
        post_id: id,
      },
      data: {
        author_id: author_id,
        title: title,
        content: content,
        isPublished: isPublished,
        tag_id: tag_id,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.log("database error: ", error);
    return {
      message: "Database error: Failed to update the Post.",
    };
  }
  revalidatePath("/posts");
  redirect("/posts");
}

type FormState = {
  errors?: {
    title?: string[];
    content?: string[];
    tag?: string[];
    file?: string[];
    isPublished?: string[];
  };
  message?: string | null;
  success?: boolean;
};
const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tag: z.string().min(1, 'Tag is required'),
  isPublished: z.boolean(),
});
// Create post function
// export async function createPost(prevState: State, formData: FormData) {
//   const validatedFields = CreatePost.safeParse({
//     //this will return an object wheather success or error
//     author_id: 1,
//     tag_id: formData.get("tag"),
//     title: formData.get("title"),
//     content: formData.get("content"),
//     isPublished: formData.get("publishStatus") === "publish" ? true : false,
//   });
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Check the form inputs again, something is missing!!!",
//     };
//   }
//   const { author_id, tag_id, title, content, isPublished } =
//     validatedFields.data;
//   try {
//     await prisma.post.create({
//       data: {
//         title: title,
//         content: content,
//         author_id: author_id,
//         tag_id: tag_id,
//         isPublished: isPublished,
//         updated_at: new Date(),
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Database error: Failed to create Post.",
//     };
//   }
//   revalidatePath("/admin");
//   revalidatePath("/posts");
// }
export async function createPostAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 2. EXTRACT & VALIDATE FORM DATA
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      tag: formData.get('tag'),
      isPublished: formData.get('isPublished') === 'on',
    };

    const validatedFields = CreatePostSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid form data. Please check the fields.',
        success: false,
      };
    }

    const { title, content, tag, isPublished } = validatedFields.data;

    // 3. HANDLE FILE UPLOAD TO CLOUDINARY 
    let imageUrl: string | null = null;
    let publicId: string | null = null;

    const file = formData.get('file') as File | null;

    if (file && file.size > 0) {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        return {
          errors: { file: [validation.error!] },
          message: 'Invalid image file.',
          success: false,
        };
      }

      try {
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(file, 'blog-posts');
        imageUrl = uploadResult.url;
        publicId = uploadResult.coudinaryId;
      } catch (error) {
        return {
          errors: {
            file: [error instanceof Error ? error.message : 'Upload failed'],
          },
          message: 'Failed to upload image to Cloudinary.',
          success: false,
        };
      }
    }

    // 4. FIND OR CREATE TAG
    const tagRecord = await findOrCreateTag(tag);
    // 5. CREATE POST IN DATABASE
    const post = await prisma.post.create({
      data: {
        title,
        content,
        url: imageUrl,
        coudinaryId: publicId,
        author_id: 1,
        tag_id: tagRecord.tag_id,
        isPublished,
        updated_at: new Date(),
      },
      include: {
        User: true,
        Tag: true,
      },
    });

    // 6. REVALIDATE CACHE
    revalidatePath('/admin');
    revalidatePath('/posts');

    // 7. SUCCESS RESPONSE
    return {
      message: `Post "${title}" created successfully!`,
      success: true,
    };
  } catch (error) {
    console.error('Create post error:', error);
    return {
      message: error instanceof Error ? error.message : 'Failed to create post',
      success: false,
    };
  }
}

export async function updatePostAction(
  postId: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // const user = await auth();
    // if (!user) {
    //   return { message: 'Unauthorized', success: false };
    // }

    // Get existing post
    const existingPost = await prisma.post.findUnique({
      where: { post_id: postId },
    });

    if (!existingPost) {
      return { message: 'Post not found', success: false };
    }

    // if (existingPost.author_id !== user.id) {
    //   return { message: 'Forbidden', success: false };
    // }

    // Validate form data
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      tag: formData.get('tag'),
      isPublished: formData.get('isPublished') === 'true',
    };

    const validatedFields = CreatePostSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid form data',
        success: false,
      };
    }

    const { title, content, tag, isPublished } = validatedFields.data;

    // Handle new file upload
    let imageUrl = existingPost.url;
    let publicId = existingPost.coudinaryId;

    const file = formData.get('file') as File | null;
    const shouldDeleteImage = formData.get('deleteImage') === 'true';

    // Delete old image if requested
    if (shouldDeleteImage && existingPost.coudinaryId) {
      try {
        await deleteFromCloudinary(existingPost.coudinaryId);
        imageUrl = null;
        publicId = null;
      } catch (error) {
        console.error('Failed to delete old image:', error);
      }
    }

    // Upload new image
    if (file && file.size > 0) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        return {
          errors: { file: [validation.error!] },
          message: 'Invalid image file',
          success: false,
        };
      }

      try {
        // Delete old image if exists
        if (existingPost.coudinaryId) {
          await deleteFromCloudinary(existingPost.coudinaryId);
        }

        // Upload new image
        const uploadResult = await uploadToCloudinary(file, 'blog-posts');
        imageUrl = uploadResult.url;
        publicId = uploadResult.public_id;
      } catch (error) {
        return {
          errors: { file: ['Failed to upload new image'] },
          message: 'Image upload failed',
          success: false,
        };
      }
    }

    // Find or create tag
    const tagRecord = await findOrCreateTag(tag);

    // Update post
    await prisma.post.update({
      where: { post_id: postId },
      data: {
        title,
        content,
        url: imageUrl,
        coudinaryId: publicId,
        tag_id: tagRecord.tag_id,
        isPublished,
        updated_at: new Date(),
      },
    });

    revalidatePath('/admin');
    revalidatePath('/posts');
    revalidatePath('/');

    return {
      message: 'Post updated successfully!',
      success: true,
    };
  } catch (error) {
    console.error('Update post error:', error);
    return {
      message: error instanceof Error ? error.message : 'Failed to update post',
      success: false,
    };
  }
}

export async function getExistingTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { tag: 'asc' },
      select: { tag_id: true, tag: true },
    });
    return tags;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}