import { useEffect, useState } from "react";
import {
  usePermissions,
  getAssetsAsync,
  MediaType,
  PermissionStatus,
  SortBy,
  type Asset,
} from "expo-media-library";

const PAGE_SIZE = 20;

const useLoadAudio = () => {
  const [permissionResponse, requestPermission] = usePermissions();

  const [audioFiles, setAudioFiles] = useState<Asset[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadAudioFiles();
  }, []);

  const loadAudioFiles = async () => {
    if (loading || !hasNextPage) return;

    if (permissionResponse?.status !== PermissionStatus.GRANTED) {
      await requestPermission();
    }

    setLoading(true);

    const result = await getAssetsAsync({
      mediaType: [MediaType.audio],
      first: PAGE_SIZE,
      after: cursor,
      sortBy: [[SortBy.modificationTime, false]],
      resolveWithFullInfo: true,
    });

    setAudioFiles((prev) => [...prev, ...result.assets]);
    setCursor(result.endCursor);
    setHasNextPage(result.hasNextPage);

    setLoading(false);
  };

  return {
    audioFiles,
    loadMore: loadAudioFiles,
  };
};

export { useLoadAudio };
