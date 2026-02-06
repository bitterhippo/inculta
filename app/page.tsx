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
  const [items, setItems] = useState<string[]>([]);

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
    const { active, over, delta } = event;

    if (over) {
      console.log(`${active.id} was dropped over ${over.id}`);
    }

    //Initialize the component into state for the purpose of mapping it out
    if (over?.id === "canvas") {
      let currentDragObject = {
        name: active.id,
        delta: delta,
      };
      setItems((prev) => [...prev, currentDragObject]);
    }

    // Reset active item for DragOverlay
    setActiveId(null);
  };

  console.log(items);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
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
