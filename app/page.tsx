"use client";

import { useState, useRef, useEffect } from "react";
import {
  SideBar,
  ExpandableContainer,
  Icon,
  Canvas,
  DraggableWrapper,
} from "@/components";
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

    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    const x = delta.x - canvasRect.left + 10;
    const y = delta.y - canvasRect.top + 52;

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
            <DraggableWrapper id="dummy-id" inToolbar={true}>
              <Icon />
            </DraggableWrapper>
          </ExpandableContainer>
        </SideBar>
        <div className={styles.ViewContainer}>
          <div className={styles.CanvasContainer}>
            <Canvas ref={canvasRef}>
              {items.map((currentItem, i) => (
                <DraggableWrapper
                  key={`${currentItem?.id}-${i}`}
                  id={"dummy-icon"}
                  x={currentItem.x}
                  y={currentItem.y}
                >
                  <Icon key={`${currentItem?.id}-${i}`}></Icon>
                </DraggableWrapper>
              ))}
            </Canvas>
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <DraggableWrapper id={activeId}>
            <Icon />
          </DraggableWrapper>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
