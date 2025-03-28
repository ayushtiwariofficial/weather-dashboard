"use client";

import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { WeatherSkeleton } from "./weather-skeleton";
import { CurrentWeather } from "./ui/current-weather";
import { ForecastWeather } from "./forecast-weather";

interface WeatherDashboardProps {
  city: string;
}

export function WeatherDashboard({ city }: WeatherDashboardProps) {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );

        if (!currentRes.ok) {
          throw new Error(
            `City not found or API error: ${currentRes.statusText}`
          );
        }

        const currentData = await currentRes.json();
        setCurrentWeather(currentData);

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );

        if (!forecastRes.ok) {
          throw new Error(`Forecast data error: ${forecastRes.statusText}`);
        }

        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <ForecastWeather data={forecast} />}
    </div>
  );
}
