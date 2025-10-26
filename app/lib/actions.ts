"use server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { signOut } from "@/auth";

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
// Create post function
export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    //this will return an object wheather success or error
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
    await prisma.post.create({
      data: {
        title: title,
        content: content,
        author_id: author_id,
        tag_id: tag_id,
        isPublished: isPublished,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to create Post.",
    };
  }
  revalidatePath("/posts");
  redirect("/posts");
}
