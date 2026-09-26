import type { ReactNode } from "react";

type SectionHeadProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
};

/** Section opener: index/eyebrow and title on the left, context on the right. */
export default function SectionHead({ index, eyebrow, title, children, id }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <div data-reveal>
        <p className="eyebrow">
          <span className="idx">{index}</span>
          {eyebrow}
        </p>
        <h2 id={id} className="t-h2 mt-5 max-w-[16ch]">
          {title}
        </h2>
      </div>
      {children ? (
        <div data-reveal style={{ ["--d" as string]: "80ms" }} className="t-lead measure">
          {children}
        </div>
      ) : null}
    </div>
  );
}
