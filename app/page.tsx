"use client";

import { SideBar } from "@/components/SideBar/SideBar";
import { ExpandableContainer } from "@/components/ExpandableContainer/ExpandableContainer";
import { DragIcon } from "@/components/DragIcon/DragIcon";
import styles from "./styles.module.css";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function Home() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // how many pixels the cursor must move to start dragging
      },
    }),
  );

  return (
    <DndContext sensors={sensors}>
      <div className={styles.MainViewContainer}>
        <SideBar>
          <ExpandableContainer categoryName="test">
            <DragIcon id={"dummy-icon"} />
          </ExpandableContainer>
        </SideBar>
        <div className={styles.ViewContainer}>This is the content</div>
      </div>
    </DndContext>
  );
}
