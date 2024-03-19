import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../entities/Game";

type DisplayType = "grid" | "table";
export const FriendsOfFenAster = ["Osiria", "Kuroyuriis"];

export const enum SortByType {
  "title",
  "genre",
  "price",
}

export const enum RecsToType {
  both = "both",
  aster = "aster",
  fen = "fen",
}

export const enum DisplayTabs {
  approved,
  pending,
  onSale,
  completed,
}

export interface gameListState {
  displayType: DisplayType;
  columnCount: number;
  showRecsTo: RecsToType;
  showRecsBy: string[];
  showOnlyFriends: boolean;
  searchTerm: string;
  sortBy: SortByType;
  activeGame: Game | null;
  useTestApi: boolean;
  isShowingAddGameModal: boolean;
  isShowingAddVodLinkModal: boolean;
  isShowingUnapproved: boolean;
  sortResultsDescending: boolean;
  currentDisplayTab: DisplayTabs;
}

const initialState: gameListState = {
  columnCount: import.meta.env.VITE_DEFAULT_COLUMNS,
  displayType: import.meta.env.VITE_DEFAULT_DISPLAY_TYPE,
  showRecsTo: RecsToType.both,
  showRecsBy: [],
  showOnlyFriends: false,
  searchTerm: "",
  sortBy: import.meta.env.VITE_DEFAULT_SORT_BY,
  activeGame: null,
  useTestApi: import.meta.env.VITE_USE_TEST_API === "true",
  isShowingAddGameModal: false,
  isShowingAddVodLinkModal: false,
  isShowingUnapproved: false,
  sortResultsDescending: true,
  currentDisplayTab: DisplayTabs.approved,
};

export const gameListSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    resetPreferences: (state) => {
      state.columnCount = initialState.columnCount;
      state.displayType = initialState.displayType;
      state.showRecsTo = initialState.showRecsTo;
      state.showRecsBy = initialState.showRecsBy;
    },
    setColumnCount: (state, action: PayloadAction<number>) => {
      state.columnCount = action.payload;
    },
    setDisplayType: (state, action: PayloadAction<DisplayType>) => {
      state.displayType = action.payload;
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
    setShowOnlyFriends: (state, action: PayloadAction<boolean>) => {
      state.showOnlyFriends = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    },
    setActiveGame: (state, action: PayloadAction<Game | null>) => {
      if (!action.payload) state.activeGame = null;
      else if (state.activeGame?.id === action.payload.id)
        state.activeGame = null;
      else state.activeGame = action.payload;
    },
    setShowingAddGameModal: (state, action: PayloadAction<boolean>) => {
      state.isShowingAddGameModal = action.payload;
    },
    setShowingAddVodLinkModal: (state, action: PayloadAction<boolean>) => {
      state.isShowingAddVodLinkModal = action.payload;
    },
    setShowingUnapproved: (state, action: PayloadAction<boolean>) => {
      state.isShowingUnapproved = action.payload;
    },
    setSortResultsDecending: (state, action: PayloadAction<boolean>) => {
      state.sortResultsDescending = action.payload;
    },
    setCurrentDisplayTab: (state, action: PayloadAction<DisplayTabs>) => {
      state.currentDisplayTab = action.payload;
    },
  },
});

export const {
  resetPreferences,
  setColumnCount,
  setDisplayType,
  setShowRecsTo,
  addShowRecsBy,
  removeShowRecsBy,
  setShowOnlyFriends,
  setSearchTerm,
  setSortBy,
  setActiveGame,
  setShowingAddGameModal,
  setShowingAddVodLinkModal,
  setShowingUnapproved,
  setSortResultsDecending,
  setCurrentDisplayTab,
} = gameListSlice.actions;
