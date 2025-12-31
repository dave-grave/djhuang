import Image from "next/image";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

type ImgProps = React.ComponentPropsWithoutRef<"img"> & {
  // rehype-img-size may add numeric width/height or strings — accept both
  width?: number | string;
  height?: number | string;
};

const MDXComponents: MDXComponentsType = {
  img: (props: ImgProps) => {
    return (
      <figure className="flex flex-col items-center">
        <div className="">
          <Image
            // next/image expects numeric width/height; coerce if strings
            src={props.src as string}
            width={
              typeof props.width === "string"
                ? parseInt(props.width, 10)
                : props.width || 1200
            }
            height={
              typeof props.height === "string"
                ? parseInt(props.height, 10)
                : props.height || 675
            }
            alt={props.alt || "Blog post image"}
            className="rounded-lg shadow-lg block h-auto w-full object-cover border dark:border-gray-200 border-gray-800"
          />
        </div>

        {props.alt && (
          <figcaption className="mt-2 text-center text-sm text-gray-500 italic max-w-[80%]">
            {props.alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

export default MDXComponents;
