export default function calculateTime(time) {
  const releaseTime = new Date(time);

  const currentTime = new Date();

  const elapsedTime = currentTime.getTime() - releaseTime.getTime();

  const elapsedSeconds = Math.floor(elapsedTime / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);

  const elapsedDays = Math.floor(elapsedHours / 24);

  const elapsedWeeks = Math.floor(elapsedDays / 7);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedDays / 365);

  const remainingMonths = elapsedMonths % 12;
  const remainingYears = Math.floor(elapsedMonths / 12);
  if (remainingYears >= 1)
    return `${remainingYears} ${remainingYears > 1 ? "years ago" : "year ago"}`;
  else if (remainingMonths >= 1)
    return `${remainingMonths} ${
      remainingMonths > 1 ? "months ago" : "month ago"
    }`;
  else if (elapsedWeeks >= 1)
    return `${elapsedWeeks} ${elapsedWeeks > 1 ? "weeks ago" : "week ago"}`;
  else if (elapsedDays >= 1)
    return `${elapsedDays} ${elapsedDays > 1 ? "days ago" : "day ago"}`;
  else if (elapsedHours >= 1)
    return `${elapsedHours} ${elapsedHours > 1 ? "hours ago" : "hour ago"}`;
  else if (elapsedMinutes > 1)
    return `${elapsedMinutes} ${
      elapsedMinutes > 1 ? "minutes ago" : "minute ago"
    }`;
  else return "Recently";
}
calculateTime("2023-05-01T00:00:00.000Z");
