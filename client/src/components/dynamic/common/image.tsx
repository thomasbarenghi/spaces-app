import ImageNext from "next/image";

type ImageProps = {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  layout?: "fixed" | "intrinsic" | "responsive" | "fill" | undefined;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" | undefined;
  containerClassName?: string;
  aspectRatio?: string;
  rounded?: string;
  onClick?: () => void;
};

export default function Image({
  src,
  alt,
  width,
  height,
  layout,
  containerClassName,
  aspectRatio,
  rounded,
  onClick,
}: ImageProps) {
  return (
    <div
      className={`relative ${width} ${height} ${aspectRatio} ${containerClassName} `}
      onClick={onClick}
    >
      <ImageNext
        src={src}
        alt={alt}
        className={`object-cover ${rounded}`}
        // layout={layout}
        fill={layout === "fill"}
      />
    </div>
  );
}
