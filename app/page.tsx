"use client";

import { useState, useRef, useEffect } from "react";
import { SideBar, ExpandableContainer, DragIcon, Canvas } from "@/components";
import { PlacedItem } from "./types";
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
  const [items, setItems] = useState<PlacedItem[]>([]);

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

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

    const canvasRect = canvasRef?.current.getBoundingClientRect();
    const x = pos.x - canvasRect.left;
    const y = pos.y - canvasRect.top;

    //Initialize the component into state for the purpose of mapping it out
    if (over?.id === "canvas") {
      let currentDragObject = {
        x,
        y,
      };
      setItems((prev) => [...prev, currentDragObject]);
    }

    // Reset active item for DragOverlay
    setActiveId(null);
  };

  useEffect(() => {
    const handler = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  console.log(pos);
  console.log(canvasRef);

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
            <Canvas ref={canvasRef}>
              {items.map((currentItem, i) => (
                <DragIcon
                  key={`${currentItem?.name}-${i}`}
                  xValue={currentItem?.x}
                  yValue={currentItem?.y}
                ></DragIcon>
              ))}
            </Canvas>
          </div>
        </div>
      </div>
      <DragOverlay>{activeId ? <DragIcon id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
}
