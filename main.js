'use script';

// http://api.wunderground.com/api/eb6417bed27cef58/    forecast/q/CA/San_Francisco.json
var apiUrl = "http://api.wunderground.com/api/eb6417bed27cef58";

$(document).ready(init);

function init(){
  //starting weather
  var startCur = apiUrl + "/conditions/q/autoip.json";
  var start = apiUrl + "/forecast/q/autoip.json";

  $.get(start)
  .done(function(data){
    console.log(data);

  for (var i = 1; i <= 7; i = i + 2){
    var dataFrom = data.forecast.txt_forecast.forecastday[i];
    var $card = $('<div>').addClass('card');
    var $day = $('<div>').text(dataFrom.title);
    console.log('day', $day);
    var $image = $('<img>').attr('src', dataFrom.icon_url);
    console.log('image', $image);
    var $forecast = $('<div>').text('Forecast: ' + dataFrom.fcttext);
    console.log('forecast', $forecast);
    $card.append($day, $image, $forecast);
    console.log('card', $card);
    console.log('i', i);
    $('.futureWeather').append($card);
  }
  })
  .fail(function(error){
    console.error(error);
  })
  
  $.get(startCur)
  .done(function(data){
    console.log(data);
    var dataFromCur = data.current_observation;
    var $card = $('<div>').addClass('specialCard');
    var $location = $('<div>').text(dataFromCur.display_location.full);
    var $day = $('<div>').text("Today");
    console.log('day', $day);
    var $image = $('<img>').attr('src', dataFromCur.icon_url);
    var $temperature = $('<div>').text('Temperature: ' + dataFromCur.temperature_string);
    var $weather = $('<div>').text('Weather: ' + dataFromCur.weather);
    var $wind = $('<div>').text('Wind: ' + dataFromCur.wind_string);
    console.log('forecast', $temperature);
    $card.append($location, $day, $image, $temperature, $weather, $wind);
    console.log('card', $card);
    $('.currentWeather').append($card);
  })
  .fail(function(error){
    console.error(error);
  })

  //Event Listeners
  $('#getWeather').click(getWeather);
}

function getWeather(){
  $('.card').remove();
  $('.specialCard').remove();
  var $input = $('#zipCode').val();
  var urlForecast = apiUrl + '/forecast/q/' + $input + '.json';
  var urlConditions = apiUrl + '/conditions/q/' + $input + '.json';

  $.get(urlConditions)
  .done(function(data){
    console.log(data);
    var dataFromCur = data.current_observation;
    var $card = $('<div>').addClass('specialCard');
    var $location = $('<div>').text(dataFromCur.display_location.full);
    var $day = $('<div>').text("Today");
    console.log('day', $day);
    var $image = $('<img>').attr('src', dataFromCur.icon_url);
    var $temperature = $('<div>').text('Temperature: ' + dataFromCur.temperature_string);
    var $weather = $('<div>').text('Weather: ' + dataFromCur.weather);
    var $wind = $('<div>').text('Wind: ' + dataFromCur.wind_string);
    console.log('forecast', $temperature);
    $card.append($location, $day, $image, $temperature, $weather, $wind);
    console.log('card', $card);
    $('.currentWeather').append($card);
  })
  .fail(function(error){
    console.error(error);
  })

  $.get(urlForecast)
  .done(function(data){
    console.log(data);

  for (var i = 1; i <= 7; i = i + 2){
    var dataFrom = data.forecast.txt_forecast.forecastday[i];
    var $card = $('<div>').addClass('card');
    var $day = $('<div>').text(dataFrom.title);
    console.log('day', $day);
    var $image = $('<img>').attr('src', dataFrom.icon_url);
    console.log('image', $image);
    var $forecast = $('<div>').text('Forecast: ' + dataFrom.fcttext);
    console.log('forecast', $forecast);
    $card.append($day, $image, $forecast);
    console.log('card', $card);
    console.log('i', i);
    $('.futureWeather').append($card);
  }
  })
  .fail(function(error){
    console.error(error);
  })
}