import { View, TouchableOpacity } from "react-native";

import { PlayButton, MarqueeText } from "@components";

import NextIcon from "@assets/icons/Next.svg";
import BackIcon from "@assets/icons/Back.svg";

import { styles } from "./StatusBar.styles";

interface IStatusBarProps {
  currentTrack: {
    id: string;
    filename: string;
    url: string;
    isPlay: boolean;
  } | null;
  switchTrack: (step: number) => void;
  onPlay: (id: string, filename: string, uri: string) => void;
}

const StatusBar = ({ currentTrack, switchTrack, onPlay }: IStatusBarProps) => {
  if (!currentTrack) return null;

  const switchNextTrack = () => switchTrack(1);

  const switchBackTrack = () => switchTrack(-1);
  return (
    <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MarqueeText text={currentTrack.filename} width={220} />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity onPress={switchBackTrack}>
              <BackIcon />
            </TouchableOpacity>
            <PlayButton
              play={currentTrack.isPlay}
              iconPlaySize={{ width: 20, height: 23 }}
              iconStopSize={{ width: 30, height: 30 }}
              styleButton={{ width: 40, height: 40 }}
              onPress={() =>
                onPlay(currentTrack.id, currentTrack.filename, currentTrack.url)
              }
            />
            <TouchableOpacity disabled onPress={switchNextTrack}>
              <NextIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { StatusBar };
