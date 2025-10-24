"use client";
import { themes } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContextProvider, useThemeContext } from "@/contexts/ThemeContext";

function ThemeProviderContent({ children }: { children: React.ReactNode }) {
  const { themeMode } = useThemeContext();
  const currentTheme = themes[themeMode] || themes.default;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <ThemeProviderContent>{children}</ThemeProviderContent>
    </ThemeContextProvider>
  );
}
