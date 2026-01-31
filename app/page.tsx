import { SideBar } from "@/components/SideBar/SideBar";
import { ExpandableContainer } from "@/components/ExpandableContainer/ExpandableContainer";

export default function Home() {
  return (
    <>
      <SideBar>
        <ExpandableContainer categoryName="test" />
      </SideBar>
    </>
  );
}
