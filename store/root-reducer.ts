import { combineReducers, createSlice } from "@reduxjs/toolkit";
import type { CreateSliceOptions } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { stat } from "fs";

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
  currentUser: User | null;
}

const initialUser: userInterface = {
  currentUser: null,
};

const userOptions: CreateSliceOptions = {
  name: "user",
  initialState: initialUser,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
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
//root reducer

export interface rootInterface {
  modal: modalInterface;
  user: userInterface;
}

export const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer,
});
