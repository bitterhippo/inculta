"use client";

import { useState } from "react";

import {
  SideBar,
  DraggableWrapper,
  ExpandableContainer,
  Icon,
  LongButton,
  SelectTabList,
} from "@/components";

import { CampaignEditorSideBarTabListOptions } from "./config/config";

export const CampaignEditorSideBar = ({
  userData,
  setDialogOpen,
  setSelectedBackground,
  selectedBackground,
}) => {
  const [selectedTab, setSelectedTab] = useState("Assets");

  const selectedTabDialogAccessor = selectedTab.toLowerCase();

  console.log("selectedTab", selectedTab);

  return (
    <SideBar>
      <SelectTabList
        tabListData={CampaignEditorSideBarTabListOptions}
        selectorHandler={setSelectedTab}
        selectedTab={selectedTab}
      />
      <LongButton
        label={`Create New ${selectedTab}`}
        onClick={() =>
          setDialogOpen(({ open }) => ({
            open: !open,
            source: selectedTabDialogAccessor,
          }))
        }
      />
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
      </ExpandableContainer>
      <ExpandableContainer
        contentDirection={"column"}
        categoryName="Background"
      >
        <LongButton
          onClick={() => setSelectedBackground({ backgroundColour: "black" })}
          label={"lol"}
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
      </ExpandableContainer>
    </SideBar>
  );
};
