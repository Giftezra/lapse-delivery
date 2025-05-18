import { useLoadedFonts } from "@/hooks/useLoadedFonts";
import { createContext, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light");
    const fonts = useLoadedFonts();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {/* Load the fonts when the page mounts so that every page would have access to the font family */}
      {fonts ? (
        children
      ) : (
        <ActivityIndicator size="large" color={"#000"} />
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
