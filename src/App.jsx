import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicExample from "./BasicExample";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "http://api.weatherapi.com/v1/current.json?key=ff3fe591a41f4a2aad7120400252704&q=Gorgan&aqi=no"
        );
        console.log(response);
        setTemperature(response.data.current.temp_c);
      } catch (err) {
        setError("خطا در دریافت اطلاعات");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div className="App">
      <BasicExample/> <h4> در حال بارگزاری </h4>
    </div>;
  }

  if (error) {
    return <div className="App">{error}</div>;
  }

  return (
    <div className="App">
      <h1>وضعیت آب و هوای گرگان</h1>
      <h2>دمای فعلی: {temperature}°C</h2>
    </div>
  );
}

export default App;
