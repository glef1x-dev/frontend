import { LazyLoadImage } from "react-lazy-load-image-component";
import { CSSProperties } from "react";

type LazyLoadedImageProps = {
  alt?: string;
  height?: string;
  width?: string;
  src: string;
  style?: CSSProperties;
};

export default function LazyLoadedImage(props: LazyLoadedImageProps) {
  return (
    <LazyLoadImage
      effect="blur"
      alt={props.alt}
      width={props.width}
      src={props.src}
      height={props.height}
      style={props.style}
    />
  );
}
