import { combineReducers, createSlice } from "@reduxjs/toolkit";
import type { CreateSliceOptions } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

import { createSelector } from "reselect";

//modal reducer
interface modalInterface {
  showLoginModal: boolean;
  showRegisterModal: boolean;
}

const modelInitial: modalInterface = {
  showLoginModal: false,
  showRegisterModal: false,
};
const modalSliceOptions: CreateSliceOptions = {
  name: "modal",
  initialState: modelInitial,
  reducers: {
    setShowLoginModal(state, action: PayloadAction) {
      state.showLoginModal = action.payload;
    },
    setShowRegisterModal(state, action: PayloadAction) {
      state.showRegisterModal = action.payload;
    },
  },
};

const modalSlice = createSlice(modalSliceOptions);
export const { setShowLoginModal, setShowRegisterModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
const modalState = (state: rootInterface) => {
  return {
    loginModal: state.modal.showLoginModal,
    registerModal: state.modal.showRegisterModal,
  };
};

export const selectShowModal = createSelector(
  [modalState],
  (loginModal) => loginModal
);

// USer Reducer

export interface userInterface {
  currentUser: string | null;
}

const initialUser: userInterface = {
  currentUser: null,
};

const userOptions: CreateSliceOptions = {
  name: "user",
  initialState: initialUser,
  reducers: {
    setCurrentUser(state, action: PayloadAction<string | null>) {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
  },
};
const userSlice = createSlice(userOptions);

const userReducer = userSlice.reducer;
export const { setCurrentUser } = userSlice.actions;

const userState = (state: rootInterface) => state.user?.currentUser;

export const selectCurrentUser = createSelector(
  [userState],
  (currentUser) => currentUser
);

//watchList reducer

export interface watchListInterface {
  uid: string;
  movieWatchList: string[];
  tvWatchList: string[];
}

const initialWatchList: watchListInterface = {
  uid: "",
  movieWatchList: [],
  tvWatchList: [],
};
const watchListSlice = createSlice({
  name: "watchlist",
  initialState: initialWatchList,
  reducers: {
    setWatchlist(state, action: PayloadAction<watchListInterface>) {
      state.uid = action.payload?.uid;
      state.movieWatchList = action.payload?.movieWatchList;
      state.tvWatchList = action.payload?.tvWatchList;
    },
  },
});

const watchListState = (state: rootInterface) => {
  return state.watchList;
};
export const watchListSelector = createSelector(
  [watchListState],
  (watchList) => watchList
);

export const { setWatchlist } = watchListSlice.actions;
const watchListReducer = watchListSlice.reducer;

//languages reducer

export interface langInterface {
  name: string;
  english_name: string;
  iso_639_1: string;
}
export interface languageInterface {
  languages: langInterface[];
}

const initialLanguages: languageInterface = {
  languages: [],
};

const languagesSlice = createSlice({
  name: "languages",
  initialState: initialLanguages,
  reducers: {
    setlanguages(state, action: PayloadAction<langInterface[]>) {
      state.languages = action.payload;
    },
  },
});
const languageReducer = languagesSlice.reducer;
export const { setlanguages } = languagesSlice.actions;

const languagesState = (state: rootInterface) => {
  return state.languages;
};

export const languagesSelector = createSelector(
  [languagesState],
  (languages) => languages
);

//root reducer

export interface rootInterface {
  modal: modalInterface;
  user: userInterface;
  watchList: watchListInterface;
  languages: languageInterface;
}

export const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
  watchList: watchListReducer,
  languages: languageReducer,
});
