import { View, Text, TouchableHighlight } from "react-native";

import { PlayButton } from "@components";

import { formatDuration } from "@utils";

import FavoriteIcon from "@assets/icons/Favorite.svg";

import styles from "./Track.styles";

interface ITrackProps {
  id: string;
  uri: string;
  filename: string;
  duration: number;
  isPlaying: boolean;
  onPlay(id: string, filename: string, uri: string): void;
}

const Track = ({
  id,
  uri,
  filename,
  duration,
  isPlaying,
  onPlay,
}: ITrackProps) => {
  const nameTrack = filename.slice(0, 32).split("-")[0].replaceAll("_", " ");
  const durationTrack = formatDuration(duration);

  const handlerPressPlay = () => onPlay(id, filename, uri);

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
