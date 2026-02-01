import { SideBar } from "@/components/SideBar/SideBar";
import { ExpandableContainer } from "@/components/ExpandableContainer/ExpandableContainer";
import { DragIcon } from "@/components/DragIcon/DragIcon";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

export default function Home() {
  return (
    <DndContext>
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
