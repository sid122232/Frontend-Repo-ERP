import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
<PopoverPrimitive.Portal>
  <PopoverPrimitive.Content
    data-slot="popover-content"
    align={align}
    side="bottom" // Ensures the popover opens below the trigger
    sideOffset={4} // Adds space between the button and popover
    className={cn(
      "bg-black text-white", // Set background color to black and text to white
      // Add transition animations
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2", // Animation for bottom side
      "z-50 w-72 origin-(--radix-popover-content-transform-origin)", // Control width and origin
      "rounded-md border p-4 shadow-md outline-hidden", // Rounded borders, padding, and shadow
      className
    )}
    {...props}
  />
</PopoverPrimitive.Portal>

  );
}

function PopoverAnchor({
  ...props
}) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
