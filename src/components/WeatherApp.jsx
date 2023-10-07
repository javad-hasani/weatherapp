import { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BsSearch } from 'react-icons/bs';
import WeatherCard from './WeatherCard';

const ApiKey = "2aa15dbfad980af758983c13b9a32f0b";

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(apiUrl(city), { origin: "cors" });
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const Ktoc = (k) => Math.floor(k - 273.15);

  const getWindDirection = (deg) => {
    const directions = ['شمال', 'شمال-شمال شرق', 'شمال شرق', 'شمال شرق-شرق', 'شرق', 'جنوب شرق-شرق', 'جنوب شرق', 'جنوب شرق-جنوب', 'جنوب', 'جنوب-جنوب غرب', 'جنوب غرب', 'غرب شرق-جنوب غرب', 'غرب', 'شمال غرب-غرب', 'شمال غرب'];
    const index = Math.round((deg / 22.5) % 16);
    return directions[index];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeatherData();
  }

  const renderWeatherCards = () => {
    if (weatherData) {
      const forecasts = weatherData.list.filter((item, index) => index % 8 === 0);

      return forecasts.map((forecast, index) => {
        if (forecast.main && forecast.main.temp && forecast.dt_txt) {
          const temp = Ktoc(forecast.main.temp);
          const date = new Date(forecast.dt_txt);
          const timeOfDay = date.getHours() >= 6 && date.getHours() < 18 ? "روز" : "شب";
          const humidity = forecast.main.humidity;
          const windDirection = getWindDirection(forecast.wind.deg);
          const windSpeed = forecast.wind.speed;

          return (
            <WeatherCard
              key={index}
              temp={temp}
              timeOfDay={timeOfDay}
              humidity={humidity}
              windDirection={windDirection}
              windSpeed={windSpeed}
              date={date.toDateString()}
            />
          );
        }
        return null;
      });
    }
    return null;
  }

  return (
    <motion.div
      className="container text-center mt-5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <motion.h1
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        برنامه هواشناسی وادو
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.div
          className="d-flex justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control w-50 mr-2"
            placeholder="نام شهر را وارد کنید"
            whileHover={{ scale: 1.1, borderColor: '#00BFFF' }}
            whileFocus={{ borderColor: '#00BFFF' }}
          />
          <motion.button
            type="submit"
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ x: city ? "-44px" : "5%" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BsSearch size={24} />
          </motion.button>
        </motion.div>
      </motion.form>
      <motion.div
        className="d-flex justify-content-center flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {renderWeatherCards()}
      </motion.div>
    </motion.div>
  );
}

export default WeatherApp;
