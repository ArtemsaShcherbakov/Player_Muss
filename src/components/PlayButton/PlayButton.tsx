import { TouchableOpacity } from "react-native";

import PlayIcon from "@assets/icons/Play.svg";
import StopIcon from "@assets/icons/Stop.svg";

import {
  DEFAULT_ICON_PLAY_SIZE,
  DEFAULT_ICON_STOP_SIZE,
} from "./PlayButton.constants";

import { IPlayButtonProps } from "./PlayButton.types";

import { styles } from "./PlayButton.styles";

const PlayButton = ({
  play,
  iconStopSize = DEFAULT_ICON_STOP_SIZE,
  iconPlaySize = DEFAULT_ICON_PLAY_SIZE,
  styleButton,
  onPress,
}: IPlayButtonProps) => {
  const icon = play ? (
    <StopIcon {...iconStopSize} />
  ) : (
    <PlayIcon {...iconPlaySize} />
  );

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
      {icon}
    </TouchableOpacity>
  );
};

export { PlayButton };
