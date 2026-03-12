import { type StyleProp, type ViewStyle } from "react-native";

interface IIconSize {
  width: number;
  height: number;
}

interface IPlayButtonProps {
  play: boolean;
  iconStopSize?: IIconSize;
  iconPlaySize?: IIconSize;
  styleButton?: StyleProp<ViewStyle>;
  onPress?: (setIsPlay: any) => void;
}

export { IPlayButtonProps };
