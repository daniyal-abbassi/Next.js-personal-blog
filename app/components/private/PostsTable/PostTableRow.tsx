'use client'

import { useState, useOptimistic, useTransition } from 'react';
import { TableCell, TableRow } from '@/app/ui/table';
import { Switch } from '@/app/ui/switch';
import { Button } from '@/app/ui/button';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { deletePost, togglePublish } from '@/app/lib/actions';
import { useToast } from '@/hooks/useToast';
import  formatDate from '@/app/utils/formatDate';
import type { Post, User, Tag } from '@prisma/client';

type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
}

type Props = {
  post: PostWithRelations;
  setSelectedPost: (post: PostWithRelations) => void;
}

export default function PostTableRow({ post, setSelectedPost }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Optimistic UI for publish toggle
  const [optimisticPublished, setOptimisticPublished] = useOptimistic(
    post.isPublished,
    (state, newValue: boolean) => newValue
  );

  const handleDelete = async () => {
    if (!confirm(`Delete "${post.title}"?`)) return;

    setIsDeleting(true);
    
    try {
      const result = await deletePost(post.post_id);
      
      if (result.success) {
        toast({
          title: "Successfully deleted post!",
          description: `Title: ${post.title}`,
        });
        router.refresh(); // Revalidate server component
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Post deletion failed!",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    startTransition(async () => {
      // Optimistic update
      setOptimisticPublished(!optimisticPublished);

      try {
        const result = await togglePublish(post.post_id, !post.isPublished);
        
        if (result.success) {
          toast({
            title: result.data.isPublished ? "Published!" : "Unpublished!",
            description: `Title: ${post.title}`,
          });
          router.refresh();
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        // Revert optimistic update on error
        setOptimisticPublished(post.isPublished);
        toast({
          title: "Action failed!",
          description: error instanceof Error ? error.message : 'Unknown error',
          variant: "destructive",
        });
      }
    });
  };

  const handleEdit = () => {
    setSelectedPost(post);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'edit');
    router.push(`?${params.toString()}`);
  };

  return (
    <TableRow>
      <TableCell>
        {post.url && (
          <img
            className="rounded-sm object-cover"
            src={post.url}
            alt={post.title}
            width={45}
            height={45}
          />
        )}
      </TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell className="font-semibold">{post.User.username}</TableCell>
      <TableCell>{formatDate(post.created_at)}</TableCell>
      <TableCell>{formatDate(post.updated_at)}</TableCell>
      <TableCell>
        <Switch
          checked={optimisticPublished}
          onCheckedChange={handleTogglePublish}
          disabled={isPending}
        />
      </TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={handleEdit}>
          Edit <SquarePen width={14} />
        </Button>
      </TableCell>
      <TableCell className="text-right">
        <Button
          className="align-middle rounded-md h-min px-1 py-1"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" width={20} height={20} />
          ) : (
            <Trash2 width={20} height={20} />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
}