import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { useLoadAudio } from "@hooks";

import { Track, StatusBar } from "./compnents";

import { ICurrentTrack, TCurrentTrack } from "./AudioList.types";

import styles from "./AudioList.styles";

const AudioList = () => {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  const [currentTrack, setCurrentTrack] = useState<TCurrentTrack>(null);

  const { audioFiles, loadMore } = useLoadAudio();

  useEffect(() => {
    if (status.didJustFinish) {
      switchTrack(1);
    }
  }, [status.playing]);

  // if (error) {
  //   return <Text style={{ color: "#fff" }}>Error</Text>;
  // }

  const handlePlay = ({ id, filename, uri }: ICurrentTrack) => {
    if (currentTrack?.id === id) {
      if (player.playing) {
        player.pause();

        setCurrentTrack({ ...currentTrack, isPlay: false });

        return;
      }

      player.play();

      setCurrentTrack({ ...currentTrack, isPlay: true });

      return;
    }

    setCurrentTrack({ id, filename, uri, isPlay: true });

    player.replace(uri);
    player.play();
  };

  const switchTrack = (step: number) => {
    const index = audioFiles.findIndex(({ id }) => id === currentTrack?.id);

    if (!index) return;

    setCurrentTrack({
      id: audioFiles[index + step].id,
      filename: audioFiles[index + step].filename,
      uri: audioFiles[index + step].uri,
      isPlay: true,
    });

    player.replace(audioFiles[index + step].uri);
    player.play();
  };

  return (
    <>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        style={styles.lists}
        renderItem={({ item }) => (
          <Track
            track={item}
            isPlaying={
              currentTrack?.id === item.id ? currentTrack.isPlay : false
            }
            onPlay={handlePlay}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      <StatusBar
        currentTrack={currentTrack}
        switchTrack={switchTrack}
        onPlay={handlePlay}
      />
    </>
  );
};

export { AudioList };
