import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getPosts(
  search?: string,
  tag?: string,
  page: number = 1,
  pageSize: number = 6
) {
  try {
    const whereClause: Prisma.PostWhereInput = {
      isPublished: true,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { content: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ];
    }

    if (tag && tag !== "All categories") {
      whereClause.Tag = {
        tag: { equals: tag },
      };
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        User: true,
        Tag: true,
      },
      orderBy: { created_at: "desc" },
      skip: Math.max(0, (page - 1) * pageSize),
      take: pageSize,
    });
    return posts;
  } catch (error) {
    console.error("Failed to get all posts: ", error);
    throw new Error("database Error: Failed to get all posts.");
  }
}
export async function getAdminPosts(
  search?: string,
  sort = "created_at",
  order = "desc",
  page: number = 1,
  pageSize: number = 6
) {
  try {
    const whereClause: Prisma.PostWhereInput = {};

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { content: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ];
    }
   const orderByClause: Prisma.PostOrderByWithRelationInput = {};
    if (sort === 'created_at' || sort === 'updated_at' || sort === 'title') {
      orderByClause[sort] = order === 'asc' ? 'asc' : 'desc';
    }

    // if (tag && tag !== "All categories") {
    //   whereClause.Tag = {
    //     tag: { equals: tag },
    //   };
    // }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        User: true,
        Tag: true,
      },
      orderBy: orderByClause,
      skip: Math.max(0, (page - 1) * pageSize),
      take: pageSize,
    });
    return posts;
  } catch (error) {
    console.error("Failed to get all posts: ", error);
    throw new Error("database Error: Failed to get all posts.");
  }
}
export async function getPostsCount(search?: string, tag?: string) {
  try {
    const whereClause: Prisma.PostWhereInput = {
      isPublished: true,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { content: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ];
    }

    if (tag && tag !== "All categories") {
      whereClause.Tag = {
        tag: { equals: tag },
      };
    }

    const total = await prisma.post.count({ where: whereClause });
    return total;
  } catch (error) {
    console.error("Failed to count posts: ", error);
    throw new Error("database Error: Failed to count posts.");
  }
}

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (error) {
    console.error("Failed to get all tags: ", error);
    throw new Error("database Error: Failed to get all tags.");
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
        Tag: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to get PostById: ", error);
    throw new Error("database Error: Failed to get PostById.");
  }
}

export async function getNextPost(currentPostId: number) {
  try {
    const nextPost = await prisma.post.findFirst({
      where: {
        isPublished: true,
        post_id: {
          gt: currentPostId,
        },
      },
      include: {
        User: true,
        Tag: true,
      },
      orderBy: {
        post_id: "asc",
      },
    });
    return nextPost;
  } catch (error) {
    console.error("Failed to get next post: ", error);
    throw new Error("database Error: Failed to get next post.");
  }
}

export async function getPreviousPost(currentPostId: number) {
  try {
    const previousPost = await prisma.post.findFirst({
      where: {
        isPublished: true,
        post_id: {
          lt: currentPostId,
        },
      },
      include: {
        User: true,
        Tag: true,
      },
      orderBy: {
        post_id: "desc",
      },
    });
    return previousPost;
  } catch (error) {
    console.error("Failed to get previous post: ", error);
    throw new Error("database Error: Failed to get previous post.");
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