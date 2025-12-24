const API_KEY = '84d999b7bce741ef94c71205252706';
const API_URL = 'http://api.weatherapi.com/v1/current.json';

function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.fillStyle = 'rgba(15, 12, 41, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

async function getWeather(city) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const weatherInfo = document.getElementById('weatherInfo');

    loading.classList.remove('hidden');
    error.classList.add('hidden');
    weatherInfo.classList.add('hidden');

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        error.textContent = 'Unable to fetch weather data. Please check the city name and try again.';
        error.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayWeather(data) {
    const { location, current } = data;

    document.getElementById('cityName').textContent = `${location.name}, ${location.country}`;
    document.getElementById('localTime').textContent = new Date(location.localtime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('weatherIcon').src = `https:${current.condition.icon}`.replace('64x64', '128x128');
    document.getElementById('temperature').textContent = `${Math.round(current.temp_c)}°`;
    document.getElementById('condition').textContent = current.condition.text;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(current.feelslike_c)}°C`;

    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${current.wind_kph} km/h`;
    document.getElementById('pressure').textContent = `${current.pressure_mb} mb`;
    document.getElementById('uvIndex').textContent = current.uv;

    document.getElementById('weatherInfo').classList.remove('hidden');
}

function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
}

document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

initBackground();
getWeather('London');
