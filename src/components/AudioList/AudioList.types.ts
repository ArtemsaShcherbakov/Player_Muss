interface ICurrentTrack {
  id: string;
  filename: string;
  uri: string;
  isPlay: boolean;
}

type TCurrentTrack = ICurrentTrack | null;

export type { ICurrentTrack, TCurrentTrack };
