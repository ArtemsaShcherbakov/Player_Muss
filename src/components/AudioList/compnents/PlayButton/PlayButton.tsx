import { Button } from "@components";

import PlayIcon from "@assets/icons/Play.svg";
import StopIcon from "@assets/icons/Stop.svg";

import {
  DEFAULT_ICON_PLAY_SIZE,
  DEFAULT_ICON_STOP_SIZE,
} from "./PlayButton.constants";

import { IPlayButtonProps } from "./PlayButton.types";

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

  return <Button icon={icon} styleButton={styleButton} onPress={onPress} />;
};

export { PlayButton };
