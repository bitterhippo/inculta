import { useDraggable } from "@dnd-kit/core";
import { WithPositionProps } from "./types";

// HOC: wraps any component
export const WithPosition = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const ComponentWithPosition = (props: P & WithPositionProps) => {
    const { id, ...rest } = props;
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
      <div {...listeners} {...attributes} ref={setNodeRef}>
        <WrappedComponent {...(rest as P)} />
      </div>
    );
  };

  return ComponentWithPosition;
};
