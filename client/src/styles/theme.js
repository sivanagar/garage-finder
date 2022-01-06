import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#805ad5",
    secondary: "#FF6F91",
    warning: "#FFC75F",
    success: "#4caf50",
    danger: "#f44336",
  },
  components: {
    Button,
  },
});
