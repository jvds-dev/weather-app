// Defina a URL da API e a chave da API
const apiKey = API_KEY;
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

// Função para buscar o clima com base em uma cidade
function getWeather(city) {
    // Construa a URL da requisição com os parâmetros necessários
    const url = `${apiUrl}?key=${apiKey}&q=${city}&lang=pt`;

    // Faça a requisição GET usando fetch
    fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição à API Weather');
        }
        return response.json();
        })
        .then(data => {
            console.log('Dados meteorológicos:', data);
        
            const temperature = document.getElementById('temperature');
            temperature.innerText = `${Math.round(Number(data.current.temp_c))}°`;
            const cityName = document.getElementById('city-name');
            cityName.innerText = data.location.name;
            const countryName = document.getElementById('country-name');
            countryName.innerHTML = `${data.location.country}`;
            
            const condition = data.current.condition.text;
            const conditionText = document.getElementById("condition");
            conditionText.innerText=condition

            const icon = document.getElementById('icon-img');
            icon.setAttribute('src', data.current.condition.icon)

            const wind = document.getElementById('wind')
            wind.innerText = `${data.current.wind_kph} km/h`

            const humidity = document.getElementById('humidity');
            humidity.innerText = `${data.current.humidity}`

            const datetime = document.getElementById('datetime');
            datetime.innerText = data.location.localtime

            const sunny = document.getElementById('sunny-img');
            const rainy = document.getElementById('rainy-img');
            const cloudy = document.getElementById('cloudy-img');
            const snowy = document.getElementById('snowy-img');
            const defaultCondition = document.getElementById('default-img')

            const palavrasChaveChuva = ['chuva', 'aguaceiro', 'chuvisco'];
            const palavrasChaveSol = ['sol', 'céu limpo'];
            const palavrasChaveNeve = ['neve', 'nevasca'];
            const palavrasChaveNublado = ['nublado', 'encoberto', 'neblina'];
            
            if(palavrasChaveChuva.some(palavra => condition.includes(palavra))){
                sunny.classList.remove('showing');
                rainy.classList.add('showing');
                cloudy.classList.remove('showing');
                snowy.classList.remove('showing');
                defaultCondition.classList.remove('showing');
            }
            else if(palavrasChaveSol.some(palavra => condition.includes(palavra))){
                sunny.classList.add('showing');
                rainy.classList.remove('showing');
                cloudy.classList.remove('showing');
                snowy.classList.remove('showing');
                defaultCondition.classList.remove('showing');
            }
            else if(palavrasChaveNeve.some(palavra => condition.includes(palavra))){
                sunny.classList.remove('showing');
                rainy.classList.remove('showing');
                cloudy.classList.remove('showing');
                snowy.classList.add('showing');
                defaultCondition.classList.remove('showing');
            }
            else if(palavrasChaveNublado.some(palavra => condition.includes(palavra))){
                sunny.classList.remove('showing');
                rainy.classList.remove('showing');
                cloudy.classList.add('showing');
                snowy.classList.remove('showing');
                defaultCondition.classList.remove('showing');
            }
            else{
                sunny.classList.remove('showing');
                rainy.classList.remove('showing');
                cloudy.classList.remove('showing');
                snowy.classList.remove('showing');
                defaultCondition.classList.add('showing');
            }
        


        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Chame a função getWeather com a cidade desejada
let cidade = 'Tokyo'; // Substitua pela cidade desejada
getWeather(cidade);

const input = document.getElementById("cityInput")
input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        try{
            cidade = input.value;
            getWeather(cidade);
            input.value=''
        }
        catch (e){
            console.error('Ocorreu um erro: ', e.message)
        }
    }
})
