import { useState } from "react";
import { FlatList, Text } from "react-native";

import { useLoadAudio } from "@hooks";

import { Track } from "./compnents";

import type { TPlay } from "@types";

import styles from "./AudioList.styles";

const AudioList = () => {
  const [play, setPlay] = useState<TPlay>(null);

  const { audioFiles, error, loadMore } = useLoadAudio();

  // TODO: обработать нормально
  if (error) {
    return <Text style={{ color: "#fff" }}>Error</Text>;
  }

  const handlerPlay = (newPlay: TPlay) => setPlay(newPlay);

  return (
    <FlatList
      data={audioFiles}
      keyExtractor={(item) => item.id}
      style={styles.lists}
      renderItem={({ item }) => (
        <Track play={play} track={item} onPlay={handlerPlay} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export { AudioList };
