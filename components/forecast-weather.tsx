import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForecastWeatherProps {
  data: any;
}

export function ForecastWeather({ data }: ForecastWeatherProps) {
  // Group forecast data by day
  const groupedForecast = data.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);
    return acc;
  }, {});

  // Get unique days (limit to 5)
  const days = Object.keys(groupedForecast).slice(0, 5);

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={days[0]}>
          <TabsList className="grid grid-cols-5 mb-4">
            {days.map((day) => (
              <TabsTrigger key={day} value={day} className="text-xs md:text-sm">
                {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {groupedForecast[day].map((item: any, index: number) => {
                  const time = new Date(item.dt * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                  return (
                    <Card
                      key={index}
                      className="bg-white/50 dark:bg-slate-700/50"
                    >
                      <CardContent className="p-4 flex flex-col items-center">
                        <p className="text-sm font-medium">{time}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          className="w-12 h-12"
                        />
                        <p className="text-lg font-bold">
                          {Math.round(item.main.temp)}°C
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                          {item.weather[0].description}
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                          <span className="text-muted-foreground">
                            Humidity:
                          </span>
                          <span>{item.main.humidity}%</span>
                          <span className="text-muted-foreground">Wind:</span>
                          <span>{item.wind.speed} m/s</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
