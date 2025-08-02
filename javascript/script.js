const input = document.querySelector('#city-input')
const temperature = document.querySelector('.temperature')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const condition = document.querySelector('.condition')
const icon = document.querySelector('.weather-icon-img')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const datetime = document.querySelector('.datetime')

const weatherImg = document.querySelector('.weather-img')

// const conditionValue = ''

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

    const weatherGroup = getWeatherGroup(data.current.condition.text)
    changeWeatherImage(weatherGroup)

    console.log(weatherGroup)
  } catch (error) {
    console.error('Erro ao buscar o clima:', error);
    alert('Não foi possível obter o clima. Tente novamente.');
  }
  
}

function getWeatherGroup(conditionText){
  const weatherConditions = {
    rainy: ['chuva', 'aguaceiro', 'chuvisco'],
    sunny: ['sol', 'céu limpo'],
    snowy: ['neve', 'nevasca'],
    cloudy: ['nublado', 'encoberto', 'neblina']
  };

  const texto = conditionText.toLowerCase();

  for (const [key, palavras] of Object.entries(weatherConditions)) {
    if (palavras.some(palavra => texto.includes(palavra))) {
      return key;
    }
  }
  return 'default';
  
}

function changeWeatherImage(weatherGroup) {
  weatherImg.setAttribute('src', `./Assets/${weatherGroup}.gif`);
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

getWeather('Recife');
