import { cva } from "class-variance-authority";

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
