var lat = '';
var lon ='';
var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat=';
var searchBtn = $('#search');
var dateTime = null;
var temperatureF = '';
var cityName = $('#cityName');
var apiKey = '&appid=f516944114208483a59c1cf67915c8cd';
var tempURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=35.99&lon=-78.90&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'

$('#clear').on('click', function(){
    localStorage.removeItem('citySearch')
    location.reload();    
})
searchBtn[0].addEventListener('click', function(){
    getWeather(); 
});

$(document).on('click', '.historyBtn', function(){
    searchHisotry = JSON.parse(localStorage.getItem('citySearch'));
    console.log(`history button clicked`);
    console.log('what is this', this);
    cityHistory = searchHisotry[this.id].city
    console.log('city', cityHistory);
    console.log('this id', this.id);
    getOldWeather();
})

function dailyWeather() {
    var currentIconURL = 'http://openweathermap.org/img/wn/'+iconCurrent+'@2x.png'
    $('#temperature').text(tempF.toFixed(2));
    $('#wind').text(windSpeed);
    $('#humidity').text(humidity);
    $('#uvIndex').text(uvIndex);    
    $('#cityDate').text(city + '  '+date + ' ');
    $('#wicon0').attr('src', currentIconURL);
    checkUV();
}
function getInput() {
    cityName = $('#cityName').value
    console.log('cityname GetInput', cityName);
}

function storeSearch() {
    searchHisotry = JSON.parse(localStorage.getItem('citySearch'));
    if (searchHisotry === null) {
        search = [{
            city: city,
        }]
    } else {
        search = searchHisotry.concat([{
            city: city,
        }])
        }
     localStorage.setItem('citySearch', JSON.stringify(search));   
}

function previousSearch() {
    
    searchHisotry = JSON.parse(localStorage.getItem('citySearch'));
    $('button').remove('.historyBtn');
    for (let i = 0; i < searchHisotry.length; i++) {
        $('#searchHistory').after($('<button/>', {
            text: searchHisotry[i].city,
            class: 'btn btn-primary d-flex flex-column historyBtn bg-secondary w-100 justify-content-between m-3',
            id: i,            
        }))}}

function getWeather() {
    console.log('get weather just ran');
    city = cityName[0].value.trim()
    var testURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial'+apiKey
    var temp2 = fetch(testURL)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data2){                  
            lat = data2.coord.lat
            lon = data2.coord.lon
                city = data2.name
                storeSearch();
                var latlonURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=-'+lat+'&lon='+lon+'&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
                var temp = fetch(latlonURL)
                .then(function (response){
                    if (response.ok) {
                        response.json().then(function (data){
                            windSpeed = data.current.wind_speed + ' ';
                            humidity = data.current.humidity + ' ';
                            uvIndex = data.current.uvi;
                            tempK = data.current.temp;
                            tempC = tempK - 273;
                            tempF = (tempC*1.8) + 32;                    
                            date = moment().format('MM/DD/YYYY');
                            iconCurrent = data.current.weather[0].icon
                            var fiveDay = [];
                            for (let i = 1; i < 6; i++) {
                                icon = data.daily[i].weather[0].icon;
                                var iconURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
                                        $('#temperature'+[i]).text((((data.daily[i].temp.max-273)*1.8)+32).toFixed(2));
                                        $('#wind'+[i]).text(data.daily[i].wind_speed);
                                        $('#humidity'+[i]).text(data.daily[i].humidity);
                                        $('#cityDate'+[i]).text(moment().add([i]*1, 'days').format('MM/DD/YYYY'));
                                        $('#wicon'+[i]).attr('src', iconURL);
                                    }
                                    dailyWeather();                                    
                                    previousSearch();
                                })}})})}})}
function getOldWeather() {
    console.log('get old weather just ran'); 
    var testURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityHistory+'&units=imperial'+apiKey
    var temp2 = fetch(testURL)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data2){                  
            lat = data2.coord.lat
            lon = data2.coord.lon
                city = data2.name
                storeSearch();
                var latlonURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=-'+lat+'&lon='+lon+'&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
                var temp = fetch(latlonURL)
                .then(function (response){
                    if (response.ok) {
                        response.json().then(function (data){
                            windSpeed = data.current.wind_speed + ' ';
                            humidity = data.current.humidity + ' ';
                            uvIndex = data.current.uvi;
                            tempK = data.current.temp;
                            tempC = tempK - 273;
                            tempF = (tempC*1.8) + 32;                    
                            date = moment().format('MM/DD/YYYY');
                            iconCurrent = data.current.weather[0].icon
                            var fiveDay = [];
                            for (let i = 1; i < 6; i++) {
                                icon = data.daily[i].weather[0].icon;
                                var iconURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
                                        $('#temperature'+[i]).text((((data.daily[i].temp.max-273)*1.8)+32).toFixed(2));
                                        $('#wind'+[i]).text(data.daily[i].wind_speed);
                                        $('#humidity'+[i]).text(data.daily[i].humidity);
                                        $('#cityDate'+[i]).text(moment().add([i]*1, 'days').format('MM/DD/YYYY'));
                                        $('#wicon'+[i]).attr('src', iconURL);
                                    }
                                    dailyWeather(); 
                                })}})})}})}

function checkUV(){
    console.log('this is the uv index',uvIndex);
    colorClass = ''
    $('#uvIndex').removeClass('bg-success bg-yellow bg-danger bg-purple text-white')

    if (uvIndex < 2.49) {
        colorClass = 'bg-success text-white';        
    } else if (uvIndex < 5.5 ) {
        colorClass = 'bg-yellow';
    } else if (uvIndex < 7.5 ) {
        colorClass ='bg-orange';        
    } else if (uvIndex < 10.5) {
        colorClass ='bg-danger';
    } else  {
        colorClass ='bg-purple text-white';        
    }
    console.log(colorClass)
    $('#uvIndex').addClass(colorClass);
    }