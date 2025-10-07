import {prisma} from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";



export async function getPosts(search?:string){
    try {
        const whereClause = search ? {
            OR: [
                {title: {contains: search, mode: Prisma.QueryMode.insensitive}},
                {content: {contains: search, mode: Prisma.QueryMode.insensitive}},
            ],
        } 
        : {};

        const posts = await prisma.post.findMany({
            where: {
                ...whereClause,
                isPublished: true,
            },
            include: {
                User: true,
                Tag: true,
            },
            orderBy: {created_at: 'desc'}
        });
        return posts;
        
    } catch (error) {
        console.error('Failed to get all posts: ',error);
        throw new Error('database Error: Failed to get all posts.')
    }
}

export async function getTags() {
    try {
        const tags = await prisma.tag.findMany();
        return tags;
    } catch (error) {
        console.error('Failed to get all tags: ',error);
        throw new Error('database Error: Failed to get all tags.');
    }
}

export async function getPostById(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                post_id: Number(id),
            }
        })
        return post;
    } catch (error) {
        console.error('Failed to get PostById: ',error);
        throw new Error('database Error: Failed to get PostById.');
    }
}