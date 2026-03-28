"use client";

import { useState } from "react";
import styles from "./styles.module.css";

import {
  SideBar,
  DraggableWrapper,
  ExpandableContainer,
  LongButton,
  SelectableImageContainer,
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
      {selectedTabDialogAccessor === "assets" && (
        <ExpandableContainer categoryName="Assets">
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
      )}
      {selectedTabDialogAccessor === "layers" && (
        <ExpandableContainer categoryName="Layers">
          <div className={styles.twoColumnLayout}>
            {/*TODO: Add default colors here */}
            {userData?.backdropData &&
              userData.backdropData.map(
                ({ imageUrl, id }: { imageUrl: string; id: string }) => {
                  return (
                    <SelectableImageContainer
                      key={id}
                      onClick={() =>
                        setSelectedBackground({ backgroundImage: imageUrl })
                      }
                      isSelected={
                        imageUrl === selectedBackground?.backgroundImage
                      }
                      imgProps={{ src: `${imageUrl}` }}
                    />
                  );
                },
              )}
          </div>
        </ExpandableContainer>
      )}
      <LongButton
        label={"Save Project"}
        iconName={"save"}
        onClick={() => console.log("lol")}
      />
    </SideBar>
  );
};
