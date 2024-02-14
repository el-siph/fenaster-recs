import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DisplayType = "grid" | "table";
type RecsToType = "aster" | "fen" | "both";

interface preferenceState {
  displayType: DisplayType;
  columnCount: number;
  showCompleted: boolean;
  showRecsTo: RecsToType;
  showRecsBy: string[];
  showPreferenceBar: boolean;
}

const initialState: preferenceState = {
  columnCount: import.meta.env.VITE_DEFAULT_COLUMNS,
  displayType: import.meta.env.VITE_DEFAULT_DISPLAY_TYPE,
  showCompleted: import.meta.env.VITE_DEFAULT_SHOW_COMPLETED,
  showRecsTo: "both",
  showRecsBy: [],
  showPreferenceBar: import.meta.env.VITE_DEFAULT_SHOW_PREFERENCE_BAR,
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
} = preferenceSlice.actions;
