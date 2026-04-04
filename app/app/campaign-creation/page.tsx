"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { Icon, Canvas, DraggableWrapper } from "@/components";
/*TDDO: implement a barrle file in the features */
import {
  AddAssetDialog,
  CampaignEditorSideBar,
} from "../../../features/campaignEditor/index";
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
  const [dialogOpen, setDialogOpen] = useState<{
    open: boolean;
    source: "assets" | "layers";
  }>({ open: false, source: "assets" });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  //TODO: Move this to a lower level of state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //TODO: See how much of this can be combined
  const [items, setItems] = useState<PlacedItem[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<object>();
  const [userData, setUserData] = useState();
  //Zoom Logic
  const defaultScale = 1;
  const [scale, setScale] = useState<number>(defaultScale);
  const scaleMin = 0.5;
  const scaleMax = 3;

  const canvasRef = useRef<HTMLDivElement>(null);
  //Pan Ref
  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

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

    const startEvent = event.activatorEvent as MouseEvent;

    const startX = startEvent.clientX;
    const startY = startEvent.clientY;

    const finalX = startX + delta.x;
    const finalY = startY + delta.y;

    const canvasX = (finalX - canvasRect.left) / scale;
    const canvasY = (finalY - canvasRect.top) / scale;

    //Initialize the component into state for the purpose of mapping it out
    // creates new object from palette
    if (over?.id === "canvas" && source === "palette") {
      let currentDragObject: PlacedItem = {
        id: String(nanoid()),
        x: canvasX,
        y: canvasY,
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
    //TODO: this needs different logic as items are sliding
    if (over?.id === "canvas" && source === "canvas") {
      setItems((prev) => {
        let newArr = [...prev];
        let targetItem = newArr.findIndex((item) => item.id === active.id);
        let updatedItem = (newArr[targetItem] = {
          id: newArr[targetItem].id,
          x: canvasX,
          y: canvasY,
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // prevents page scroll
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(event) => setActiveId(event.active.id as string)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className={styles.MainViewContainer}>
          {/*TODO: Add campaign editor sidebar */}
          <CampaignEditorSideBar
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            userData={userData}
            setDialogOpen={setDialogOpen}
          />
          <div className={styles.CanvasWrapper}>
            <div
              className={styles.Viewport}
              onWheel={(e) => {
                e.preventDefault();

                const zoomSpeed = 0.001;
                setScale((prev) => {
                  let next = prev - e.deltaY * zoomSpeed;
                  return Math.min(Math.max(next, scaleMin), scaleMax);
                });
              }}
              onMouseDown={(e) => {
                if (!isSpacePressed) return;

                isPanning.current = true;
                lastPos.current = { x: e.clientX, y: e.clientY };
              }}
              onMouseMove={(e) => {
                if (!isPanning.current) return;

                const dx = e.clientX - lastPos.current.x;
                const dy = e.clientY - lastPos.current.y;

                lastPos.current = { x: e.clientX, y: e.clientY };

                setPan((prev) => ({
                  x: prev.x + dx,
                  y: prev.y + dy,
                }));
              }}
              onMouseUp={() => {
                isPanning.current = false;
              }}
              onMouseLeave={() => {
                isPanning.current = false;
              }}
            >
              <div
                className={styles.World}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
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
            <DraggableWrapper id={activeId} imageUrl={activeId}>
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
