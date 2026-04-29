import type { CampaignState, Action } from "./types";

export const initialState: CampaignState = {
  items: [],
  selectedBackground: null,
};

export function campaignReducer(
  state: CampaignState,
  action: Action,
): CampaignState {
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

    case "loadCampaign":
      return action.payload;

    default:
      return state;
  }
}
