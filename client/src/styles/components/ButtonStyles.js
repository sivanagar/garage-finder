import { darken, mode, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: "primary",
      color: "white",
      border: "2px solid white",
      _hover: {
        bg: mode(darken("primary", 30), whiten("primary", 30))(props),
        boxShadow: "md",
      },
    }),
    secondary: (props) => ({
      bg: "secondary",
      color: "white",
      border: "2px solid white",
      _hover: {
        bg: mode(darken("secondary", 30), whiten("secondary", 30))(props),
        boxShadow: "md",
      },
    }),
    warning: (props) => ({
      bg: "warning",
      color: "white",
      _hover: {
        bg: mode(darken("warning", 30), whiten("warning", 30))(props),
        boxShadow: "md",
      },
    }),
    danger: (props) => ({
      bg: "danger",
      color: "white",
      _hover: {
        bg: mode(darken("danger", 30), whiten("danger", 30))(props),
        boxShadow: "md",
      },
    }),
    success: (props) => ({
      bg: "success",
      color: "white",
      _hover: {
        bg: mode(darken("success", 30), whiten("success", 30))(props),
        boxShadow: "md",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
