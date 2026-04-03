import { useEffect } from "react";
import { useContent } from "@/context/ContentContext";

/** Keeps <title> and <meta name="description"> in sync with CMS content. */
export function MetaTags() {
  const { content } = useContent();
  const { seoTitle, seoDescription } = content.identity;

  useEffect(() => {
    if (seoTitle) {
      document.title = seoTitle;
    }
  }, [seoTitle]);

  useEffect(() => {
    if (seoDescription) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = seoDescription;
    }
  }, [seoDescription]);

  return null;
}
