const input = document.querySelector('#city-input')
const weatherImg = document.querySelector('.weather-img')
const cards = document.querySelector('.cards')
const btnAddCard = document.querySelector("#button-add-card")

const toolbar = document.querySelector('.toolbar')
const visibleToolbar = false
const btnRemoveSelected = document.querySelector("#button-remove-selected")


async function getWeather(cityName) {
	try {
		const response = await fetch(`https://weather-api-server-production.up.railway.app/clima?cidade=${encodeURIComponent(cityName)}`);
		if (!response.ok) {
			throw new Error(`Erro na API: ${response.status}`);
		}
		const data = await response.json();

		createWeatherCard(data);

	} catch (error) {
		console.error('Erro ao buscar o clima:', error);
		alert('Não foi possível obter o clima. Tente novamente.');
	}
}

function createWeatherCard(data) {
	const container = document.createElement('div');
	container.classList.add('weather-container');
	const weatherCondition = getWeatherGroup(data.current.condition.text)
	container.innerHTML = `
      <div class="top-weather-container">
          <h2 class="temperature">${Math.round(data.current.temp_c)}°</h2>
          <div class="weather-icon-container">
              <img class="weather-icon-img" src="${data.current.condition.icon}" alt="icon">
          </div>
          <h3 class="condition">${data.current.condition.text}</h3>
      </div>
      <div class="bottom-weather-container">
          <h2 class="city">${data.location.name}</h2>
          <h3 class="country">${data.location.country}</h3>
          <div class="info">
              <div class="first-row">
                  <div class="info-item-container">
                      <i class="fa-solid fa-wind"></i>
                      <p class="wind">${data.current.wind_kph} km/h</p>
                  </div>
                  <div class="info-item-container">
                      <i class="fa-solid fa-droplet"></i>
                      <p class="humidity">${data.current.humidity}%</p>
                  </div>
                  <div class="info-item-container">
                      <i class="fa-solid fa-calendar-week"></i>
                      <p class="datetime">${data.location.localtime}</p>
                  </div>
              </div>
          </div>
      </div>
  `;
	const topContainer = container.querySelector('.top-weather-container')
	topContainer.style.backgroundImage = `url("Assets/${weatherCondition}.gif")`
	cards.append(container)
	// return container;

}

function getWeatherGroup(conditionText) {
	const weatherConditions = {
		rainy: ['chuva', 'aguaceiro', 'chuvisco'],
		sunny: ['sol', 'céu limpo'],
		snowy: ['neve', 'nevasca'],
		cloudy: ['nublado', 'encoberto', 'neblina', 'nevoeiro']
	};

	const texto = conditionText.toLowerCase();

	for (const [key, palavras] of Object.entries(weatherConditions)) {
		if (palavras.some(palavra => texto.includes(palavra))) {
			return key;
		}
	}
	return 'snowy';

}

function searchCity() {
	const cityName = input.value.trim();
	if (cityName) {
		getWeather(cityName);
		input.value = '';
	}
}

function changeWeatherImage(weatherGroup) {
	weatherImg.setAttribute('src', `./Assets/${weatherGroup}.gif`);
}

input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		searchCity()
	}
});

btnAddCard.onclick = searchCity

cards.addEventListener('click', (e) => {
	const container = e.target.closest('.weather-container');
	
	if (container) {
		container.classList.toggle('selected');

		const thereAreSelected = [...document.querySelectorAll('.weather-container')]
			.some(element => element.classList.contains('selected'));

		if (thereAreSelected) {
			toolbar.classList.add('visible');
		} else {
			toolbar.classList.remove('visible');
		}
	}
});

btnRemoveSelected.onclick = () => {
	document.querySelectorAll('.selected').forEach(element => {
		element.remove()
		toolbar.classList.remove('visible')
	})
}

