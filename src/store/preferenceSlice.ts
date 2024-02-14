import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DisplayType = "grid" | "table";
type RecsToType = "aster" | "fen" | "both";
export const FriendsOfFenAster = ["Osiria", "Kuroyuriis"];

export interface preferenceState {
  displayType: DisplayType;
  columnCount: number;
  showCompleted: boolean;
  showRecsTo: RecsToType;
  showRecsBy: string[];
  showPreferenceBar: boolean;
  showOnlyFriends: boolean;
  searchTerm: string;
}

const initialState: preferenceState = {
  columnCount: import.meta.env.VITE_DEFAULT_COLUMNS,
  displayType: import.meta.env.VITE_DEFAULT_DISPLAY_TYPE,
  showCompleted: import.meta.env.VITE_DEFAULT_SHOW_COMPLETED === "true",
  showRecsTo: "both",
  showRecsBy: [],
  showPreferenceBar:
    import.meta.env.VITE_DEFAULT_SHOW_PREFERENCE_BAR === "true",
  showOnlyFriends: false,
  searchTerm: "",
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    resetPreferences: (state) => {
      state.columnCount = initialState.columnCount;
      state.displayType = initialState.displayType;
      state.showCompleted = initialState.showCompleted;
      state.showRecsTo = initialState.showRecsTo;
      state.showRecsBy = initialState.showRecsBy;
    },
    setColumnCount: (state, action: PayloadAction<number>) => {
      state.columnCount = action.payload;
    },
    setDisplayType: (state, action: PayloadAction<DisplayType>) => {
      state.displayType = action.payload;
    },
    setShowCompleted: (state, action: PayloadAction<boolean>) => {
      state.showCompleted = action.payload;
    },
    setShowRecsTo: (state, action: PayloadAction<RecsToType>) => {
      state.showRecsTo = action.payload;
    },
    addShowRecsBy: (state, action: PayloadAction<string>) => {
      state.showRecsBy.push(action.payload);
    },
    removeShowRecsBy: (state, action: PayloadAction<string>) => {
      state.showRecsBy = state.showRecsBy.filter(
        (person: string) => person !== action.payload
      );
    },
    setShowPreferenceBar: (state, action: PayloadAction<boolean>) => {
      state.showPreferenceBar = action.payload;
    },
    setShowOnlyFriends: (state, action: PayloadAction<boolean>) => {
      state.showOnlyFriends = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  resetPreferences,
  setColumnCount,
  setDisplayType,
  setShowCompleted,
  setShowRecsTo,
  addShowRecsBy,
  removeShowRecsBy,
  setShowPreferenceBar,
  setShowOnlyFriends,
  setSearchTerm,
} = preferenceSlice.actions;
