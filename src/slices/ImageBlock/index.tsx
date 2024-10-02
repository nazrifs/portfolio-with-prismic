import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    // <section
    //   data-slice-type={slice.slice_type}
    //   data-slice-variation={slice.variation}
    // >
    //   Placeholder component for image_block (variation: {slice.variation})
    //   Slices
    // </section>
    <PrismicNextImage field={slice.primary.image} imgixParams={{ w: 600 }} />
  );
};

export default ImageBlock;
