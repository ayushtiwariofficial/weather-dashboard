import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Thermometer,
  Wind,
  Compass,
  Sunrise,
  Sunset,
} from "lucide-react";

interface CurrentWeatherProps {
  data: any;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  // Format date
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sunrise = formatTime(data.sys.sunrise);
  const sunset = formatTime(data.sys.sunset);

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-2xl md:text-3xl">
              {data.name}, {data.sys.country}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <Badge className="self-start md:self-auto text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600">
            {data.weather[0].main}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-20 h-20"
              />
              <span className="text-sm capitalize">
                {data.weather[0].description}
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-bold">
              {Math.round(data.main.temp)}°C
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Feels Like</p>
                <p className="font-medium">
                  {Math.round(data.main.feels_like)}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-medium">{data.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-medium">{data.wind.speed} m/s</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pressure</p>
                <p className="font-medium">{data.main.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sunrise</p>
                <p className="font-medium">{sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sunset</p>
                <p className="font-medium">{sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
