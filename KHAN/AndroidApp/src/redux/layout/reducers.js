// @flow
import { TOGGLE_THEME } from "../constants";

const INIT_STATE = {
  theme: "light",
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, theme: action.payload.color };
    default:
      return { ...state };
  }
};

export default Layout;
