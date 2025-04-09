import { ThemeContext } from "./../contexts/ThemeContext";
import { useContext } from "react";

export function useThemeContext() {
  return useContext(ThemeContext);
}
