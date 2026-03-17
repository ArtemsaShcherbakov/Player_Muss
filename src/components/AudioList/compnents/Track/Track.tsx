import { memo, useCallback, useMemo } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import type { Asset } from "expo-media-library";

import { PlayButton } from "../PlayButton";

import { formatDuration } from "@utils";

import { ICurrentTrack } from "../../AudioList.types";

import FavoriteIcon from "@assets/icons/Favorite.svg";

import styles from "./Track.styles";

interface ITrackProps {
  track: Asset;
  isPlaying: boolean;
  onPlay(currentTrack: Omit<ICurrentTrack, "isPlay">): void;
}

export const Track = memo(({ track, isPlaying, onPlay }: ITrackProps) => {
  const { id, uri, filename, duration } = track;

  const nameTrack = useMemo(
    () => filename.slice(0, 32).split("-")[0].replaceAll("_", " "),
    [filename],
  );

  const durationTrack = useMemo(() => formatDuration(duration), [duration]);

  const tarckContainer = useMemo(
    () =>
      isPlaying
        ? [styles.track, { backgroundColor: "#5a5454", borderRadius: 10 }]
        : styles.track,
    [isPlaying],
  );

  const handlerPressPlay = useCallback(() => {
    onPlay({ id, filename: nameTrack, uri });
  }, [id, nameTrack, uri, onPlay]);

  return (
    <TouchableHighlight onPress={handlerPressPlay}>
      <View style={tarckContainer}>
        <View style={styles.content}>
          <PlayButton play={isPlaying} onPress={handlerPressPlay} />
          <View>
            <Text style={styles.name}>{nameTrack}</Text>
            <Text style={styles.time}>{durationTrack}</Text>
          </View>
        </View>
        <FavoriteIcon />
      </View>
    </TouchableHighlight>
  );
});
