import {prisma} from "@/app/lib/prisma";



export async function getPosts(){
    try {
        const posts = await prisma.post.findMany();
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