import type { CampaignState, Action } from "./types";

export const initialState: CampaignState = {
  items: [],
  selectedBackground: null,
};

export function campaignReducer(
  state: CampaignState,
  action: Action,
): CampaignState {
  console.log("ACTION:", action);
  console.log("STATE BEFORE:", state);

  switch (action.type) {
    case "addItem":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "setBackground":
      return {
        ...state,
        selectedBackground: action.payload,
      };

    case "removeItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "moveItem":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                x: action.payload.x,
                y: action.payload.y,
              }
            : item,
        ),
      };

    case "loadCampaign":
      return action.payload;

    default:
      return state;
  }
}
