import { View, Text, TouchableHighlight } from "react-native";
import { Asset } from "expo-media-library";

import { PlayButton } from "@components";

import { formatDuration } from "@utils";

import { ICurrentTrack } from "../../AudioList.types";

import FavoriteIcon from "@assets/icons/Favorite.svg";

import styles from "./Track.styles";

interface ITrackProps {
  track: Asset;
  isPlaying: boolean;
  onPlay(currentTrack: Omit<ICurrentTrack, "isPlay">): void;
}

const Track = ({ track, isPlaying, onPlay }: ITrackProps) => {
  const { id, uri, filename, duration } = track;
  const nameTrack = filename.slice(0, 32).split("-")[0].replaceAll("_", " ");
  const durationTrack = formatDuration(duration);

  const handlerPressPlay = () => onPlay({ id, filename, uri });

  return (
    <TouchableHighlight onPress={handlerPressPlay}>
      <View style={styles.track}>
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
};

export { Track };
