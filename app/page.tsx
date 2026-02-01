"use client";

import { SideBar } from "@/components/SideBar/SideBar";
import { ExpandableContainer } from "@/components/ExpandableContainer/ExpandableContainer";
import { DragIcon } from "@/components/DragIcon/DragIcon";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

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
      <SideBar>
        <ExpandableContainer categoryName="test">
          <SortableContext items={["dummy-icon"]}>
            <DragIcon id={"dummy-icon"} />
          </SortableContext>
        </ExpandableContainer>
      </SideBar>
    </DndContext>
  );
}
