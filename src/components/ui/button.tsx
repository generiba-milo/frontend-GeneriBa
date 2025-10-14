import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Splash3dButton from "@/components/3d-splash-button";

import { buttonVariants } from "./buttonVariants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Use the 3D splash button wrapper for main buttons (default true for variant 'default') */
  splash3d?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "default", size = "default", asChild = false, splash3d, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classNames = cn(buttonVariants({ variant, size, className }));

    // default behavior: enable splash3d when variant is 'default' unless explicitly disabled
    const useSplash = typeof splash3d === "boolean" ? splash3d : variant === "default";

  if (useSplash) {
      // If asChild is used, render the Slot content inside the Splash3dButton
      if (asChild) {
        // cast onClick to the flexible event signature Splash3dButton expects
        const splashOnClick = rest.onClick as unknown as ((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void) | undefined;
        return (
          <Splash3dButton className={classNames} onClick={splashOnClick} disabled={rest.disabled}>
            <Comp ref={ref as unknown as React.Ref<HTMLButtonElement>} {...(rest as ButtonProps)}>
              {children}
            </Comp>
          </Splash3dButton>
        );
      }

      // Normal case: render the button children/content inside the Splash3dButton
      const splashOnClick = rest.onClick as unknown as ((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void) | undefined;
      return (
        <Splash3dButton className={classNames} onClick={splashOnClick} disabled={rest.disabled}>
          {/* keep markup that matches previous visual layout */}
          <span className={"inline-flex items-center justify-center"}>{children}</span>
        </Splash3dButton>
      );
    }

    return <Comp className={classNames} ref={ref} {...(rest as ButtonProps)}>{children}</Comp>;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
