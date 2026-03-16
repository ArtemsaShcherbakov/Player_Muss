import { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { useLoadAudio } from "@hooks";
import { Track, StatusBar } from "./compnents";

import styles from "./AudioList.styles";

const AudioList = () => {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  const [currentTrack, setCurrentTrack] = useState<any>(null);

  const { audioFiles, error, loadMore } = useLoadAudio();

  useEffect(() => {
    if (status.didJustFinish) {
      switchTrack(1);
    }
  }, [status.playing]);

  if (error) {
    return <Text style={{ color: "#fff" }}>Error</Text>;
  }

  const handlePlay = (id: string, filename: string, uri: string) => {
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

    setCurrentTrack({ id, filename, isPlay: true });

    player.replace(uri);
    player.play();
  };

  const switchTrack = (step: number) => {
    const index = audioFiles.findIndex(({ id }) => id === currentTrack.id);

    if (!index) return;

    setCurrentTrack({ id: audioFiles[index + step].id, isPlay: true });

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
            id={item.id}
            uri={item.uri}
            filename={item.filename}
            duration={item.duration}
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
