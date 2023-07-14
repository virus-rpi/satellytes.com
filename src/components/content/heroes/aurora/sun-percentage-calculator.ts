export function getSunlightPercentage(sunriseTime, sunsetTime) {
  const time = new Date();

  const totalDaylightMinutes = (sunsetTime - sunriseTime) / (1000 * 60);
  const currentMinutes = (time.getTime() - sunriseTime) / (1000 * 60);
  const sunlightPercentage = (currentMinutes / totalDaylightMinutes) * 100;

  if (sunlightPercentage < 0) {
    return 0;
  }
  if (sunlightPercentage > 100) {
    return 100;
  }
  return Math.round(sunlightPercentage);
}
