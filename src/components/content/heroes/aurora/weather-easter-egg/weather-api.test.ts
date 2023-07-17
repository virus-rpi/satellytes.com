import { WeatherType } from './weather-types';
import { getWeatherDescription } from './weather-api';

describe('getWeatherDescription', () => {
  it.each([
    [1000, WeatherType.Sunny],
    [1003, WeatherType.Cloudy],
    [1006, WeatherType.Cloudy],
    [1009, WeatherType.Cloudy],
    [1030, WeatherType.Cloudy],
    [1063, WeatherType.Rainy],
    [1066, WeatherType.Rainy],
    [1069, WeatherType.Rainy],
    [1072, WeatherType.Rainy],
    [1087, WeatherType.Rainy],
    [1114, WeatherType.Snowy],
    [1117, WeatherType.Snowy],
    [1135, WeatherType.Snowy],
    [1147, WeatherType.Snowy],
    [1150, WeatherType.Snowy],
    [1153, WeatherType.Snowy],
    [1168, WeatherType.Snowy],
    [1171, WeatherType.Snowy],
    [1180, WeatherType.Rainy],
    [1183, WeatherType.Rainy],
    [1186, WeatherType.Rainy],
    [1189, WeatherType.Rainy],
    [1192, WeatherType.Rainy],
    [1195, WeatherType.Rainy],
    [1198, WeatherType.Rainy],
    [1201, WeatherType.Rainy],
    [1204, WeatherType.Rainy],
    [1207, WeatherType.Rainy],
    [1210, WeatherType.Rainy],
    [1213, WeatherType.Rainy],
    [1216, WeatherType.Rainy],
    [1219, WeatherType.Rainy],
    [1222, WeatherType.Rainy],
    [1225, WeatherType.Snowy],
    [1237, WeatherType.Snowy],
    [1240, WeatherType.Snowy],
    [1243, WeatherType.Snowy],
    [1246, WeatherType.Rainy],
    [1249, WeatherType.Rainy],
    [1252, WeatherType.Rainy],
    [1255, WeatherType.Rainy],
    [1258, WeatherType.Rainy],
    [1261, WeatherType.Rainy],
    [1264, WeatherType.Rainy],
    [1273, WeatherType.Rainy],
    [1276, WeatherType.Rainy],
    [1279, WeatherType.Rainy],
    [1282, WeatherType.Rainy],
    [19999, WeatherType.NotSet],
  ])(
    'should return the correct weather type for condition code %s',
    (conditionCode, expectedWeatherType) => {
      const actualWeatherType = getWeatherDescription(conditionCode);
      expect(actualWeatherType).toBe(expectedWeatherType);
    },
  );
});
