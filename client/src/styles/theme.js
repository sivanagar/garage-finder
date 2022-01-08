import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#8F93D9",
    secondary: "#FF6F91",
    warning: "#FFC75F",
    success: "#4caf50",
    danger: "#f44336",
  },
  components: {
    Button,
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
});
