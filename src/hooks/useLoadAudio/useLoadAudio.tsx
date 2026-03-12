import { useEffect, useState, useCallback } from "react";
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
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Основная загрузка
   */
  const loadAudioFiles = useCallback(async () => {
    if (loading || !hasNextPage) return;

    try {
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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Неизвестная ошибка при загрузке аудиофайлов";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasNextPage, loading]);

  /**
   * Работа с permissions
   */
  useEffect(() => {
    const checkPermission = async () => {
      if (!permissionResponse) return;
      if (permissionResponse.status === PermissionStatus.GRANTED) {
        loadAudioFiles();
      }
      if (permissionResponse.status === PermissionStatus.UNDETERMINED) {
        const res = await requestPermission();
        if (res.status === PermissionStatus.GRANTED) {
          loadAudioFiles();
        }
      }
    };
    checkPermission();
  }, [permissionResponse, loadAudioFiles]);

  return {
    audioFiles,
    error,
    loading,
    hasNextPage,
    loadMore: loadAudioFiles,
  };
};

export { useLoadAudio };
