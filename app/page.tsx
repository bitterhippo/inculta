"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  SideBar,
  ExpandableContainer,
  Icon,
  Canvas,
  DraggableWrapper,
} from "@/components";
import { AddAssetDialog, LongButton } from "../domain/index";
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
  const [dialogOpen, setDialogOpen] = useState<{
    open: boolean;
    source: "asset" | "backdrop";
  }>({ open: false, source: "asset" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<object>();
  const [userData, setUserData] = useState();
  const [scale, setScale] = useState<string>();

  const canvasRef = useRef<HTMLDivElement>(null);

  console.log("userdata", userData);

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
    const imageUrl = active.data.current?.imageUrl;

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
        imageUrl,
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
          imageUrl: newArr[targetItem]?.imageUrl,
        });
        newArr[targetItem] = updatedItem;
        return newArr;
      });
    }

    // Reset active item for DragOverlay
    setActiveId(null);
  };

  //TODO: Determine if this just ought to be React Query
  useEffect(() => {
    async function fetchAssets() {
      const response = await fetch("/api/getAllAssetsById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "123" }),
      });
      const data = await response.json();
      setUserData(data);
    }

    fetchAssets();
  }, [dialogOpen]);

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
            {/*TODO: Break this out into isolated component after it becomes too cubersome */}
            <ExpandableContainer categoryName="Game Assets">
              {userData?.assetData &&
                userData.assetData.map(({ id, imageUrl }) => {
                  return (
                    <DraggableWrapper
                      id={`${id}-${imageUrl}`}
                      key={`${id}-${imageUrl}`}
                      inToolbar={true}
                      imageUrl={`${imageUrl}`}
                    >
                      <img
                        style={{ maxHeight: "32px", maxWidth: "32px" }}
                        src={imageUrl}
                        alt={id}
                      />
                    </DraggableWrapper>
                  );
                })}
              <Icon
                label={"Click me"}
                onClick={() =>
                  setDialogOpen(({ open }) => ({
                    open: !open,
                    source: "asset",
                  }))
                }
              />
            </ExpandableContainer>
            <ExpandableContainer
              contentDirection={"column"}
              categoryName="Background"
            >
              <LongButton
                onClick={() =>
                  setSelectedBackground({ backgroundColour: "black" })
                }
                isChecked={selectedBackground?.backgroundColour === "black"}
                label={"lol"}
                previewContainerContent="black"
              />
              {userData?.backdropData &&
                userData.backdropData.map(
                  ({
                    imageUrl,
                    label,
                    id,
                  }: {
                    imageUrl: string;
                    label: string;
                    id: string;
                  }) => {
                    return (
                      <LongButton
                        key={id}
                        label={label}
                        onClick={() =>
                          setSelectedBackground({ backgroundImage: imageUrl })
                        }
                      />
                    );
                  },
                )}
              <LongButton
                onClick={() =>
                  setDialogOpen(({ open }) => ({
                    open: !open,
                    source: "backdrop",
                  }))
                }
                label={"Upload New Backdrop"}
              />
            </ExpandableContainer>
          </SideBar>
          <div className={styles.CanvasWrapper}>
            <div className={styles.Viewport}>
              <div
                className={styles.World}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <Canvas ref={canvasRef} {...selectedBackground}>
                  {items.map((currentItem, i) => (
                    <DraggableWrapper
                      key={`${currentItem?.id}-${i}`}
                      id={`${currentItem?.id}`}
                      x={currentItem.x}
                      y={currentItem.y}
                      imageUrl={`${currentItem.imageUrl}`}
                    >
                      <img
                        style={{ maxHeight: "48px", maxWidth: "48px" }}
                        src={currentItem.imageUrl}
                        alt={currentItem.id}
                      />
                    </DraggableWrapper>
                  ))}
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <DragOverlay>
          {/* TODO: this is where the onDrag image is created */}
          {activeId ? (
            <DraggableWrapper id={activeId}>
              <Icon />
            </DraggableWrapper>
          ) : null}
        </DragOverlay>
      </DndContext>
      {dialogOpen.open &&
        createPortal(
          <AddAssetDialog
            selectedFile={selectedFile}
            setDialogOpen={setDialogOpen}
            setSelectedFile={setSelectedFile}
            source={dialogOpen.source}
          />,
          document.body,
        )}
    </>
  );
}
