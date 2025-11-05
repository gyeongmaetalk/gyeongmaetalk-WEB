export const formatRemainingTime = (remainingTime: number | null) => {
  if (remainingTime === null) {
    return undefined;
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
