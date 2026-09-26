import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BookReaderProps {
  content: string;
}

/**
 * Renders manuscript markdown.
 *
 * Styling comes from the `.reading` class in globals.css. The previous version
 * used `prose prose-stone`, but `@tailwindcss/typography` was never a
 * dependency, so those classes matched nothing and chapters rendered with no
 * typographic styling at all.
 */
export default function BookReader({ content }: BookReaderProps) {
  return (
    <div className="reading" lang="bn">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
