import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark") || "false")
  );

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeContext.Provider>
  );
}
