import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// export const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

export const h1Variants = cva(
  "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  {
    variants: {
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const h2Variants = cva(
  "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  {
    variants: {
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const h3Variants = cva(
  "scroll-m-20 text-2xl font-semibold tracking-tight",
  {
    variants: {
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const h4Variants = cva(
  "scroll-m-20 text-xl font-semibold tracking-tight",
  {
    variants: {
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const pVariants = cva("leading-7 [&:not(:first-child)]:mt-6", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const blockquoteVariants = cva("mt-6 border-l-2 pl-6 italic", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const ulVariants = cva("ml-6 list-disc [&>li]:mt-0", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const codeVariants = cva(
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  {
    variants: {
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

export const leadVariants = cva("text-xl text-muted-foreground", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const largeVariants = cva("text-lg font-semibold", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const smallVariants = cva("text-sm font-medium leading-none", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const mutedVariants = cva("text-sm text-muted-foreground", {
  variants: {
    color: {
      primary: "",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
