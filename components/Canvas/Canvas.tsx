"use client";

import { forwardRef } from "react";
import styles from "./styles.module.css";
import { useDroppable } from "@dnd-kit/core";
import { CanvasProps } from "./types";

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ children, backgroundColour, backgroundImage, ...rest }, ref) => {
    const { setNodeRef } = useDroppable({ id: "canvas" });

    const combinedRef = (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const backgroundStyle = backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {
          backgroundColor: backgroundColour ?? "white",
        };

    return (
      <div
        style={backgroundStyle}
        ref={combinedRef}
        className={styles.Canvas}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
