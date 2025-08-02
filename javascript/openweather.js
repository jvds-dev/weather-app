const input = document.querySelector('#city-input')
const temperature = document.querySelector('.temperature')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const condition = document.querySelector('.condition')
const icon = document.querySelector('.weather-icon-img')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const datetime = document.querySelector('.datetime')

async function getWeather(cityName) {
  try {
    const response = await fetch(`https://weather-api-server-production.up.railway.app/clima?cidade=${encodeURIComponent(cityName)}`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    const data = await response.json();

    temperature.textContent = `${Math.round(data.current.temp_c)}°`;
    city.textContent = data.location.name;
    country.textContent = data.location.country;
    condition.textContent = data.current.condition.text;
    icon.src = data.current.condition.icon;
    wind.textContent = `${data.current.wind_kph} km/h`;
    humidity.textContent = `${data.current.humidity}%`;
    datetime.textContent = data.location.localtime;
  } catch (error) {
    console.error('Erro ao buscar o clima:', error);
    alert('Não foi possível obter o clima. Tente novamente.');
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const cityName = input.value.trim();
    if (cityName) {
      getWeather(cityName);
      input.value = '';
    }
  }
});

// Opcional: busca inicial
getWeather('Recife');