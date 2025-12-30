import Image from "next/image";

const MDXComponents = {
  p: (props: any) => {
    // Check if p contains an image, and if so center it.
    // This is because MDX wraps images in <p> by default.
    const isImage =
      props.children?.type === "img" ||
      (Array.isArray(props.children) &&
        props.children.some((child: any) => child.type === "img"));

    if (isImage) {
      return <div className="flex justify-center">{props.children}</div>;
    }
    // Otherwise render a normal paragraph
    return (
      <p className="mb-6 leading-relaxed text-gray-800 dark:text-gray-200">
        {props.children}
      </p>
    );
  },

  img: (props: any) => {
    return (
      <figure className="flex flex-col items-center">
        <div className="">
          <Image
            {...props}
            // If rehype-img-size is working, props.width/height will be used
            // Otherwise, we provide defaults
            width={props.width || 1200}
            height={props.height || 675}
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
