// @flow
import { TOGGLE_THEME } from "../constants";

export const toggleTheme = (color) => ({
  type: TOGGLE_THEME,
  payload: { color: color },
});
