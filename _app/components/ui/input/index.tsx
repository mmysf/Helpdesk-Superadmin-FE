import * as React from "react";

import { cn } from "@/helpers/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  wrapperClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, endContent, startContent, wrapperClass, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          wrapperClass,
        )}
      >
        {startContent}
        <input
          type={type}
          className={cn(
            "flex border-none w-full bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0  disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {endContent}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
