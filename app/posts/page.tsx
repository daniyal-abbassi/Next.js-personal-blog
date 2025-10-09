import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Search } from "../components/public/mainContent/Search";
import { Grid } from "@mui/material";
import { getPosts, getTags, getPostsCount } from "../lib/data";
import { TagFilter } from "../components/public/mainContent/TagFilter";
import { PostCard } from "../components/public/mainContent/PostCard";
import PaginationControls from "../components/public/mainContent/PaginationControls";

// Define the post type based on the getPosts return type
type PostWithRelations = {
  post_id: number;
  title: string;
  content: string | null;
  url: string | null;
  created_at: Date;
  updated_at: Date;
  author_id: number;
  isPublished: boolean;
  coudinaryId: string | null;
  tag_id: number;
  Tag: {
    tag_id: number;
    tag: string;
  } | null;
  User: {
    user_id: number;
    username: string;
    password: string;
  } | null;
};

export default async function Home(props: {
  searchParams?: Promise<{ search?: string; tag?: string,page?:number }>;
}) {
  const prop = await props.searchParams;
  const search = prop?.search || "";
  const tag = prop?.tag || "";
  const pageSize = 6;
  const page = Math.max(1, Number(prop?.page ?? 1));
  const [displayedPosts, totalPosts] = await Promise.all([
    getPosts(search, tag, page, pageSize),
    getPostsCount(search, tag),
  ]);
  const tags = await getTags();
  const totalPages = Math.max(1, Math.ceil(totalPosts / pageSize));

  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Personal Blog
        </Typography>
        <Typography>Fail, Fail Again, Fail Better</Typography>
      </div>
      {/* SEARCH BOX */}

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        {/* TAGS BOX */}
        <TagFilter tags={tags} />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
        </Box>
      </Box>
      {/* POSTS GRID - Using .map() while maintaining the same layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(12, 1fr)",
          },
          gap: 2,
        }}
      >
        {displayedPosts.slice(0, 6).map((post, index) => {
          // Define grid layout based on index to maintain the same visual structure
          const getGridConfig = (index: number) => {
            switch (index) {
              case 0: // Top Left - Large card
                return {
                  gridColumn: { xs: "1", md: "1 / 7" },
                  cardSx: {},
                  mediaSx: {
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                  showImage: true,
                };
              case 1: // Top Right - Large card
                return {
                  gridColumn: { xs: "1", md: "7 / 13" },
                  cardSx: {},
                  mediaSx: {
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                  showImage: true,
                };
              case 2: // Middle Left - Medium card with image
                return {
                  gridColumn: { xs: "1", md: "1 / 5" },
                  cardSx: { height: "100%" },
                  mediaSx: {
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  },
                  showImage: true,
                };
              case 3: // Middle Center - Stacked with post 4
                return {
                  gridColumn: { xs: "1", md: "5 / 9" },
                  cardSx: {
                    height: "100%",
                    contentSx: {
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    },
                  },
                  mediaSx: {},
                  showImage: false,
                  isStacked: true,
                  stackedWith: 4,
                };
              case 4: // Middle Center - Stacked with post 3 (handled in case 3)
                return null; // This will be rendered as part of case 3
              case 5: // Middle Right - Medium card with image
                return {
                  gridColumn: { xs: "1", md: "9 / 13" },
                  cardSx: { height: "100%" },
                  mediaSx: {
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  },
                  showImage: true,
                };
              default:
                return {
                  gridColumn: { xs: "1", md: "1 / 5" },
                  cardSx: { height: "100%" },
                  mediaSx: {
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                  showImage: true,
                };
            }
          };

          const config = getGridConfig(index);

          // Skip post 4 as it's handled in the stacked case
          if (config === null) return null;

          // Handle the stacked posts (3 and 4) as a single grid item
          if (config.isStacked && displayedPosts[3] && displayedPosts[4]) {
            return (
              <Box
                key={`posts-3-4-stacked`}
                sx={{
                  gridColumn: config.gridColumn,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                {/* Post 3 (Above) - No Image */}
                <PostCard
                  post={displayedPosts[3]}
                  index={3}
                  cardSx={config.cardSx}
                  mediaSx={config.mediaSx}
                  showImage={false}
                />
                {/* Post 4 (Below) - No Image */}
                <PostCard
                  post={displayedPosts[4]}
                  index={4}
                  cardSx={config.cardSx}
                  mediaSx={config.mediaSx}
                  showImage={false}
                />
              </Box>
            );
          }

          // Regular single post cards
          return (
            <Box
              key={post.post_id}
              sx={{
                gridColumn: config.gridColumn,
              }}
            >
              <PostCard
                post={post}
                index={index}
                cardSx={config.cardSx}
                mediaSx={config.mediaSx}
                showImage={config.showImage}
              />
            </Box>
          );
        })}
      </Box>
      <PaginationControls totalPages={totalPages} page={page} />
    </Box>
  );
}
