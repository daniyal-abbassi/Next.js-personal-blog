"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { StyledLink, StyledTypography, SyledCard, SyledCardContent } from "@/app/ui/styledThemes";
import { Author } from "./Author";

interface PostCardProps {
  post: {
    post_id: number;
    title: string;
    content: string | null;
    url: string | null;
    created_at: Date;
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
  index: number;
  cardSx?: any;
  mediaSx?: any;
  showImage?: boolean;
}

export function PostCard({ 
  post, 
  index, 
  cardSx = {}, 
  mediaSx = {},
  showImage = true 
}: PostCardProps) {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const handleFocus = (cardIndex: number) => {
    setFocusedCardIndex(cardIndex);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <StyledLink href={`/post/${post.post_id}`}>
      <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === index ? "Mui-focused" : ""}
        sx={cardSx}
      >
        {showImage && post.url && (
          <CardMedia
            component="img"
            alt={post.title}
            image={post.url}
            sx={mediaSx}
          />
        )}
        <SyledCardContent sx={cardSx.contentSx}>
          {post.Tag && post.Tag.tag && (
            <Typography gutterBottom variant="caption" component="div">
              {post.Tag.tag}
            </Typography>
          )}
          <Typography gutterBottom variant="h6" component="div">
            {post.title}
          </Typography>
          <StyledTypography
            variant="body2"
            color="text.secondary"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content || "")
            }}
          />
        </SyledCardContent>
        {post.User && (
          <Author author={post.User.username} date={post.created_at} />
        )}
      </SyledCard>
    </StyledLink>
  );
}
