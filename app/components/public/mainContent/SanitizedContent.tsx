"use client";

import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

interface SanitizedContentProps {
  content: string | null;
  variant?: "h4" | "body1" | "body2";
  component?: "div" | "p" | "span";
}

export function SanitizedContent({ 
  content, 
  variant = "h4", 
  component = "div" 
}: SanitizedContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  useEffect(() => {
    const sanitizeContent = async () => {
      if (!content) {
        setSanitizedContent("");
        return;
      }
      
      try {
        const DOMPurify = (await import('dompurify')).default;
        setSanitizedContent(DOMPurify.sanitize(content));
      } catch (error) {
        console.error('Error sanitizing content:', error);
        // Fallback to original content if sanitization fails
        setSanitizedContent(content);
      }
    };
    
    sanitizeContent();
  }, [content]);

  return (
    <Typography
      variant={variant}
      component={component}
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  );
}
