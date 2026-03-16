import { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import { PlayButton, MarqueeText } from "@components";
import { IStatusBarProps } from "./StatusBar.types";

import NextIcon from "@assets/icons/Next.svg";
import BackIcon from "@assets/icons/Back.svg";

import { styles } from "./StatusBar.styles";

const ICON_STOP_SIZE = { width: 30, height: 30 };
const ICON_PLAY_SIZE = { width: 17, height: 20 };
const PLAY_BUTTON_SIZE = { width: 40, height: 40 };

const StatusBar = ({ currentTrack, switchTrack, onPlay }: IStatusBarProps) => {
  if (!currentTrack) return null;

  const switchNextTrack = useCallback(() => switchTrack(1), [switchTrack]);
  const switchBackTrack = useCallback(() => switchTrack(-1), [switchTrack]);

  return (
    <View style={styles.root}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MarqueeText text={currentTrack.filename} width={300} />
          <View style={styles.controls}>
            <TouchableOpacity onPress={switchBackTrack}>
              <BackIcon />
            </TouchableOpacity>
            <PlayButton
              play={currentTrack.isPlay}
              iconPlaySize={ICON_PLAY_SIZE}
              iconStopSize={ICON_STOP_SIZE}
              styleButton={PLAY_BUTTON_SIZE}
              onPress={() => onPlay(currentTrack)}
            />
            <TouchableOpacity onPress={switchNextTrack}>
              <NextIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { StatusBar };
