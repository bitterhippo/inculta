"use client";

import styles from "./styles.module.css";
import { useDroppable } from "@dnd-kit/core";
import { CanvasProps } from "./types";
import { forwardRef } from "react";

export const Canvas = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const { setNodeRef } = useDroppable({ id: "canvas" });

    const combinedRef = (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <div ref={combinedRef} className={styles.Canvas}>
        {children}
      </div>
    );
  },
);
