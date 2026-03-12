/**
 * Преобразует длительность в секундах в формат "ММ:СС".
 *
 * @param seconds - Длительность в секундах (может быть дробной).
 * @returns Отформатированная строка с минутами и секундами, например, "2:40".
 *
 * @example
 * ```ts
 * formatDate(160.056); // "2:40"
 * formatDate(73.5);    // "1:13"
 * formatDate(3661);    // "61:01"
 * ```
 *
 * @remarks
 * Функция округляет значение до целых секунд в меньшую сторону.
 * Если нужен ведущий ноль для минут (например, "02:40"), измените возвращаемую строку:
 * ```ts
 * return `${minutes.toString().padStart(2, '0')}:${paddedSeconds}`;
 * ```
 */
const formatDate = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds); // округляем до целых секунд
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

export { formatDate };
