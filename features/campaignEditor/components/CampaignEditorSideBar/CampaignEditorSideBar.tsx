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
            userData.assetData.map(({ id, image_url }) => {
              return (
                <DraggableWrapper
                  id={`${id}-${image_url}`}
                  key={`${id}-${image_url}`}
                  inToolbar={true}
                  image_url={`${image_url}`}
                >
                  <img
                    style={{ maxHeight: "32px", maxWidth: "32px" }}
                    src={image_url}
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
                ({ image_url, id }: { image_url: string; id: string }) => {
                  return (
                    <SelectableImageContainer
                      key={id}
                      onClick={() =>
                        setSelectedBackground({ backgroundImage: image_url })
                      }
                      isSelected={
                        image_url === selectedBackground?.backgroundImage
                      }
                      imgProps={{ src: `${image_url}` }}
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
