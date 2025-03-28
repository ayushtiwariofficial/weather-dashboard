"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchedCity(city);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-100 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white">
          Weather Dashboard
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
          />
          <Button type="submit" variant="default">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {searchedCity && <WeatherDashboard city={searchedCity} />}
      </div>
    </main>
  );
}
