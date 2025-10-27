// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
//   } from "@/app/ui/card";
//   import { TabsContent } from "@/app//ui/tabs";
  
  
//   export default function EditPostTab({ selectedPost, children }) {
//     return (
//       <TabsContent value="edit">
//         <Card>
//           <CardHeader>
//             <CardTitle>Edit Post</CardTitle>
//             <CardDescription>Edit a post here.</CardDescription>
//           </CardHeader>
//           <CardContent>{selectedPost && children}</CardContent>
//         </Card>
//       </TabsContent>
//     );
//   }

// app/components/private/EditPost/EditPostTab.tsx
import { TabsContent } from '@/app/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import EditPostForm from './EditPostForm';
import type { Post, User, Tag } from '@prisma/client';

type PostWithRelations = Post & {
  User: User;
  Tag: Tag | null;
};

type Props = {
  selectedPost: PostWithRelations | null;
  setSelectedPost: (post: PostWithRelations | null) => void;
};

export default function EditPostTab({ selectedPost, setSelectedPost }: Props) {
  return (
    <TabsContent value="edit">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
          <CardDescription>
            {selectedPost
              ? `Editing: ${selectedPost.title}`
              : 'Select a post to edit from the Posts tab.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedPost ? (
            <EditPostForm post={selectedPost} setSelectedPost={setSelectedPost} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No post selected
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}