# Weather Dashboard

A modern, fully-functional weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions, forecasts, and detailed meteorological information for any location worldwide.

## 🌍 Features

✅ **Real-time Weather Data** - Current temperature, conditions, and detailed metrics  
✅ **5-Day Forecast** - See weather predictions for the next 5 days  
✅ **City Search** - Search for any city worldwide with autocomplete suggestions  
✅ **Geolocation** - Get weather for your current location automatically  
✅ **Detailed Metrics** - Humidity, wind speed, pressure, visibility, sunrise/sunset times  
✅ **Weather Icons** - Beautiful animated weather icons from OpenWeatherMap  
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
✅ **Smooth Animations** - Elegant transitions and loading states  
✅ **Error Handling** - Graceful error messages and validation  
✅ **No Backend Required** - Uses public API (free tier available)  

## 📁 Project Structure

```
weather-dashboard/
├── index.html      (HTML structure)
├── styles.css      (Responsive styling)
├── script.js       (API integration and logic)
└── README.md       (This file)
```

## 🚀 Quick Start

### Method 1: Direct File Access
```bash
# Clone the repository
git clone https://github.com/santykendre-rgb/file-upload-download-api.git
cd file-upload-download-api/weather-dashboard

# Open in browser
open index.html
```

### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Then visit: http://localhost:8000/weather-dashboard/
```

## 🔑 API Key

The application uses a **free tier OpenWeatherMap API key** that is already included in the code.

### Optional: Use Your Own API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Get your API key from the API keys section
4. Update the `API_KEY` variable in `script.js`:

```javascript
const API_KEY = 'your_api_key_here';
```

## 🎮 How to Use

### Search for a City
1. Type a city name in the search box
2. View autocomplete suggestions
3. Click a suggestion or press Enter to search
4. Weather data loads automatically

### Use Your Location
1. Click the **Location** button (📍)
2. Allow browser to access your location
3. Weather for your area displays instantly

### View Information
- **Current Weather** - Large temperature display with conditions
- **Detailed Metrics** - Humidity, wind speed, pressure, visibility, etc.
- **Sunrise/Sunset** - See daylight hours for the location
- **5-Day Forecast** - Swipeable forecast cards with daily predictions

## 🌡️ Weather Data Displayed

### Current Weather
- Temperature (in °C)
- "Feels Like" temperature
- Weather description (Sunny, Rainy, Cloudy, etc.)
- Weather icon

### Metrics
| Metric | Description |
|--------|-------------|
| **Humidity** | Percentage of moisture in air |
| **Wind Speed** | Speed in meters per second (m/s) |
| **Pressure** | Atmospheric pressure in hectopascals (hPa) |
| **Visibility** | How far you can see in kilometers |
| **Sunrise/Sunset** | Local sunrise and sunset times |
| **Rain** | Rainfall in millimeters (if applicable) |

### 5-Day Forecast
- Daily date
- High/low temperatures
- Weather condition
- Weather icon

## 🎨 Features in Detail

### Search with Autocomplete
```javascript
// Searches as you type with debouncing
// Shows suggestions for matching cities
// Click to select or press Enter
```

### Geolocation Support
```javascript
// Uses browser's Geolocation API
// Automatically fetches weather for your location
// Requires user permission
```

### API Integration
```javascript
// OpenWeatherMap API endpoints:
// - Current weather: /weather
// - 5-day forecast: /forecast
// - Geocoding: /geo/1.0/direct (for city search)
```

### Temperature Units
- Currently set to **Celsius**
- Can be changed to **Fahrenheit** by modifying API parameter

Change in `fetchWeather()` function:
```javascript
// Replace 'metric' with 'imperial' for Fahrenheit
`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
```

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop (1024px+)**: Full layout with detailed grid
- **Tablet (600px-1024px)**: Optimized spacing
- **Mobile (<600px)**: Single column layout, touch-friendly

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - No external dependencies
- **OpenWeatherMap API** - Free weather data service
- **Font Awesome** - Weather and UI icons

### API Endpoints Used

1. **Current Weather**
   ```
   GET /weather?lat={lat}&lon={lon}&units={units}&appid={key}
   ```

2. **5-Day Forecast**
   ```
   GET /forecast?lat={lat}&lon={lon}&units={units}&appid={key}
   ```

3. **Geocoding (City Search)**
   ```
   GET /geo/1.0/direct?q={city}&limit={limit}&appid={key}
   ```

### Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### API Rate Limits (Free Tier)
- **Calls**: 60 per minute
- **Requests**: 1,000,000 per month
- **Data age**: 10 minutes

## 🛡️ Error Handling

The application handles various error scenarios:
- **Network errors** - Connection issues
- **City not found** - Invalid city names
- **Geolocation denied** - User denies location access
- **API errors** - Server-side issues

Errors display in a dismissable banner at the top.

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #667eea;      /* Main color */
    --secondary: #764ba2;    /* Accent color */
    --error: #ff6b6b;        /* Error color */
}
```

### Change Temperature Unit
In `script.js`, replace `metric` with `imperial`:
```javascript
// For Fahrenheit
`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
```

### Add More Weather Details
Use additional fields from the API response:
```javascript
const { clouds, uvi, dewPoint } = data; // More available fields
```

## 🚀 Future Enhancements

- 🌙 Dark mode toggle
- 📍 Saved locations / favorites
- 📊 Weather charts and graphs
- 🌧️ Hourly forecast (3-hour intervals)
- 🔔 Weather alerts and warnings
- 🗺️ Interactive weather map
- 📱 PWA (Progressive Web App)
- 💾 Offline support with caching
- 📤 Export weather data
- 🌐 Multi-language support

## ⚠️ Important Notes

### API Key Security
- The included API key is for demonstration only
- For production use, implement a backend proxy
- Never expose API keys in client-side code
- Consider rate limiting and caching

### Geolocation
- Requires HTTPS or localhost (for security)
- User must grant permission
- May not work in private browsing mode on some browsers

### Data Accuracy
- Weather data is typically 10+ minutes old
- Forecasts are probabilistic estimates
- Check official weather services for warnings

## 📝 Example Usage

```
1. Open the application
2. Type "London" in the search box
3. See suggestions appear
4. Click "London, GB"
5. View current weather and 5-day forecast
6. Click location button to see your local weather
7. Explore different cities
```

## 🤝 Contributing

Feel free to fork and improve this project! Suggestions welcome.

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

## 🙏 Credits

- **Weather Data**: [OpenWeatherMap](https://openweathermap.org/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Weather Icons**: OpenWeatherMap

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify your internet connection
3. Ensure location services are enabled
4. Try a different city
5. Clear browser cache and reload

---

**Built with ❤️ using HTML, CSS, and JavaScript**

Enjoy exploring the weather! 🌤️⛅🌧️