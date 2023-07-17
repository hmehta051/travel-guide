export const formatTimestamp = (timestamp: string | number): string => {
  const currentTime: number = Math.floor(Date.now() / 1000);
  const timeDifference: number = currentTime - +timestamp;

  // Define the time units and their respective values in seconds
  const timeUnits: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  // Loop through the time units and find the appropriate one to use
  for (const unit in timeUnits) {
    const value: number = Math.floor(timeDifference / timeUnits[unit]);

    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }
  // If the timestamp is in the future or within a second, return "just now"
  return "just now";
};
