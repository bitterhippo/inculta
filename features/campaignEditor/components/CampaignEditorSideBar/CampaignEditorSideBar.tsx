import {
  SideBar,
  DraggableWrapper,
  ExpandableContainer,
  Icon,
  LongButton,
} from "@/components";

export const CampaignEditorSideBar = ({
  userData,
  setDialogOpen,
  setSelectedBackground,
  selectedBackground,
}) => {
  return (
    <SideBar>
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
        <Icon
          label={"Click me"}
          onClick={() =>
            setDialogOpen(({ open }) => ({
              open: !open,
              source: "asset",
            }))
          }
        />
      </ExpandableContainer>
      <ExpandableContainer
        contentDirection={"column"}
        categoryName="Background"
      >
        <LongButton
          onClick={() => setSelectedBackground({ backgroundColour: "black" })}
          isChecked={selectedBackground?.backgroundColour === "black"}
          label={"lol"}
          previewContainerContent="black"
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
        <LongButton
          onClick={() =>
            setDialogOpen(({ open }) => ({
              open: !open,
              source: "backdrop",
            }))
          }
          label={"Upload New Backdrop"}
        />
      </ExpandableContainer>
    </SideBar>
  );
};
