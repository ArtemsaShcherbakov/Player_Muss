import { type JSX } from "react";
import { type StyleProp, type ViewStyle } from "react-native";

interface IButtonProps {
  icon?: JSX.Element;
  styleButton?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export { IButtonProps };
