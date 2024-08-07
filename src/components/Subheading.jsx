import { cva } from "class-variance-authority";
import clsx from "clsx";

const SubheadingVariants = cva("font-subheading font-semibold", {
  variants: {
    size: {
      "4xl": "text-3xl md:text-4xl",
      "3xl": "text-2xl md:text-3xl",
      "2xl": "text-xl md:text-2xl",
      xl: "text-lg md:text-xl",
      lg: "text-md md:text-lg",
      md: "text-md",
      base: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },

    color: { muted: "text-queen-black/60" },
  },
  defaultVariants: {
    size: "base",
  },
});

const Subheading = ({ as = "p", size, color, className, children }) => {
  const Tag = as;

  return (
    <Tag className={clsx(SubheadingVariants({ size, color }), className)}>
      {children}
    </Tag>
  );
};

export default Subheading;
