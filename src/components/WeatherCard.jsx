import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const WeatherCard = ({ temp, timeOfDay, humidity, windDirection, windSpeed, date }) => {
  if (temp && timeOfDay && humidity && windDirection && windSpeed && date) {
    return (
      <motion.div
        className="card text-center p-3 m-3"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2>
          {temp}°C ({timeOfDay})
        </h2>
        <p>
          رطوبت: {humidity}%
        </p>
        <p>
          جهت باد: {windDirection} با سرعت {windSpeed} متر بر ثانیه
        </p>
        <small>
          {date}
        </small>
      </motion.div>
    );
  }
  return null;
}

WeatherCard.propTypes = {
  temp: PropTypes.number.isRequired,
  timeOfDay: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  windDirection: PropTypes.string.isRequired,
  windSpeed: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default WeatherCard;
