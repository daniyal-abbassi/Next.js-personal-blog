import {prisma} from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";



export async function getPosts(search?:string,tag?:string, page:number = 1, pageSize:number = 6){
    try {
        const whereClause : Prisma.PostWhereInput = {
            isPublished: true,
        };


        if(search) {
            whereClause.OR = [
                {title: {contains: search, mode: Prisma.QueryMode.insensitive}},
                {content: {contains: search, mode: Prisma.QueryMode.insensitive}},
            ]
        };

        if(tag && tag !== 'All categories') {
            whereClause.Tag = {
                tag: {equals: tag},
            }
        }

        const posts = await prisma.post.findMany({
            where: whereClause,
            include: {
                User: true,
                Tag: true,
            },
            orderBy: {created_at: 'desc'},
            skip: Math.max(0, (page - 1) * pageSize),
            take: pageSize,
        });
        return posts;
        
    } catch (error) {
        console.error('Failed to get all posts: ',error);
        throw new Error('database Error: Failed to get all posts.')
    }
}

export async function getPostsCount(search?:string, tag?:string) {
    try {
        const whereClause : Prisma.PostWhereInput = {
            isPublished: true,
        };

        if(search) {
            whereClause.OR = [
                {title: {contains: search, mode: Prisma.QueryMode.insensitive}},
                {content: {contains: search, mode: Prisma.QueryMode.insensitive}},
            ]
        };

        if(tag && tag !== 'All categories') {
            whereClause.Tag = {
                tag: {equals: tag},
            }
        }

        const total = await prisma.post.count({ where: whereClause });
        return total;
    } catch (error) {
        console.error('Failed to count posts: ',error);
        throw new Error('database Error: Failed to count posts.')
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

export async function getPostById(id: number) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                post_id: id,
            },
            include: {
                User: true,
                Tag: true
            }
        })
        return post;
    } catch (error) {
        console.error('Failed to get PostById: ',error);
        throw new Error('database Error: Failed to get PostById.');
    }
}