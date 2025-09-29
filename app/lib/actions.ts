"use server";
import { z } from "zod";
import {prisma} from "@/app/lib/prisma";
import {revalidatePath} from 'next/cache';
import { redirect } from "next/navigation";
const FormSchema = z.object({
  title: z.string({
    error: 'A post cannot publish without a title.',
  }),
  content: z.string({
    error: 'A post should contain something atleast!'
  }),
  author_id: z.number(),
  isPublished: z.boolean({
    error: 'Publish it or not already?'
  }),
  tag_id: z.coerce.number().gt(0, {error: 'Should select a tag atleast!'}),
});

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        isPublished?: string[];
        tag_id?: string[]
    };
    message?: string | null;
}

const CreatePost = FormSchema;

export async function deletePost(id: number) {
    await prisma.post.delete({
        where: {
            post_id: id,
        }
    });
    revalidatePath('/')
}

export async function editPost(id: number,formData: FormData) {
    const {author_id, tag_id, title, content, isPublished} = CreatePost.parse({
        author_id: 1,
        tag_id: formData.get("tag"),
        title: formData.get("title"),
        content: formData.get("content"),
        isPublished: formData.get("publishStatus") === 'publish' ? true : false,
    })
    await prisma.post.update({
        where: {
            post_id: id
        },
        data: {
            author_id: author_id,
            title: title,
            content: content,
            isPublished: isPublished,
            tag_id: tag_id,
            updated_at: new Date(),
        }
    })
    revalidatePath('/');
    redirect('/');
}
export async function createPost(prevState: State,formData: FormData) {
    const validatedFields = CreatePost.safeParse({ //this will return an object wheather success or error
        author_id: 1,
        tag_id: formData.get("tag"),
        title: formData.get("title"),
        content: formData.get("content"),
        isPublished: formData.get("publishStatus") === 'publish' ? true : false,
    })
    if(!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            message: 'Check the form inputs again, something is missing!!!'
        }
    }
    const {author_id, tag_id, title, content, isPublished} = validatedFields.data;
    try {
        await prisma.post.create({
          data: {
              title: title,
              content: content,
              author_id: author_id,
              tag_id: tag_id,
              isPublished: isPublished,
              updated_at: new Date(),
          }
        });
        
    } catch (error) {
        return {
            message: 'Database error: Failed to create Post.'
        }        
    }
  revalidatePath('/');
  redirect('/');
}
