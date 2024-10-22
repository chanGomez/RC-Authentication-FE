import { getDesignTokens } from "../mui_theme/themePrimitives";
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from "./customizations";

export default function getSignUpTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}
