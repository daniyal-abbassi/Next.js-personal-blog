//Single Post component
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos"
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getNextPost, getPreviousPost } from "@/app/lib/data";

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

//STYLES LINK 
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none"
  }
});

export default async function Page(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
        notFound();
    }

    const [post, nextPost, previousPost] = await Promise.all([
        getPostById(id),
        getNextPost(id),
        getPreviousPost(id)
    ]);

    if(!post) {
        notFound();
    }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Link href="/" passHref>
      <IconButton
        color="primary"
        edge="start"
        aria-label="ALL POSTS"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
        >
        <ArrowBackIosNewIcon />
        <Typography>ALL POSTS</Typography>
      </IconButton>
          </Link>
      <Chip
        size="medium"
        label={post.Tag?.tag || 'No tag'}
        color="primary"
        variant="outlined"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
      />

      <Typography variant="h1">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="primary">
          By {post.User?.username}
        </Typography>
        <Typography variant="caption" color="warning">
          {format(new Date(post.created_at), "dd MMMM yyyy")}
        </Typography>
      </CardContent>
      {post.url && (
        <CardMedia
          component="img"
          alt={post.title}
          image={post.url}
          sx={{ 
            maxWidth: "90%", 
            maxHeight: "90%", 
            borderRadius: "10px",
            aspectRatio: "16 / 9"
          }}
        />
      )}
      <Typography
        variant="h4"
        component="div"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content || ""),
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        {/* PREVIOUS POST */}
        {previousPost ? (
          <Box
            sx={{ width: { xs: "fit-content", md: "fit-content", overflow: "auto" } }}
          >
            <StyledLink 
              href={`/${previousPost.post_id}`} 
              sx={{ display: "flex", flexDirection: "row", gap: 1 }}
            >
              <ArrowBackIcon />
              <Typography>Previous Post</Typography>
            </StyledLink>
          </Box>
        ) : (
          <Box sx={{ width: { xs: "fit-content", md: "fit-content" } }} />
        )}

        {/* NEXT POST */}
        {nextPost ? (
          <Box
            sx={{ width: { xs: "fit-content", overflow: "auto" } }}
          >
            <StyledLink 
              href={`/${nextPost.post_id}`} 
              sx={{ display: "flex", flexDirection: "row", gap: 1 }}
            >
              <Typography>Next Post</Typography>
              <ArrowForwardIosIcon />
            </StyledLink>
          </Box>
        ) : (
          <Box sx={{ width: { xs: "fit-content" } }} />
        )}
      </Box>
    </Box>
  );
}
