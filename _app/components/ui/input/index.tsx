import { cn } from "@nextui-org/react";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  wrapperClass?: string;
  error?: boolean; // 👈 add this
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      endContent,
      startContent,
      wrapperClass,
      error, // 👈 destructure it
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          error ? "border-red-500 focus-within:ring-red-500" : "border-input",
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
