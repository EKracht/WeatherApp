'use script';

var apiUrl = "http://api.wunderground.com/api/eb6417bed27cef58";

$(document).ready(init);

function init(){
  var startCur = apiUrl + "/conditions/q/autoip.json";
  var start = apiUrl + "/forecast/q/autoip.json";
    
  $.get(startCur)
  .done(function(data){
    makeCurrentCard(data);
  })
  .fail(function(error){
  })

  $.get(start)
  .done(function(data){
    makeCards(data);
  })
  .fail(function(error){
  })

  $('#getWeather').click(getWeather);
}

function getWeather(){
  $('.card').remove();
  $('.specialCard').remove();
  var $input = $('#zipCode').val();
  var urlConditions = apiUrl + '/conditions/q/' + $input + '.json';
  var urlForecast = apiUrl + '/forecast/q/' + $input + '.json';
 
  $.get(urlConditions)
  .done(function(data){
    console.log(data);
    makeCurrentCard(data);
  })
  .fail(function(error){
  })

  $.get(urlForecast)
  .done(function(data){
    makeCards(data);
  })
  .fail(function(error){
  })
}

function makeCurrentCard(data){
  var dataFromCur = data.current_observation;
  var $card = $('<div>').addClass('specialCard');
  var $location = $('<div>').text(dataFromCur.display_location.full);
  var $day = $('<div>').text("Today");
  var $image = $('<img>').attr('src', dataFromCur.icon_url);
  var $temperature = $('<div>').text('Temperature: ' + dataFromCur.temperature_string);
  var $weather = $('<div>').text('Weather: ' + dataFromCur.weather);
  var $wind = $('<div>').text('Wind: ' + dataFromCur.wind_string);
  $card.append($location, $day, $image, $temperature, $weather, $wind);
  $('.currentWeather').append($card);
  $("img").rotate({ 
   bind: 
  { 
    mouseover : function() { 
        $(this).rotate({animateTo:180})
    },
    mouseout : function() { 
        $(this).rotate({animateTo:0})
    }
  } 
  });
}

function makeCards(data){
  for (var i = 1; i <= 7; i = i + 2){
    var dataFrom = data.forecast.txt_forecast.forecastday[i];
    var $card = $('<div>').addClass('card col-lg-6');
    var $day = $('<div>').text(dataFrom.title);
    var $image = $('<img>').attr('src', dataFrom.icon_url);
    var $forecast = $('<div>').text('Forecast: ' + dataFrom.fcttext);
    $card.append($day, $image, $forecast);
    $('.futureWeather').append($card);
  }
  $("img").rotate({ 
    bind: 
  { 
    mouseover : function() { 
        $(this).rotate({animateTo:180})
    },
    mouseout : function() { 
        $(this).rotate({animateTo:0})
    }
  } 
  });
}

