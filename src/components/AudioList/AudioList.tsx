import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  FlatList,
  useWindowDimensions,
  type LayoutChangeEvent,
} from "react-native";
import type { Asset } from "expo-media-library";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { useLoadAudio } from "@hooks";
import { Track, StatusBar } from "./compnents";

import type { ICurrentTrack, TCurrentTrack } from "./AudioList.types";

import styles from "./AudioList.styles";

const AudioList = () => {
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  const { height } = useWindowDimensions();

  const [currentTrack, setCurrentTrack] = useState<TCurrentTrack>(null);
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);

  const { audioFiles, loadMore } = useLoadAudio();

  const currentTrackRef = useRef<TCurrentTrack>(null);

  const hasCurrentTrack = currentTrack !== null;

  const listStyle = useMemo(() => {
    const listHeight = height - statusBarHeight;

    return currentTrack
      ? [
          styles.lists,
          {
            height: listHeight,
            marginBottom: 0,
          },
        ]
      : styles.lists;
  }, [hasCurrentTrack, statusBarHeight, height]);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    if (status.didJustFinish) {
      switchTrack(1);
    }
  }, [status.didJustFinish]);

  const handlePlay = useCallback(
    ({ id, filename, uri }: ICurrentTrack) => {
      const current = currentTrackRef.current;

      if (current?.id === id) {
        if (player.playing) {
          player.pause();
          setCurrentTrack({ ...current, isPlay: false });
          return;
        }

        player.play();
        setCurrentTrack({ ...current, isPlay: true });
        return;
      }

      const newTrack = { id, filename, uri, isPlay: true };

      setCurrentTrack(newTrack);

      player.replace(uri);
      player.play();
    },
    [player],
  );

  const switchTrack = useCallback(
    (step: number) => {
      const current = currentTrackRef.current;

      const index = audioFiles.findIndex(({ id }) => id === current?.id);

      if (index === -1) return;

      const newIndex = index + step;

      if (newIndex < 0 || newIndex >= audioFiles.length) return;

      const nextTrack = audioFiles[newIndex];

      const newTrack = {
        id: nextTrack.id,
        filename: nextTrack.filename,
        uri: nextTrack.uri,
        isPlay: true,
      };

      setCurrentTrack(newTrack);

      player.replace(nextTrack.uri);
      player.play();
    },
    [audioFiles, player],
  );

  const handleStatusBarLayout = useCallback((event: LayoutChangeEvent) => {
    setStatusBarHeight(event.nativeEvent.layout.height);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Asset }) => {
      const isPlaying =
        currentTrack?.id === item.id ? currentTrack?.isPlay : false;

      return (
        <Track
          track={item}
          isPlaying={isPlaying || false}
          onPlay={handlePlay}
        />
      );
    },
    [currentTrack, handlePlay],
  );

  return (
    <>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={listStyle}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        windowSize={10}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        removeClippedSubviews
      />
      <StatusBar
        currentTrack={currentTrack}
        switchTrack={switchTrack}
        onPlay={handlePlay}
        onStatusBarLayout={handleStatusBarLayout}
      />
    </>
  );
};

export { AudioList };
