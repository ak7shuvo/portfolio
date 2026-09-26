import type { ReactNode } from "react";
import ContourField from "@/components/contour-field";

type PageHeadProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Inner-page header: index + eyebrow, display title, lead, optional actions. */
export default function PageHead({ index, eyebrow, title, lead, children }: PageHeadProps) {
  return (
    <header className="page-head">
      <ContourField className="contours" />
      <div className="wrap">
        <p className="eyebrow enter" style={{ ["--e" as string]: 0 }}>
          <span className="idx">{index}</span>
          {eyebrow}
        </p>
        <h1 className="t-display enter mt-6 max-w-[18ch]" style={{ ["--e" as string]: 1 }}>
          {title}
        </h1>
        {lead ? (
          <p className="t-lead enter measure mt-6" style={{ ["--e" as string]: 2 }}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="enter mt-9 flex flex-wrap gap-3" style={{ ["--e" as string]: 3 }}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
