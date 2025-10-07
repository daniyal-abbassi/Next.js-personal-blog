"use client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TagFilter({
  tags,
}: {
  tags: 
    {
      tag_id: number;
      tag: string;
    }[]
  ;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTag = searchParams.get("tag") || "All categories";

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (tag === "All categories") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
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
        onClick={() => handleTagClick("All categories")}
        size="medium"
        label="All categories"
        color={activeTag === "All categories" ? "primary" : "default"}
        variant={activeTag === "All categories" ? "filled" : "outlined"}
      />
      {/* render specific tag */}
      {tags && tags.length > 0
        ? tags.map((tag, i) => (
            <Chip
              key={tag.tag_id}
              onClick={() => handleTagClick(tag.tag)}
              size="medium"
              label={tag.tag}
              color={activeTag === tag.tag ? "primary" : "default"}
              variant={activeTag === tag.tag ? "filled" : "outlined"}
              // sx={{
              //   backgroundColor: "transparent",
              //   border: "none",
              // }}
            />
          ))
        : null}
    </Box>
  );
}
