/* eslint-disable @next/next/no-img-element -- static export serves images as-is */
import type { ProjectImage } from "@/lib/content";

/** Browser-chrome or phone-bezel frame around a real product screenshot. */
export default function DeviceFrame({
  image,
  url,
  eager = false,
  className = "",
}: {
  image: ProjectImage;
  url?: string;
  eager?: boolean;
  className?: string;
}) {
  const img = (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-auto w-full"
    />
  );

  if (image.frame === "mobile") {
    return <div className={`frame-mobile ${className}`}>{img}</div>;
  }
  return (
    <div className={`frame-desktop ${className}`}>
      <div className="chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        {url ? <span>{url}</span> : null}
      </div>
      {img}
    </div>
  );
}
