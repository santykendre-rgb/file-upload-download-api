// Configuration
const API_KEY = '3fded2b90ddfc8b0378e6b0bc87e9e0c'; // Free tier OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const suggestionsDiv = document.getElementById('suggestions');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const mainWeatherDiv = document.getElementById('mainWeather');
const forecastSection = document.getElementById('forecastSection');
const forecastContainer = document.getElementById('forecastContainer');
const welcomeSection = document.getElementById('welcome');

// State
let currentCity = null;
let debounceTimer = null;

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
geBtn.addEventListener('click', handleGeolocation);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
searchInput.addEventListener('input', handleSearchInput);

// Handle Search Input (with autocomplete)
function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        suggestionsDiv.innerHTML = '';
        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 300);
}

// Fetch City Suggestions
async function fetchCitySuggestions(query) {
    try {
        const response = await fetch(
            `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
        );
        const cities = await response.json();

        suggestionsDiv.innerHTML = '';
        
        if (cities.length === 0) {
            suggestionsDiv.innerHTML = '<div class="suggestion-item">No cities found</div>';
            return;
        }

        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `${city.name}, ${city.country}`;
            item.addEventListener('click', () => {
                fetchWeather(city.lat, city.lon);
                searchInput.value = '';
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        showError('Could not fetch city suggestions');
    }
}

// Handle Search Button
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        searchCityAndFetchWeather(query);
        searchInput.value = '';
        suggestionsDiv.innerHTML = '';
    }
}

// Search City and Fetch Weather
async function searchCityAndFetchWeather(cityName) {
    try {
        showLoading(true);
        const response = await fetch(
            `${GEO_URL}?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        const cities = await response.json();

        if (cities.length === 0) {
            showError(`City "${cityName}" not found`);
            showLoading(false);
            return;
        }

        const city = cities[0];
        fetchWeather(city.lat, city.lon);
    } catch (error) {
        console.error('Error searching city:', error);
        showError('Error searching for city');
        showLoading(false);
    }
}

// Handle Geolocation
function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        },
        (error) => {
            showLoading(false);
            showError(`Geolocation error: ${error.message}`);
        }
    );
}

// Fetch Weather Data
async function fetchWeather(lat, lon) {
    try {
        showLoading(true);
        clearError();

        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        // Fetch forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        if (weatherData.cod === '200') {
            displayWeather(weatherData);
            displayForecast(forecastData);
            currentCity = weatherData.name;
            showLoading(false);
        } else {
            showError('Could not fetch weather data');
            showLoading(false);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Error fetching weather data');
        showLoading(false);
    }
}

// Display Current Weather
function displayWeather(data) {
    const {
        main: { temp, feels_like, humidity, pressure },
        weather,
        wind: { speed },
        visibility,
        sys: { sunrise, sunset },
        clouds,
        rain,
        name,
        sys: { country }
    } = data;

    // Update UI
    document.getElementById('cityName').textContent = name;
    document.getElementById('countryCode').textContent = country;
    document.getElementById('dateTime').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('weatherDescription').textContent = weather[0].description;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${speed.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('feelsLike').textContent = `${Math.round(feels_like)}°C`;
    document.getElementById('sunrise').textContent = formatTime(sunrise);
    document.getElementById('sunset').textContent = formatTime(sunset);
    document.getElementById('rain').textContent = rain ? `${rain['1h']} mm` : '0 mm';

    // Update weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    // Show/Hide sections
    welcomeSection.classList.add('hidden');
    mainWeatherDiv.classList.remove('hidden');
}

// Display 5-Day Forecast
function displayForecast(data) {
    const forecastList = data.list;
    const dailyForecasts = {};

    // Group by day (one forecast per day at noon)
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const hour = date.getHours();

        // Get forecast at noon (12:00)
        if (hour >= 10 && hour <= 14 && !dailyForecasts[day]) {
            dailyForecasts[day] = item;
        } else if (!dailyForecasts[day] && !Object.keys(dailyForecasts).includes(day)) {
            dailyForecasts[day] = item;
        }
    });

    forecastContainer.innerHTML = '';
    Object.keys(dailyForecasts).slice(0, 5).forEach(day => {
        const item = dailyForecasts[day];
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const temp = item.main.temp;
        const tempMin = item.main.temp_min;
        const tempMax = item.main.temp_max;
        const desc = item.weather[0].description;
        const icon = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        card.innerHTML = `
            <div class="date">${day}</div>
            <img src="${iconUrl}" alt="${desc}" class="icon">
            <div class="description">${desc}</div>
            <div class="temp">${Math.round(temp)}°C</div>
            <div class="temp-range">${Math.round(tempMin)}°C - ${Math.round(tempMax)}°C</div>
        `;

        forecastContainer.appendChild(card);
    });

    forecastSection.classList.remove('hidden');
}

// Format Time (Unix timestamp to HH:MM)
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Show Loading
function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}

// Show Error
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => clearError(), 5000);
}

// Clear Error
function clearError() {
    errorDiv.classList.add('hidden');
}

// Initialize
window.addEventListener('load', () => {
    // Show welcome message on load
    welcomeSection.classList.remove('hidden');
});