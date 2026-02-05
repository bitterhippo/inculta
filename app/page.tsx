"use client";

import { useState } from "react";
import { SideBar, ExpandableContainer, DragIcon, Canvas } from "@/components";
import styles from "./styles.module.css";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);

  //TODO: Extract into helpers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // how many pixels the cursor must move to start dragging
      },
    }),
  );

  //TODO: Extract into helpers
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      // Something was dropped on a target
      console.log(`${active.id} was dropped over ${over.id}`);
      // Here you could:
      // - create a new instance in your grid
      // - call an API to save state
    }

    // Reset active item for DragOverlay
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={() => setActiveId(null)}
      onDragCancel={() => setActiveId(null)}
    >
      <div className={styles.MainViewContainer}>
        <SideBar>
          <ExpandableContainer categoryName="test">
            <DragIcon id={"dummy-icon"} />
          </ExpandableContainer>
        </SideBar>
        <div className={styles.ViewContainer}>
          <div className={styles.CanvasContainer}>
            <Canvas></Canvas>
          </div>
        </div>
      </div>
      <DragOverlay>{activeId ? <DragIcon id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
}
