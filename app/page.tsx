"use client";

import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import {
  SideBar,
  ExpandableContainer,
  Icon,
  Canvas,
  DraggableWrapper,
  Dialog,
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
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

    const source = active.data.current?.source;

    console.log("source", source);

    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    //TODO: Clean up the magic numbers (they are workable for now)
    const x = delta.x - canvasRect.left + 10;
    const y = delta.y - canvasRect.top + 52;

    //Initialize the component into state for the purpose of mapping it out
    // creates new object from palette
    if (over?.id === "canvas" && source === "palette") {
      let currentDragObject: PlacedItem = {
        id: String(nanoid()),
        x,
        y,
      };
      setItems((prev) => [...prev, currentDragObject]);
    }

    // removes an object after it is draggedd off canvas
    if (over?.id !== "canvas" && source === "canvas") {
      setItems((prev) => {
        let newArr = prev.filter(
          (item) => String(item.id) !== String(active.id),
        );
        return newArr;
      });
    }

    //repositions an object
    if (over?.id === "canvas" && source === "canvas") {
      setItems((prev) => {
        let newArr = [...prev];
        let targetItem = newArr.findIndex((item) => item.id === active.id);
        let updatedItem = (newArr[targetItem] = {
          id: newArr[targetItem].id,
          x: delta.x + newArr[targetItem].x,
          y: delta.y + newArr[targetItem].y,
        });
        newArr[targetItem] = updatedItem;
        return newArr;
      });
    }

    // Reset active item for DragOverlay
    setActiveId(null);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(event) => setActiveId(event.active.id as string)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className={styles.MainViewContainer}>
          <SideBar>
            <ExpandableContainer categoryName="Game Assets">
              <DraggableWrapper id="dropdown-icon" inToolbar={true}>
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
                    id={`${currentItem?.id}`}
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
      {dialogOpen &&
        createPortal(
          <Dialog onClose={() => setDialogOpen(false)} />,
          document.body,
        )}
    </>
  );
}
