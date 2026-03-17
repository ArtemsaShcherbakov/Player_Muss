import type { LayoutChangeEvent } from "react-native";

import { TCurrentTrack, ICurrentTrack } from "../../AudioList.types";

interface IStatusBarProps {
  currentTrack: TCurrentTrack;
  switchTrack: (step: number) => void;
  onPlay: (track: ICurrentTrack) => void;
  onStatusBarLayout: (event: LayoutChangeEvent) => void;
}

export { IStatusBarProps };
