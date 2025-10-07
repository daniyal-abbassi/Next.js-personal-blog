import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import { DeletePost, EditPost } from "@/app/ui/buttons";
import { Post } from "@prisma/client";
import { signOut, auth } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Search } from "../components/public/mainContent/Search";
import Grid from "@mui/material/Grid";
import { StyledLink, StyledTypography, SyledCard, SyledCardContent } from "../ui/styledThemes";
import CardMedia from "@mui/material/CardMedia";
import { Author } from "../components/public/mainContent/Author";
import Chip from "@mui/material/Chip";

interface PostProps {
  post: Post[];
}

export default async function Home() {


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

    {/* TAGS BOX */}
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
      {/* TAG-BOX */}
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          gap: 3,
          overflow: "auto",
        }}
      >
        {/* EACH SINGLE TAG */}
        <Chip
          onClick={() => handleClick("All categories")}
          size="medium"
          label="All categories"
          color={activeTag === "All categories" ? "primary" : "default"}
          variant={activeTag === "All categories" ? "filled" : "outlined"}
        />
        {/* render specific tag */}
        {tags && tags.length > 0
          ? tags.map((tag, i) => (
              <Chip
                key={i}
                onClick={() => handleClick(tag)}
                size="medium"
                label={tag}
                color={activeTag === tag ? "primary" : "default"}
                variant={activeTag === tag ? "filled" : "outlined"}
                // sx={{
                //   backgroundColor: "transparent",
                //   border: "none",
                // }}
              />
            ))
          : null}
      </Box>
      {/* SEARCH-SECTION */}
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

    {/* POSTS GRID */}
    {/* POSTS GRID - Rendering maximum 6 posts with fixed layout */}
    <Grid container spacing={2} columns={12}>
      {/* Post 0 (Top Left) - md={6} */}
      {displayedPosts[0] && (
        <Grid item size={{ xs: 12, md: 6 }} key={displayedPosts[0].post_id}>
          {/* navigate to specific post*/}
          <StyledLink to={`/post/${displayedPosts[0].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)} // Index 0
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            >
              {displayedPosts[0].url && (
                <CardMedia
                  component="img"
                  alt={displayedPosts[0].title}
                  image={displayedPosts[0].url}
                  sx={{
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
              )}
              <SyledCardContent>
                {displayedPosts[0].tag && displayedPosts[0].tag.tag && (
                  <Typography gutterBottom variant="caption" component="div">
                    {displayedPosts[0].tag.tag}
                  </Typography>
                )}
                <Typography gutterBottom variant="h6" component="div">
                  {displayedPosts[0].title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(displayedPosts[0].content)
                  }}
                />
              </SyledCardContent>
              {displayedPosts[0].author && (
                <Author author={displayedPosts[0].author.username} date={displayedPosts[0].created_at}/>
              )}
            </SyledCard>
          </StyledLink>
        </Grid>
      )}

      {/* Post 1 (Top Right) - md={6} */}
      {displayedPosts[1] && (
        <Grid item size={{ xs: 12, md: 6 }} key={displayedPosts[1].post_id}>
          <StyledLink to={`/post/${displayedPosts[1].post_id}`}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)} // Index 1
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            {displayedPosts[1].url && (
              <CardMedia
                component="img"
                alt={displayedPosts[1].title}
                image={displayedPosts[1].url}
                aspect-ratio="16 / 9"
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
            )}
            <SyledCardContent>
              {displayedPosts[1].tag && displayedPosts[1].tag.tag && (
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[1].tag.tag}
                </Typography>
              )}
              <Typography gutterBottom variant="h6" component="div">
                {displayedPosts[1].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(displayedPosts[1].content)
                }}
              />
            </SyledCardContent>
            {displayedPosts[1].author && (
              <Author author={displayedPosts[1].author.username} date={displayedPosts[1].created_at}/>
            )}
          </SyledCard>
          </StyledLink>
        </Grid>
      )}

      {/* Post 2 (Middle Left) - md={4} */}
      {displayedPosts[2] && (
        <Grid item size={{ xs: 12, md: 4 }} key={displayedPosts[2].post_id}>
          <StyledLink to={`/post/${displayedPosts[2].post_id}`}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)} // Index 2
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            {displayedPosts[2].url && (
              <CardMedia
                component="img"
                alt={displayedPosts[2].title}
                image={displayedPosts[2].url}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
            )}
            <SyledCardContent>
              {displayedPosts[2].tag && displayedPosts[2].tag.tag && (
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[2].tag.tag}
                </Typography>
              )}
              <Typography gutterBottom variant="h6" component="div">
                {displayedPosts[2].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(displayedPosts[2].content)
                }}
              />
            </SyledCardContent>
            {displayedPosts[2].author && (
              <Author author={displayedPosts[2].author.username} date={displayedPosts[2].created_at}/>
            )}
          </SyledCard>
          </StyledLink>
        </Grid>
      )}

      {/* Posts 3 and 4 (Middle Stacked) - md={4} - Render as ONE Grid Item */}
      {/* Check if BOTH post 3 and post 4 exist before rendering this combined block */}
      {displayedPosts[3] && displayedPosts[4] && (
        <Grid item size={{ xs: 12, md: 4 }} key={`posts-3-4-stacked`}>
          {" "}
          {/* Unique key for the combined item */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {/* Card for Post 3 (Above) - No Image */}
            <StyledLink to={`/post/${displayedPosts[3].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(3)} // Index 3
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  {displayedPosts[3].tag && displayedPosts[3].tag.tag && (
                    <Typography
                      gutterBottom
                      variant="caption"
                      component="div"
                    >
                      {displayedPosts[3].tag.tag}
                    </Typography>
                  )}
                  <Typography gutterBottom variant="h6" component="div">
                    {displayedPosts[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(displayedPosts[3].content)
                    }}
                  />
                </div>
              </SyledCardContent>
              {displayedPosts[3].author && (
                <Author author={displayedPosts[3].author.username} date={displayedPosts[3].created_at}/>
              )}
            </SyledCard>
              </StyledLink>
            {/* Card for Post 4 (Below) - No Image */}
            <StyledLink to={`/post/${displayedPosts[4].post_id}`}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(4)} // Index 4
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? "Mui-focused" : ""}
              sx={{ height: "100%" }}
            >
              <SyledCardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  {displayedPosts[4].tag && displayedPosts[4].tag.tag && (
                    <Typography
                      gutterBottom
                      variant="caption"
                      component="div"
                    >
                      {displayedPosts[4].tag.tag}
                    </Typography>
                  )}
                  <Typography gutterBottom variant="h6" component="div">
                    {displayedPosts[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(displayedPosts[4].content)
                    }}
                  />
                </div>
              </SyledCardContent>
              {displayedPosts[4].author && (
                <Author author={displayedPosts[4].author.username} date={displayedPosts[4].created_at}/>
              )}
            </SyledCard>
            </StyledLink>
          </Box>
        </Grid>
      )}

      {/* Post 5 (Middle Right / Bottom Left) - md={4} */}
      {displayedPosts[5] && (
        <Grid item size={{ xs: 12, md: 4 }} key={displayedPosts[5].post_id}>
          <StyledLink to={`/post/${displayedPosts[5].post_id}`}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)} // Index 5
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            {displayedPosts[5].url && (
              <CardMedia
                component="img"
                alt={displayedPosts[5].title}
                image={displayedPosts[5].url}
                sx={{
                  height: { sm: "auto", md: "50%" },
                  aspectRatio: { sm: "16 / 9", md: "" },
                }}
              />
            )}
            <SyledCardContent>
              {displayedPosts[5].tag && displayedPosts[5].tag.tag && (
                <Typography gutterBottom variant="caption" component="div">
                  {displayedPosts[5].tag.tag}
                </Typography>
              )}
              <Typography gutterBottom variant="h6" component="div">
                {displayedPosts[5].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(displayedPosts[5].content)
                }}
              />
            </SyledCardContent>
            {displayedPosts[5].author && (
              <Author author={displayedPosts[5].author.username} date={displayedPosts[5].created_at}/>
            )}
          </SyledCard>
          </StyledLink>
        </Grid>
      )}
    </Grid>

    {/* PAGINATION SECTION */}
    <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
      <Pagination
        hidePrevButton
        hideNextButton
        count={trueTotalPage}
        page={currentPage}
        onChange={hadnlePageChange}
        boundaryCount={2}
        siblingCount={1}
      />
    </Box>
  </Box>
  );
}
