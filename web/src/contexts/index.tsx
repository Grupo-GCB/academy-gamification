import { theme } from "@styles/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
