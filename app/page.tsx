import { SideBar } from "@/components/SideBar/SideBar";
import { ExpandableContainer } from "@/components/ExpandableContainer/ExpandableContainer";
import { DragIcon } from "@/components/DragIcon/DragIcon";

export default function Home() {
  return (
    <>
      <SideBar>
        <ExpandableContainer categoryName="test">
          <DragIcon />
        </ExpandableContainer>
      </SideBar>
    </>
  );
}
