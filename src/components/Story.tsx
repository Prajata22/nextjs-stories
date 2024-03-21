import React, { useContext } from "react";
import { StoryProps, GlobalCtx } from "./../interfaces";
import GlobalContext from "./../context/Global";

const Story = (props: StoryProps) => {
  const globalContext = useContext<GlobalCtx>(GlobalContext);

  const {
    width,
    height,
    loader,
    header,
    storyStyles,
    storyInnerContainerStyles = {},
  } = globalContext;

  const rendererMessageHandler = (type: string, data: any) => {
    switch (type) {
      case "UPDATE_VIDEO_DURATION":
        props.getVideoDuration(data.duration);
        return { ack: "OK" as "OK" };
      default:
        return { ack: "ERROR" as "ERROR" }; 
    }
  };

  const getStoryContent = () => {
    let InnerContent = props.story.content;
    let config = { width, height, loader, header, storyStyles };
    return (
      InnerContent && (
        <InnerContent
          action={props.action}
          isPaused={props.playState}
          story={props.story}
          config={config}
          messageHandler={rendererMessageHandler}
        />
      )
    );
  };

  return (
    <div
      style={{
        ...styles.story,
        ...storyInnerContainerStyles,
        width: width,
        height: height,
      }}
    >
      {getStoryContent()}
    </div>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "relative" as "relative",
    overflow: "hidden",
    alignItems: "center",
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export default Story;
