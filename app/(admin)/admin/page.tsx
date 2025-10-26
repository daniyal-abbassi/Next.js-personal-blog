import PostsTableTab from "@/app/components/private/PostsTable/PostsTableTab";
import PostsTable from "@/app/components/private/PostsTable/PostsTable";
import { Tabs, TabsList, TabsTrigger } from "@/app/ui/tabs";
// import EditPostTab from "@/pages/Admin/EditPost/EditPostTab.jsx";
// import CreatePostTab from "@/pages/Admin/CreatePost/CreatePostTab.jsx";
// import CreatePostForm from "@/pages/Admin/CreatePost/CreatePostForm.jsx";
// import EditPost from "@/pages/Admin/EditPost/EditPost.jsx";
// import { useContext, useState } from "react";
// import { useParams} from "react-router-dom";
// import usePosts from "@/hooks/usePosts.js";
// import { Loader2 } from "lucide-react";

// import { UserContext } from "@/UserProvider.jsx";
import { getPosts } from "@/app/lib/data";
export default function DashboardPage() {
  
//   const [sortValue, setSortValue] = useState("created_at");
//   const [order, setOrder] = useState("asc");
//   const [search, setSearch] = useState("");
  
//   const { postsLoading, posts, setPosts } = usePosts(sortValue, order, search);

  // get user authentication
//   const { loading, user, isAuthenticated, setUser } = useContext(UserContext);
//   const [activeTab, setActiveTab] = useState("posts");
//   const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <main className="p-4">
        <Tabs
        //   onValueChange='posts'
          value='posts'
        //   className={`${activeTab === "posts" ? "max-w-[1200px]" : "max-w-[800px]"} mx-auto mt-8 shadow-lg transition-all duration-500 ease`}
            className="max-w-[1200px]"
        >
          <TabsList className="w-full flex">
            <TabsTrigger className="flex-1" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="create">
              Create Post
            </TabsTrigger>
            
            {/* <TabsTrigger
              disabled={!selectedPost}
              className="flex-1"
              value="edit"
            >
              Edit Post
            </TabsTrigger> */}
          </TabsList>
          <PostsTableTab
            // setSortValue={setSortValue}
            // setOrder={setOrder}
            // setSearch={setSearch}
            // metadata={metadata}
          >
            <PostsTable
            //   switchTab={setActiveTab}
            //   setSelectedPost={setSelectedPost}
              // posts={paginatedPosts}
            //   posts={posts}
            //   setPosts={setPosts}
            //   author={user.username}
            />
          </PostsTableTab>
          {/* <CreatePostTab>
            <CreatePostForm
              posts={posts}
              setPosts={setPosts}
              switchTab={() => setActiveTab("posts")}
            />
          </CreatePostTab>
          <EditPostTab selectedPost={setSelectedPost}>
            {selectedPost && (
              <EditPost
              posts={posts}
                post={selectedPost}
                setPosts={setPosts}
                setActiveTab={setActiveTab}
                setSelectedPost={setSelectedPost}
                setUser={setUser}
              />
            )}
          </EditPostTab> */}
        </Tabs>
      </main>
    </>
  );
}

