import { useState } from "react";
import { FlatList } from "react-native";

import { useLoadAudio } from "@hooks";

import { Track } from "./compnents";

import type { TPlay } from "@types";

import styles from "./AudioList.styles";

const AudioList = () => {
  const [play, setPlay] = useState<TPlay>(null);

  const { audioFiles, loadMore } = useLoadAudio();

  const handlerPlay = (newPlay: TPlay) => setPlay(newPlay);

  return (
    <FlatList
      data={audioFiles}
      keyExtractor={(item) => item.id}
      style={styles.lists}
      renderItem={({ item }) => (
        <Track play={play} tarck={item} onPlay={handlerPlay} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export { AudioList };
