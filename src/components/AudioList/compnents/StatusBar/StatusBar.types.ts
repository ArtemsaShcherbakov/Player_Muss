import { TCurrentTrack, ICurrentTrack } from "../../AudioList.types";

interface IStatusBarProps {
  currentTrack: TCurrentTrack;
  switchTrack: (step: number) => void;
  onPlay: (track: ICurrentTrack) => void;
}

export { IStatusBarProps };
