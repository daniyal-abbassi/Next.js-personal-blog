"use client";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  page: number;
}

export default function PaginationControls({ totalPages, page }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_: any, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(value));
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
      <Pagination
        hidePrevButton
        hideNextButton
        count={totalPages}
        page={page}
        onChange={handleChange}
        boundaryCount={2}
        siblingCount={1}
      />
    </Box>
  );
}
