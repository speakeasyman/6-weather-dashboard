var lat = '';
var lon ='';
var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat=';
var searchBtn = $('#search');
var dateTime = null;
var temperatureF = '';
var cityName = $('#cityName');
var apiKey = '&appid=f516944114208483a59c1cf67915c8cd';
var tempURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.99&lon=-78.90&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'

// This just cleared the local storage of all the previously searched for cities
$('#clear').on('click', function(){
    localStorage.removeItem('citySearch')
    location.reload();    
})

//This is the event listener for the search button, it'll invoke getWeather function
searchBtn[0].addEventListener('click', function(){
    getWeather(); 
});
// This is the event listener that is on the dynamically generated buttons of previously searched cities.
// It'll use the id of the button which corresponds for which part of the stored history the city name is
$(document).on('click', '.historyBtn', function(){
    searchHisotry = JSON.parse(localStorage.getItem('citySearch'));
    cityHistory = searchHisotry[this.id].city
    getOldWeather();
})
// This will update the card that has the current weather. It uses the variables defined in getWeather function, and pulls the icon for
//current weather card, and invokes the function to modify the background for the UV index.
function dailyWeather() {
    var currentIconURL = 'https://openweathermap.org/img/wn/'+iconCurrent+'@2x.png'
    $('#temperature').text(tempF.toFixed(2));
    $('#wind').text(windSpeed);
    $('#humidity').text(humidity);
    $('#uvIndex').text(uvIndex);    
    $('#cityDate').text(city + '  '+date + ' ');
    $('#wicon0').attr('src', currentIconURL);
    checkUV();
    $('#main-body').removeClass('d-none');
    
}
// This will store the recent search history into the local storage.
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
// This pulls out the recent search history from the local storage and will dynamically create buttons based off the history.
function previousSearch() {    
    searchHisotry = JSON.parse(localStorage.getItem('citySearch'));
    $('button').remove('.historyBtn');
    for (let i = 0; i < searchHisotry.length; i++) {
        $('#searchHistory').after($('<button/>', {
            text: searchHisotry[i].city,
            class: 'btn btn-primary d-flex flex-column historyBtn bg-secondary w-100 justify-content-between m-3',
            id: i,            
        }))}}
//This takes the value from the input search and will first call using the api for a city. It'll extract the longitude and latitude
// from that query, and then do a search on those coordinates and pull all the data. If get time, I should add a condition if the
// user tries to search nothing, and also if the city they search for returns an error.
function getWeather() {
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
                var latlonURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=-'+lat+'&lon='+lon+'&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
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
                                var iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
                                        $('#temperature'+[i]).text((((data.daily[i].temp.max-273)*1.8)+32).toFixed(2));
                                        $('#wind'+[i]).text(data.daily[i].wind_speed);
                                        $('#humidity'+[i]).text(data.daily[i].humidity);
                                        $('#cityDate'+[i]).text(moment().add([i]*1, 'days').format('MM/DD/YYYY'));
                                        $('#wicon'+[i]).attr('src', iconURL);
                                    }
                                    dailyWeather();                                    
                                    previousSearch();
                                })}})})}})}
// This one is the same as getWeather except the input is the different. I know there should be way to not have such
// duplicate work going on, I just couldn't think of it with the time I had left.
function getOldWeather() { 
    var testURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityHistory+'&units=imperial'+apiKey
    var temp2 = fetch(testURL)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data2){                  
            lat = data2.coord.lat
            lon = data2.coord.lon
                city = data2.name
                storeSearch();
                var latlonURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=-'+lat+'&lon='+lon+'&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
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
                                var iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
                                        $('#temperature'+[i]).text((((data.daily[i].temp.max-273)*1.8)+32).toFixed(2));
                                        $('#wind'+[i]).text(data.daily[i].wind_speed);
                                        $('#humidity'+[i]).text(data.daily[i].humidity);
                                        $('#cityDate'+[i]).text(moment().add([i]*1, 'days').format('MM/DD/YYYY'));
                                        $('#wicon'+[i]).attr('src', iconURL);
                                    }
                                    dailyWeather(); 
                                })}})})}})}
// This just does many if else conditionals, and based off the index levels I found on google will apply a background.
// Whether the text is white or black depends on which should be easiest to read for the user.
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