import { mode } from "@chakra-ui/theme-tools";

export const InputStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    default: (props) => ({
      bg: mode("transparent", "gray.700")(props),
      _active: {
        color: mode("purple.500", "purple.200")(props),
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
