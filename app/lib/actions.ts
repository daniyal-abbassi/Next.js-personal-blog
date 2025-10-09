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

    const existingUser = await prisma.user.findUnique({
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
      await signIn("credentials", {
        username,
        password,
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return "Auto-login failed. Please sign in manually.";
      }
      throw error;
    }

    return "success";
  } catch (error) {
    console.error("Sign-up error:", error);
    return "Something went wrong!";
  }
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
export async function deletePost(id: number) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized: You must be logged in to delete posts");
  }

  await prisma.post.delete({
    where: {
      post_id: id,
    },
  });
  revalidatePath("/posts");
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
