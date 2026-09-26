/** The book as a dimensional object — cover, spine and page edge in CSS 3D. */
export default function BookObject({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="book" aria-hidden="true">
      <div className="book-back" />
      <div className="book-spine" />
      <div className="book-pages" />
      <div className="book-cover">
        <span className="meta !text-[0.55rem] !text-[rgb(238_234_225/0.6)]">{subtitle}</span>
        <span className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#f3eee3]">
          {title}
        </span>
      </div>
      <div className="book-shadow" />
    </div>
  );
}
