import type { MetadataRoute } from "next";
import { getChapters } from "@/lib/book";
import { projects } from "@/lib/content";
import { indexItems, site } from "@/lib/site";

/**
 * Static sitemap. `output: "export"` writes this to /sitemap.xml at build.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified, priority: 1 },
    ...indexItems.map((item) => ({
      url: url(item.href),
      lastModified,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: url(`/work/${project.slug}`),
      lastModified,
      priority: project.featured ? 0.8 : 0.7,
    })),
    {
      url: url("/writing/books/concern-for-consciousness"),
      lastModified,
      priority: 0.7,
    },
    ...getChapters().map((chapter) => ({
      url: url(`/writing/books/concern-for-consciousness/${chapter.number}`),
      lastModified,
      priority: 0.5,
    })),
  ];
}
