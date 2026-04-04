"use client";

import { SideBar, ExpandableContainer, LongButton } from "@/components";

export default function LoggedInUserPage() {
  return (
    <>
      <SideBar>
        <LongButton
          label="Create New Campaign"
          onClick={() => console.log("Campaign Creation event triggerd")}
        />
        <ExpandableContainer categoryName="Available Campaigns"></ExpandableContainer>
      </SideBar>
    </>
  );
}
