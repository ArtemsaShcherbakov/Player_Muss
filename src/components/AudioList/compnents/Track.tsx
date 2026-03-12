import { View, Text, TouchableOpacity } from "react-native";
import { type Asset } from "expo-media-library";

import { PlayButton } from "@components/PlayButton";

import { formatDate } from "@utils";

import type { TPlay } from "@types";

import FavoriteIcon from "@assets/icons/Favorite.svg";

import styles from "./Track.styles";

interface ITrackProps {
  play: TPlay;
  tarck: Asset;
  onPlay(newPlay: TPlay): void;
}

const Track = ({
  play,
  tarck: { id, filename, duration },
  onPlay,
}: ITrackProps) => {
  const isPlay = play?.id === id ? play?.isPlay : false;
  const nameTrack = filename.slice(0, 32).split("-")[0];
  const durationTrack = `${formatDate(duration)} мин`;

  const handlerPressPlay = () => {
    if (id === play?.id) {
      onPlay({ ...play, isPlay: !play.isPlay });

      return;
    }

    onPlay({ id: id, isPlay: true });
  };

  return (
    <TouchableOpacity style={styles.track} onPress={handlerPressPlay}>
      <View style={styles.content}>
        <PlayButton play={isPlay} onPress={handlerPressPlay} />
        <View>
          <Text style={styles.name}>{nameTrack}</Text>
          <Text style={styles.time}>{durationTrack}</Text>
        </View>
      </View>
      <FavoriteIcon />
    </TouchableOpacity>
  );
};

export { Track };
