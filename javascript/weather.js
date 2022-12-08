//===============Declared Varibles===============
var now = dayjs();
var searchHistoryList = document.querySelector("#searchHistory");
const searchButton = document.querySelector("#searchBtn");
const clearButton = document.querySelector("#clearBtn");
const cityInput = document.querySelector("#citySearch");

//Open weather app API Key provided from account
const apiKey = 'a80e4a931f6c57023477a68e872c37b2';
var today = dayjs();

//===============Event Listeners===============
searchButton.addEventListener('click', function() {
    recentHistoryList();
});

clearButton.addEventListener('click', function() {
    localStorage.clear();
})


//===============Functions===============
//Save city search history
function getCityList () {
    var recentList = localStorage.getItem("cityList");
    if (recentList !== null ){
        newList = JSON.parse(recentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function addCity (n) {
    var addedList = getCityList();
    addedList.push(n);
    localStorage.setItem("cityList", JSON.stringify(addedList));
};

function recentHistoryList () {
    var searchHistory ={
        city: cityInput.value,
    }
    addCity(searchHistory);
};

//Render city search history
function renderHistoryList () {
    searchHistoryList.innerHTML = "";
    var cityList = getCityList();   
    //This will slice our scores array to only show 10 scores if more than 10 are submitted
    var recentCities = cityList.slice(0,10);
    //This will increase the data indez by 1 for each list item
    for (var i = 0; i < recentCities.length; i++) {
        var item = recentCities[i];
        var list = document.createElement("li");
        list.textContent = item.city;
        list.setAttribute("data-index", i);
        list.classList.add("list-group-item");
        searchHistoryList.appendChild(list);
    }
};

//Weather API fetch for current
function getCurrent( cityID ) {
    var cityID = "Minneapolis,US";
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=${apiKey}`;
    fetch(currentUrl)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      renderWeather(data);
      // console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  };

function renderWeather( d ) {
  var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var currentDate = dayjs().format('dddd, MMMM D, YYYY ');
  var iconCode = d.weather[0].icon;
  let weatherIcon = "https://openweathermap.org/img/w/" + iconCode + ".png";

  document.getElementById('location').innerHTML = d.name + ' (' + currentDate + ')';
  document.getElementById('wicon').setAttribute('src', weatherIcon);
  document.getElementById('description').innerHTML = 'Currently: ' + d.weather[0].description;
  document.getElementById('temp').innerHTML = 'Temp: ' + fahrenheit + '&deg; F';
  document.getElementById('wind').innerHTML = 'Wind: ' + d.wind.speed + 'mph';
  document.getElementById('humidity').innerHTML = 'Humidity: ' + d.main.humidity + '%';

  var cityFive = d.id;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityFive}&appid=${apiKey}&cnt=5`;
  fetch(fiveDayUrl)
  .then(function(response) { return response.json() }) // Convert data to json
    .then(function(info) {
      console.log(info);
      console.log(cityFive);
      let dayForecast = response.list.dt;
      let weatherForecast = '<div class="col custombox">'
                      + '<div id="date">' + currentDate + '</div>'
                      + '<div id="temp">'+ info.list[0].temp + '&deg; F</div></div>';
      console.log(weatherForecast);
      console.log(dayForecast);
    })
    .catch(function() {
      // catch any errors
    })
    
    
  // let weatherForecast = '<div class="col custombox">'
  //                     + '<div id="date">' + currentDate + '</div>'
  //                     + '<div id="temp">'+ info.list[0].temp + '&deg; F</div></div>';

};

  // function renderFiveDay ( d ) {
  //   var currentDate = today.format('MM/DD/YYYY ');
  //   // var temp = d.temp;
	
  //   let weatherForecast = '<div class="col custombox">'
  //                     + '<div id="date">' + currentDate + '</div>';
  //                     + '<div id="temp">'+ temp + '&deg; F</div></div>'
  //                     // + '<div id="wind">'+ wd.main.wind.speed +'mph</div>'
  //                     // + '<div id="humidity">'+ wd.main.humidity +'%</div>';

  //   document.getElementById('weekWeather').innerHTML = weatherForecast
  //   console.log(weatherForecast);
  // };

window.onload = function() {
  getCurrent();
  renderHistoryList();
  // renderFiveDay();
  // getWeatherData();
};

//https://openweathermap.org/forecast5