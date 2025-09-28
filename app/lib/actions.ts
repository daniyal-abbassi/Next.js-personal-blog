"use server";
import { z } from "zod";
import {prisma} from "@/app/lib/prisma";

const FormSchema = z.object({
  title: z.string(),
  content: z.string(),
  author_id: z.number(),
  isPublished: z.boolean(),
  tag_id: z.coerce.number(),
});

const CreatePost = FormSchema;

export async function createPost(formData: FormData) {
    const {author_id, tag_id, title, content, isPublished} = CreatePost.parse({
        author_id: 1,
        tag_id: formData.get("tag"),
        title: formData.get("title"),
        content: formData.get("content"),
        isPublished: formData.get("publishStatus") === 'publish' ? true : false,
    })
  await prisma.post.create({
    data: {
        title: title,
        content: content,
        author_id: author_id,
        tag_id: tag_id,
        isPublished: isPublished,
        updated_at: new Date(),
    }
  })
}
