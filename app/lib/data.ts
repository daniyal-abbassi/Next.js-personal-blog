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