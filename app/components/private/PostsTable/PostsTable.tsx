//POSTS ARE LISTING IN THIS COMPONENT
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/ui/table";
//   import convertTimestamp from "../../../utils/convertTimestamp";
  import { Switch } from "@/app/ui/switch";
  import { Loader2, SquarePen, Trash2 } from "lucide-react";
  import { Button } from "@/app/ui/button";
//   import { useToast } from "../../../hooks/useToast";
//   import { useState } from "react";
//   import PropTypes from "prop-types";
  // import posts api for fetching stuff
//   import { deletePost, editPost } from "../../../api/posts";
import { getPosts } from "@/app/lib/data";
export default  async function PostsTable(
    // { posts, setPosts, author, setSelectedPost, switchTab }
) {
    // const { toast } = useToast();
    // const [selectedPostId, setSelectedPostId] = useState(null);
    // const [loading, setLoading] = useState(false);
  
    // //DELETE POST FUNCTION
    // async function handleDelete(e) {
      
    //   try {
    //     setLoading(true);
    //     const  post_id  = e.target.id;
        
    //     setPosts(posts.filter((post) => post.post_id !== post_id));
    //     setSelectedPostId(post_id);
  
    //     const data = await deletePost(post_id);
  
    //     toast({
    //       title: "Successfully deleted post!",
    //       description: `Title: ${data.title}`,
    //     });
    //   } catch (error) {
    //     console.error("Error deleting post", error);
    //     toast({
    //       title: "Post deletion failed!",
    //       description: error.message,
    //     });
    //   } finally {
    //     setLoading(false);
    //     setSelectedPostId(null);
    //   }
    // } //delete post function
  
    // //CHANGE IS PUBLISHED STATUS OF POST FUNCTION
    // async function handleSwitch(post) {
    //   try {
    //     const data = await editPost({ ...post, isPublished: !post.isPublished });
    //     //find post index
    //     const postIndex = posts.findIndex((post) => post.post_id === data.post_id);
    //     //create a copy of posts
    //     const postCopy = [...posts];
    //     //re-placed old post with new edited isPublished post
    //     postCopy[postIndex] = data;
    //     //re-arrange the posts with new post
    //     setPosts(postCopy);
  
    //     if (data.isPublished) {
    //       toast({
    //         title: "Successfully published post!",
    //         description: `Title: ${post.title}`,
    //       });
    //     } else {
    //       toast({
    //         title: "Successfully unpublished post!",
    //         description: `Title: ${post.title}`,
    //       });
    //     }
    //   } catch (err) {
    //     console.error("Error: ", err.message);
    //   }
    // } //edit post function
    const posts = await getPosts();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="min-w-[200px]">Title</TableHead>
            <TableHead className="w-max">Author</TableHead>
            <TableHead className="min-w-[130px]">Created</TableHead>
            <TableHead className="min-w-[130px]">Updated</TableHead>
            <TableHead className="w-max">Published</TableHead>
            <TableHead colSpan={2}></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts &&
            posts.map((post) => (
              <TableRow key={post.post_id}>
                <TableCell>
                  {post.url && <img
                    className="rounded-sm"
                    src={post.url}
                    alt="image"
                    width={45}
                  />}
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className="font-semibold">{post.User.username}</TableCell>
                {/* <TableCell>{convertTimestamp(post.created_at)}</TableCell> */}
                {/* <TableCell>{convertTimestamp(post.updated_at)}</TableCell> */}
                <TableCell className="">
                  {/* <Switch
                    checked={post.isPublished}
                    onClick={() => handleSwitch(post)}
                  /> */}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    // variant="link"
                    // onClick={() => {
                    //   setSelectedPost(post);
                    //   switchTab("edit");
                    // }}
                  >
                    Edit
                    <SquarePen width={14} />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="align-middle rounded-md h-min px-1 py-1"
                    variant={"destructive"}
                    id={String(post.post_id)}
                    // onClick={handleDelete}
                  >
                    delete button
                    {/* {loading && selectedPostId === post.post_id ? (
                      <Loader2 className="animate-spin" width={20} height={20} />
                    ) : (
                      <Trash2 />
                    )} */}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total Posts</TableCell>
            <TableCell className="text-right">{posts && posts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
